package kr.co.iei.member.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import jakarta.servlet.http.HttpSession;
import kr.co.iei.member.model.dto.LoginMemberDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.service.MemberService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/member")
public class MemberController {
	@Autowired
	private MemberService memberService;
	
	private final String CLIENT_ID = "mDIMmlDCzICGJPSiZ68R"; // 네이버 클라이언트 ID
    private final String CLIENT_SECRET = "bmqkAwlkYr"; // 네이버 클라이언트 Secret
    private final String TOKEN_URL = "https://nid.naver.com/oauth2.0/token";
    private final String USER_INFO_URL = "https://openapi.naver.com/v1/nid/me";
	
	@PostMapping
	public ResponseEntity<Integer> join(@RequestBody MemberDTO member) {
		System.out.println(member);
		int result = memberService.insertMember(member);
		if(result > 0) {
			return ResponseEntity.ok(result);
		} else {
			return ResponseEntity.status(500).build();		
		}
	}
	
	@PostMapping(value = "/login")
	public ResponseEntity<LoginMemberDTO> login(@RequestBody MemberDTO member) {
		LoginMemberDTO loginMember = memberService.login(member);
		if(loginMember != null) {
			return ResponseEntity.ok(loginMember);
		} else {
			return ResponseEntity.status(404).build();
		}
	}
	
	@PostMapping(value = "/refresh")
	public ResponseEntity<LoginMemberDTO> refresh(@RequestHeader("Authorization") String token) {
		LoginMemberDTO loginMember = memberService.refresh(token);
		if(loginMember != null) {
			return ResponseEntity.ok(loginMember);
		} else {
			return ResponseEntity.status(404).build();
		}
	}
	
	@GetMapping(value = "/memberEmail/{memberEmail}/check-email")
	public ResponseEntity<Integer> checkEmail(@PathVariable String memberEmail) {
		int result = memberService.checkEmail(memberEmail);
		return ResponseEntity.ok(result);
	}
	
	@GetMapping(value = "/memberNickname/{memberNickname}/check-nickname")
	public ResponseEntity<Integer> checkNickname(@PathVariable String memberNickname) {
		int result = memberService.checkNickname(memberNickname);
		return ResponseEntity.ok(result);
	}
	
	@GetMapping("/naver-login")
	public ResponseEntity<Map<String, Object>> naverLogin(@RequestParam String code, @RequestParam String state) {
	    // 네이버 API로 토큰 요청
	    String tokenUrl = String.format("%s?grant_type=authorization_code&client_id=%s&client_secret=%s&code=%s&state=%s",
	                                    TOKEN_URL, CLIENT_ID, CLIENT_SECRET, code, state);
	    RestTemplate restTemplate = new RestTemplate();
	    ResponseEntity<Map> tokenResponse = restTemplate.getForEntity(tokenUrl, Map.class);

	    String accessToken = (String) tokenResponse.getBody().get("access_token");

	    // 네이버 사용자 정보 요청
	    HttpHeaders headers = new HttpHeaders();
	    headers.set("Authorization", "Bearer " + accessToken);
	    HttpEntity<String> entity = new HttpEntity<>(headers);
	    ResponseEntity<Map> userInfoResponse = restTemplate.exchange(USER_INFO_URL, HttpMethod.GET, entity, Map.class);

	    Map<String, Object> response = (Map<String, Object>) userInfoResponse.getBody().get("response");
	    String memberEmail = (String) response.get("email");
	    
	    // DB에서 해당 이메일로 회원가입 여부 확인
	    int isMember = memberService.checkEmail(memberEmail);

	    Map<String, Object> result = new HashMap<>();
	    if (isMember == 1) {
	        LoginMemberDTO loginMember = memberService.login(memberEmail);
	        System.out.println("테스트!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
	        System.out.println(loginMember);
	        result.put("isMember", true);
	        result.put("memberEmail", loginMember.getMemberEmail());
	        result.put("memberLevel", loginMember.getMemberLevel());
	        result.put("memberNickname", loginMember.getMemberNickname());
	        result.put("accessToken", loginMember.getAccessToken());
	        result.put("refreshToken", loginMember.getRefreshToken());
	    } else {
	        result.put("isMember", false);
	        result.put("naverUserInfo", response);
	    }
	    
	    return ResponseEntity.ok(result);
	}
	
	@PostMapping(value = "/profile")
	public ResponseEntity<MemberDTO> selectOneMember(String loginEmail) {
		MemberDTO member = memberService.selectOneMember(loginEmail);
		return ResponseEntity.ok(member);
	}
	
}
