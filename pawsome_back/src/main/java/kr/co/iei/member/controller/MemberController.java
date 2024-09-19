package kr.co.iei.member.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
