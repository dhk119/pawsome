package kr.co.iei.market.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.market.model.dto.PayDTO;
import kr.co.iei.market.model.service.PayService;
import kr.co.iei.member.model.dto.MemberDTO;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/pay")
public class PayController {
	@Autowired
	private PayService payService;
	
	@GetMapping(value="/payList/{checkCartNo}")
	public ResponseEntity<List> payList (@PathVariable String checkCartNo){
		List payList = payService.selectPayList(checkCartNo);
		return ResponseEntity.ok(payList);
	}

	@GetMapping(value="/payer/{memberEmail}")
	public ResponseEntity<MemberDTO> payer (@PathVariable String memberEmail){
		MemberDTO payer = payService.selectPayer(memberEmail);
		return ResponseEntity.ok(payer);
	}
	
	@PostMapping(value="/payment")
	public ResponseEntity<Boolean> insertPayment (@ModelAttribute PayDTO pay){
		System.out.println("결제값 : "+pay);
		boolean result = payService.insertPayment(pay);
		System.out.println(result);
		return ResponseEntity.ok(result);
	}
	
}
