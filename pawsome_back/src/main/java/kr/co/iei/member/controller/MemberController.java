package kr.co.iei.member.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import kr.co.iei.market.model.dto.BuyListDTO;
import kr.co.iei.market.model.dto.ProductLikeDTO;
import kr.co.iei.member.model.dto.LoginMemberDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.dto.PetDTO;
import kr.co.iei.member.model.dto.ScheduleDTO;
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
	
	// 네이버 API 코드 받아오기
	private final String CLIENT_ID = "mDIMmlDCzICGJPSiZ68R"; // 네이버 클라이언트 ID
    private final String CLIENT_SECRET = "bmqkAwlkYr"; // 네이버 클라이언트 Secret
    private final String TOKEN_URL = "https://nid.naver.com/oauth2.0/token";
    private final String USER_INFO_URL = "https://openapi.naver.com/v1/nid/me";
    
    // 카카오 API 코드 받아오기
 	private final String KAKAO_TOKEN_URL = "https://kauth.kakao.com/oauth/token";
    private final String KAKAO_CLIENT_ID = "655bae51c4f48e73787fb78710604be0";
    private final String KAKAO_REDIRECT_URI = "http://192.168.10.16:3000/callback/kakao";
    private final String USER_INFO_URL2 = "https://kapi.kakao.com/v2/user/me";

	
    // 회원가입
	@PostMapping
	public ResponseEntity<Integer> join(@RequestBody MemberDTO member) {
		int result = memberService.insertMember(member);
		if(result > 0) {
			return ResponseEntity.ok(result);
		} else {
			return ResponseEntity.status(500).build();		
		}
	}
	
	// 회원탈퇴
	@DeleteMapping(value = "/memberEmail/{memberEmail}")
	public ResponseEntity<Integer> deleteMember(@PathVariable String memberEmail, @RequestBody String memberPw) {
		System.out.println(memberPw);
		System.out.println(memberEmail);
		
	    // 회원 정보 조회
	    MemberDTO member = memberService.selectMember(memberEmail);
	    
	    int check = memberService.checkPw(member.getMemberEmail(), memberPw); //1이면 맞는 비번, 0이면 틀린 비번
	    
	    System.out.println(check);
	    
	    if(check == 1) {
	    	if (member != null && member.getMemberProfile() != null) {
	    		// 기본 이미지가 아닌 업로드된 파일이면 삭제
	    		String profileImagePath = root + "/member/profile/" + member.getMemberProfile();
	    		if (!"member_img.png".equals(member.getMemberProfile())) {
	    			File file = new File(profileImagePath);
	    			if (file.exists()) {
	    				file.delete(); // 파일 삭제
	    			}
	    		}
	    	}
	    	// 회원 정보 삭제
	    	int result = memberService.deleteMember(memberEmail);
	    	return ResponseEntity.ok(result);
	    } else {
	    	return ResponseEntity.ok(2);
	    }
	}
	
	// 로그인
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
	
	// 이메일 중복 체크
	@GetMapping(value = "/memberEmail/{memberEmail}/check-email")
	public ResponseEntity<Integer> checkEmail(@PathVariable String memberEmail) {
		int result = memberService.checkEmail(memberEmail);
		return ResponseEntity.ok(result);
	}
	
	// 닉네임 중복 체크
	@GetMapping(value = "/memberNickname/{memberNickname}/check-nickname")
	public ResponseEntity<Integer> checkNickname(@PathVariable String memberNickname) {
		int result = memberService.checkNickname(memberNickname);
		return ResponseEntity.ok(result);
	}
	
	// 네이버 로그인
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
	
	// 카카오 로그인 처리
	@GetMapping("/kakao-login")
	public ResponseEntity<Map<String, Object>> kakaoLogin(@RequestParam String code) {
	    // 1. 카카오 API로 액세스 토큰 요청
	    String tokenUrl = String.format("%s?grant_type=authorization_code&client_id=%s&redirect_uri=%s&code=%s",
	            KAKAO_TOKEN_URL, KAKAO_CLIENT_ID, KAKAO_REDIRECT_URI, code);
	    
	    RestTemplate restTemplate = new RestTemplate();
	    ResponseEntity<Map> tokenResponse = restTemplate.getForEntity(tokenUrl, Map.class);
	    
	    String accessToken = (String) tokenResponse.getBody().get("access_token");
	    System.out.println(accessToken);

	    // 2. 액세스 토큰으로 사용자 정보 요청
	    HttpHeaders headers = new HttpHeaders();
	    headers.set("Authorization", "Bearer " + accessToken);
	    HttpEntity<String> entity = new HttpEntity<>(headers);
	    ResponseEntity<Map> userInfoResponse = restTemplate.exchange(USER_INFO_URL2, HttpMethod.GET, entity, Map.class);
	    System.out.println(userInfoResponse);

	    Map<String, Object> kakaoAccount = (Map<String, Object>) userInfoResponse.getBody().get("kakao_account");
	    String memberEmail = (String) kakaoAccount.get("email");

	    // 카카오 이메일에 'kakao' 접미사 추가
	    String kakaoEmail = memberEmail + "_kakao";

	    // 3. DB에서 회원 정보 확인 및 처리
	    int isMember = memberService.checkEmail2(kakaoEmail, "kakao"); // 이메일로 회원 확인

	    Map<String, Object> result = new HashMap<>();
	    if (isMember == 1) {
	        LoginMemberDTO loginMember = memberService.login(kakaoEmail); // kakaoEmail로 로그인
	        result.put("isMember", true);
	        result.put("memberEmail", loginMember.getMemberEmail());
	        result.put("memberLevel", loginMember.getMemberLevel());
	        result.put("memberNickname", loginMember.getMemberNickname());
	        result.put("accessToken", loginMember.getAccessToken());
	        result.put("refreshToken", loginMember.getRefreshToken());
	    } else {
	        result.put("isMember", false);
	        result.put("kakaoUserInfo", kakaoAccount);
	    }

	    return ResponseEntity.ok(result);
	}


	
	// 마이페이지 프로필 조회
	@PostMapping(value = "/profile")
	public ResponseEntity<MemberDTO> selectOneMember(@RequestHeader("Authorization") String token) {
		MemberDTO member = memberService.selectOneMember(token);
		return ResponseEntity.ok(member);
	}

	// 인증 메일 받기
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
			
			emailSender.sendMail(emailTitle, member.getMemberEmail(), emailContent);
			
			return ResponseEntity.ok(ranCode);
		} 
		return ResponseEntity.ok(null);
	}
	
	// 비밀번호 잊어버렸을 때 이메일 전송 후 변경
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
		
		String memberEmail = member.getMemberEmail();
		
		int result = memberService.changePassword(memberEmail, ranCode);
		String emailTitle = "pawsome 임시 비밀번호 입니다.";
		String emailContent = "<div !important; width: 540px; height: 600px; border-top: 4px solid #ffa518; margin: 100px auto; padding: 30px 0; box-sizing: border-box;\">\r\n" + 
				"	<h1 style=\"margin: 0; padding: 0 5px; font-size: 28px; font-weight: 400;\">\r\n" + 
				"		<span style=\"font-size: 15px; margin: 0 0 10px 3px;\">PAWSOME</span><br />\r\n" + 
				"		<span style=\"color: #ffa518;\">임시 비밀번호</span> 안내입니다.\r\n" + 
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
	
	// 회원 정보 업데이트
	@PatchMapping
	public ResponseEntity<Integer> updateMember(
	        @ModelAttribute MemberDTO member, 
	        @ModelAttribute MultipartFile memberProfile1, 
	        @RequestHeader("Authorization") String token) {
		
		System.out.println(member);
		System.out.println(memberProfile1);

	    // 프로필 사진 파일이 있을 때만 처리
	    if (memberProfile1 != null && !memberProfile1.isEmpty()) {
	        String savepath = root + "/member/profile/";
	        String filepath = fileUtil.upload(savepath, memberProfile1);
	        member.setMemberProfile(filepath);  // 새 파일 경로로 설정
	    }

	    // 만약 memberProfile이 기본 이미지("member_img.png")일 경우 처리
	    if ("member_img.png".equals(member.getMemberProfile())) {
	        member.setMemberProfile("member_img.png");
	    }

	    // 기존 프로필을 유지하거나 업데이트
	    if (member.getMemberProfile() == null || member.getMemberProfile().isEmpty()) {
	        MemberDTO existingMember = memberService.selectOneMember(token);
	        member.setMemberProfile(existingMember.getMemberProfile());
	    }

	    int result = memberService.updateMember(member);
	    return ResponseEntity.ok(result);
	}
	
	// 반려동물 정보 삽입
	@PostMapping(value = "/insertPet")
	public ResponseEntity<Integer> insertPet(@ModelAttribute PetDTO pet, @ModelAttribute MultipartFile petProfile1) {
		String savepath = root + "/member/pet/";
		    
	    // petProfile1이 null이거나 파일이 비어 있을 경우 기본 이미지 설정
	    if (petProfile1 != null && !petProfile1.isEmpty()) {
	        // 파일이 존재하면 해당 파일을 업로드하고 경로를 설정
	        String filepath = fileUtil.upload(savepath, petProfile1);
	        pet.setPetProfile(filepath);
	    } else {
	        // 파일이 없으면 기본 이미지 경로 설정
	        pet.setPetProfile("pet_img.png");
	    }
	    
	    int result = memberService.insertPet(pet);
	    return ResponseEntity.ok(result);
	}

		
	//반려동물 정보 조회
	@GetMapping(value = "/petNo/{petNo}")
	public ResponseEntity<PetDTO> selectOnePet(@PathVariable int petNo){
		PetDTO pet = memberService.selectOnePet(petNo);
		return ResponseEntity.ok(pet);
	}
	
	//반려동물 정보 수정
	@PostMapping(value = "/updatePet/{petNo}")
	public ResponseEntity<Integer> updatePet(
	    @PathVariable int petNo, 
	    @ModelAttribute PetDTO pet, 
	    @ModelAttribute MultipartFile petProfile1) {

	    // 프로필 사진이 비어있지 않으면 업로드 처리
	    if (petProfile1 != null && !petProfile1.isEmpty()) {
	        String savepath = root + "/member/pet/";
	        String filepath = fileUtil.upload(savepath, petProfile1);
	        pet.setPetProfile(filepath);  // 새 파일 경로로 설정
	    } else {
	        // 프로필 사진을 수정하지 않으므로 기존 프로필을 유지하도록 설정
	        PetDTO existingPet = memberService.selectOnePet(petNo);  // 기존 반려동물 정보 조회
	        pet.setPetProfile(existingPet.getPetProfile());  // 기존 파일 경로 유지
	    }

	    int result = memberService.updatePet(pet);
	    return ResponseEntity.ok(result);
	}
	
	// 반려동물 정보 삭제
	@DeleteMapping(value = "/deletePet/{petNo}")
	public ResponseEntity<Integer> deletePet(@PathVariable int petNo) {
	    // petNo로 반려동물 정보 조회
	    PetDTO pet = memberService.selectOnePet(petNo);
	    
	    if (pet != null && pet.getPetProfile() != null) {
	        // 기본 이미지가 아닌 업로드된 파일이면 삭제
	        String profileImagePath = root + "/member/pet/" + pet.getPetProfile();
	        if (!"pet_img.png".equals(pet.getPetProfile())) {
	            File file = new File(profileImagePath);
	            if (file.exists()) {
	                file.delete(); // 파일 삭제
	            }
	        }
	    }
	    // 반려동물 정보 삭제
	    int result = memberService.deletePet(petNo);
	    return ResponseEntity.ok(result);
	}

	
	// 비밀번호 변경
	@PostMapping(value = "/changePw")
	public ResponseEntity<Integer> changePw(
	    @RequestHeader("Authorization") String token, 
	    @RequestBody Map<String, String> requestBody) {

	    String memberPw = requestBody.get("memberPw");
	    String newMemberPw = requestBody.get("newMemberPw");

	    MemberDTO member = memberService.selectOneMember(token);
	    System.out.println(member);

	    int check = memberService.checkPw(member.getMemberEmail(), memberPw);
	    if (check == 1) {
	        int result = memberService.changePassword(member.getMemberEmail(), newMemberPw);
	        return ResponseEntity.ok(result);
	    } else {
	        return ResponseEntity.ok(2);
	    }
	}

	
	// 일정 조회
	@GetMapping(value = "/selectSchedule")
	public ResponseEntity<List> selectCalendar(@RequestHeader("Authorization") String token) {
	    MemberDTO member = memberService.selectOneMember(token);
	    List scheduleList = memberService.selectSchedule(member);
	    return ResponseEntity.ok(scheduleList);
	}
	
	// 일정 추가
	@PostMapping(value = "/insertSchedule")
	public ResponseEntity<Integer> insertSchedule(@RequestBody ScheduleDTO schedule) {
		int result = memberService.insertSchedule(schedule);
		return ResponseEntity.ok(result);
	}
	
	// 일정 삭제
	@DeleteMapping(value = "/deleteSchedule")
	public ResponseEntity<Integer> deleteSchedule(@RequestParam int dayNo) {
	    int result = memberService.deleteSchedule(dayNo);
	    return ResponseEntity.ok(result);
	}
	
	// 일정 수정
	@PostMapping(value = "/updateSchedule")
	public ResponseEntity<Integer> updateSchedule(@RequestBody ScheduleDTO schedule) {
		System.out.println(schedule);
		int result = memberService.updateSchedule(schedule);
		return ResponseEntity.ok(result);
	}
	
	// 구매 내역 불러오기
	@GetMapping(value = "/selectBuyList/{memberEmail}")
	public ResponseEntity<List> selectBuyList(@PathVariable String memberEmail) {
		List<BuyListDTO> buyList = memberService.selectBuyList(memberEmail);
		return ResponseEntity.ok(buyList);
	}
	
	// 구매 내역 상세보기
	@GetMapping(value = "/selectOneBuy/{payUid}")
	public ResponseEntity<List> selectOneBuy(@PathVariable long payUid) {
	    System.out.println(payUid);
	    List buyList = memberService.selectOneBuy(payUid);
	    System.out.println(buyList);
	    return ResponseEntity.ok(buyList);
	}
	
	//좋아요한 상품
	@GetMapping(value = "/product-like/{reqPage}")
	public ResponseEntity<Map<String, Object>> selectProductLike(
	    @RequestHeader("Authorization") String token, 
	    @PathVariable int reqPage) {

	    MemberDTO member = memberService.selectOneMember(token);
	    Map<String, Object> productLikeMap = memberService.selectProductLike(member.getMemberEmail(), reqPage);

	    System.out.println(productLikeMap);
	    return ResponseEntity.ok(productLikeMap);
	}
}
