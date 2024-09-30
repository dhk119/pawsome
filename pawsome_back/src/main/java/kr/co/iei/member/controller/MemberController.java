package kr.co.iei.member.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import kr.co.iei.member.model.dto.LoginMemberDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.dto.PetDTO;
import kr.co.iei.member.model.service.MemberService;
import kr.co.iei.util.EmailSender;
import kr.co.iei.util.FileUtils;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/member")
public class MemberController {
	@Autowired
	private MemberService memberService;
	
	@Autowired
	private FileUtils fileUtil;
	
	@Value("${file.root}")
	public String root;
	
	@Autowired
	private EmailSender emailSender;
	
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
	        result.put("isMember", true);
	        result.put("memberEmail", loginMember.getMemberEmail());
	        result.put("memberLevel", loginMember.getMemberLevel());
	        result.put("memberNickname", loginMember.getMemberNickname());
	        result.put("accessToken", loginMember.getAccessToken());
	        result.put("refreshToken", loginMember.getRefreshToken());
	        result.put("loginType", loginMember.getLoginType());
	    } else {
	        result.put("isMember", false);
	        result.put("naverUserInfo", response);
	    }
	    
	    return ResponseEntity.ok(result);
	}
	
	@PostMapping(value = "/profile")
	public ResponseEntity<MemberDTO> selectOneMember(@RequestHeader("Authorization") String token) {
		MemberDTO member = memberService.selectOneMember(token);
		return ResponseEntity.ok(member);
	}
	
	@PostMapping(value = "/insertPet")
	public ResponseEntity<Integer> insertPet(@ModelAttribute PetDTO pet, @ModelAttribute MultipartFile petProfile1) {
		System.out.println(pet);
		System.out.println(petProfile1);
		if(petProfile1 != null) {
			String savepath = root + "/member/pet/";
			String filepath = fileUtil.upload(savepath, petProfile1);
			pet.setPetProfile(filepath);
		}
		int result = memberService.insertPet(pet);
		return ResponseEntity.ok(result);
	}
	
	@PostMapping(value = "/sendMailCode")
	public ResponseEntity<String> sendMailCode(@RequestBody MemberDTO member) {
		String emailTitle = "pawsome 인증메일 입니다.";
		String loginType = memberService.selectOneEmail(member);
		
		if(loginType == null) {
			return ResponseEntity.ok("no");
		} else if(loginType.equals("site")) {	
			Random r = new Random();
			String ranCode = "";
			for(int i=0; i<6; i++) {
				int ranNum = r.nextInt(3); //0:숫자,1:대문자,2:소문자
				if(ranNum == 0) {
					int randomCode = r.nextInt(10);
					ranCode += randomCode;
				} else if(ranNum == 1) {
					char randomCode = (char)(r.nextInt(26)+65);
					ranCode += randomCode;
				} else {
					char randomCode = (char)(r.nextInt(26)+97);
					ranCode += randomCode;
				}
			}
			System.out.println("생성된 랜덤 코드: "+ranCode);
			
			String emailContent = "<div !important; width: 540px; height: 600px; border-top: 4px solid #ffa518; margin: 100px auto; padding: 30px 0; box-sizing: border-box;\">\r\n" + 
					"	<h1 style=\"margin: 0; padding: 0 5px; font-size: 28px; font-weight: 400;\">\r\n" + 
					"		<span style=\"font-size: 15px; margin: 0 0 10px 3px;\">PAWSOME</span><br />\r\n" + 
					"		<span style=\"color: #ffa518;\">인증 코드</span> 안내입니다.\r\n" + 
					"	</h1>\r\n" + 
					"	<p style=\"font-size: 16px; line-height: 26px; margin-top: 50px; padding: 0 5px;\">\r\n" + 
					"		안녕하세요.<br />\r\n" + 
					"		비밀번호 찾기를 위한 인증 코드가 생성되었습니다.<br />\r\n" + 
					"		사이트에 <b style=\"color: #ffa518;\">'인증 코드'</b>를 입력하세요.<br />\r\n" + 
					"		감사합니다.\r\n" + 
					"	</p>\r\n" + 
					"\r\n" + 
					"	<p style=\"font-size: 16px; margin: 40px 5px 20px; line-height: 28px;\">\r\n" + 
					"		인증코드: <br />\r\n" + 
					"		<span style=\"font-size: 24px;\">"+ranCode+"</span>\r\n" + 
					"	</p>\r\n" +  
					"</div>";
			
			System.out.println("제목 : "+emailTitle);
			System.out.println("받는 사람 : " +member.getMemberEmail());
			
			emailSender.sendMail(emailTitle, member.getMemberEmail(), emailContent);
			
			return ResponseEntity.ok(ranCode);
		} 
		return ResponseEntity.ok(null);
	}
	
	@PostMapping(value = "/changePassword")
	public ResponseEntity<Integer> changePassword(@RequestBody MemberDTO member) {
		
		Random r = new Random();
		String ranCode = "";
		for(int i=0; i<12; i++) {
			int ranNum = r.nextInt(3); //0:숫자,1:대문자,2:소문자
			if(ranNum == 0) {
				int randomCode = r.nextInt(10);
				ranCode += randomCode;
			} else if(ranNum == 1) {
				char randomCode = (char)(r.nextInt(26)+65);
				ranCode += randomCode;
			} else {
				char randomCode = (char)(r.nextInt(26)+97);
				ranCode += randomCode;
			}
		}
		System.out.println("생성된 랜덤 코드: "+ranCode);
		
		String memberEmail = member.getMemberEmail();
		
		int result = memberService.changePassword(memberEmail, ranCode);
		String emailTitle = "pawsome 임시 비밀번호 입니다.";
		String emailContent = "<div !important; width: 540px; height: 600px; border-top: 4px solid #ffa518; margin: 100px auto; padding: 30px 0; box-sizing: border-box;\">\r\n" + 
				"	<h1 style=\"margin: 0; padding: 0 5px; font-size: 28px; font-weight: 400;\">\r\n" + 
				"		<span style=\"font-size: 15px; margin: 0 0 10px 3px;\">PAWSOME</span><br />\r\n" + 
				"		<span style=\"color: #ffa518;\">인증 코드</span> 안내입니다.\r\n" + 
				"	</h1>\r\n" + 
				"	<p style=\"font-size: 16px; line-height: 26px; margin-top: 50px; padding: 0 5px;\">\r\n" + 
				"		안녕하세요.<br />\r\n" + 
				"		임시 비밀번호가 생성되었습니다.<br />\r\n" + 
				"		임시 비밀번호로 <b style=\"color: #ffa518;\">'로그인'</b>해주시고, 비밀번호를 즉각 변경해주세요.<br />\r\n" + 
				"		감사합니다.\r\n" + 
				"	</p>\r\n" + 
				"\r\n" + 
				"	<p style=\"font-size: 16px; margin: 40px 5px 20px; line-height: 28px;\">\r\n" + 
				"		임시 비밀번호: <br />\r\n" + 
				"		<span style=\"font-size: 24px;\">"+ranCode+"</span>\r\n" + 
				"	</p>\r\n" +  
				"</div>";
		
		emailSender.sendMail(emailTitle, memberEmail, emailContent);	
		return ResponseEntity.ok(result);
	}
	
	@PatchMapping
	public ResponseEntity<Integer> updateMember(
	        @ModelAttribute MemberDTO member, @ModelAttribute MultipartFile memberProfile1, @RequestHeader("Authorization") String token) {

	    System.out.println(member);
	    System.out.println(memberProfile1);

	    // 프로필 사진이 비어있지 않으면 업로드 처리
	    if (memberProfile1 != null && !memberProfile1.isEmpty()) {
	        String savepath = root + "/member/profile/";
	        String filepath = fileUtil.upload(savepath, memberProfile1);
	        member.setMemberProfile(filepath);  // 새 파일 경로로 설정
	    } else {
	        // 프로필 사진을 수정하지 않으므로 기존 프로필을 유지하도록 설정
	        MemberDTO existingMember = memberService.selectOneMember(token);
	        member.setMemberProfile(existingMember.getMemberProfile());
	    }
	    
	    int result = memberService.updateMember(member);
	    return ResponseEntity.ok(result);
	}

	
}
