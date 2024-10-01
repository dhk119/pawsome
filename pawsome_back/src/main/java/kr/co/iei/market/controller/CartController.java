package kr.co.iei.market.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.market.model.dto.CartDTO;
import kr.co.iei.market.model.service.CartService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/cart")
public class CartController {
	@Autowired
	private CartService cartService;
	
	//장바구니에 상품 있는지 확인
	@GetMapping(value="/searchCart/{productNo}/{memberEmail}")
	public ResponseEntity<Boolean> searchCart(@PathVariable int productNo, @PathVariable String memberEmail){
		int result = cartService.searchCart(productNo, memberEmail);
		return ResponseEntity.ok(result == 1);
	}
	
	//장바구니  상품추가
	@PostMapping
	public ResponseEntity<Boolean> insertCart(@ModelAttribute CartDTO cart){
		int result = cartService.insertCart(cart);
		return ResponseEntity.ok(result == 1);
	}
	
	//장바구리 리스트 불러오기
	@GetMapping(value="/cartList/{memberEmail}")
	public ResponseEntity<List> cartList (@PathVariable String memberEmail){
		List list = cartService.selectCartList(memberEmail);
		return ResponseEntity.ok(list);
	}
	
	//장바구니 상품 갯수 변경
	@PatchMapping(value="/productCount/{productNo}/{productCartCount}/{memberEmail}")
	public ResponseEntity<Boolean> updateCount(@PathVariable int productNo, @PathVariable int productCartCount, @PathVariable String memberEmail){
		int result = cartService.updateProductCount(productNo, productCartCount, memberEmail);
		return ResponseEntity.ok(result == 1);
	}
	
	@DeleteMapping(value="/deleteCart/{cartNo}")
	public ResponseEntity<Boolean> deleteCart(@PathVariable int cartNo){
		int result = cartService.deleteCart(cartNo);
		return ResponseEntity.ok(result == 1);
	}
}
