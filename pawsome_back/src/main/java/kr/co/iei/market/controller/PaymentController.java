package kr.co.iei.market.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.market.model.dto.CartDTO;
import kr.co.iei.market.model.service.PaymentService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/payment")
public class PaymentController {
	@Autowired
	private PaymentService paymentService;
	
	@PostMapping(value="/cart")
	public ResponseEntity<Boolean> insertCart(@ModelAttribute CartDTO cart){
		int result = paymentService.insertCart(cart);
		return ResponseEntity.ok(result == 1);
	}
	
}
