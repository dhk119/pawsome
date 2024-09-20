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
	public ResponseEntity<LoginMemberDTO> naverLogin(@RequestParam String code, @RequestParam String state) {	
		String tokenUrl = String.format("%s?grant_type=authorization_code&client_id=%s&client_secret=%s&code=%s&state=%s",
		                TOKEN_URL, CLIENT_ID, CLIENT_SECRET, code, state);
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<Map> tokenResponse = restTemplate.getForEntity(tokenUrl, Map.class);
		        
		String accessToken = (String) tokenResponse.getBody().get("access_token");
		        
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + accessToken);
		        
		HttpEntity<String> entity = new HttpEntity<>(headers);
		ResponseEntity<Map> userInfoResponse = restTemplate.exchange(USER_INFO_URL, HttpMethod.GET, entity, Map.class);
		        
		Map<String, Object> userInfo = userInfoResponse.getBody();
		
		System.out.println(userInfo); // 전체 사용자 정보 출력
		
		Map<String, Object> response = (Map<String, Object>) userInfo.get("response");
		String memberId = (String) response.get("id"); // 사용자 고유 ID
		String memberName = (String) response.get("name"); // 사용자 이름

		System.out.println("Member ID: " + memberId);
		System.out.println("Member Name: " + memberName);

//		// 로그인 처리
//		int result = memberService.checkEmail(memberEmail);
//		LoginMemberDTO loginMember = new LoginMemberDTO();
//		if(result == 1) {
//			loginMember = memberService.login(memberEmail);						
//		} else {
//			//소셜 회원가입 페이지로 이동하게 해야함
//			return ResponseEntity.status(404).build();
//		}	
//
//		// 응답 반환
//		if(loginMember != null) {
//			return ResponseEntity.ok(loginMember);
//		} else {
//			return ResponseEntity.status(404).build();
//		}
		return null;
	}
}
