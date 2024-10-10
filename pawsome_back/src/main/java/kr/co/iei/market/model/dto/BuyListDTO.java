package kr.co.iei.market.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias (value="buyList")
public class BuyListDTO {
	private int buyNo;			//구매내역 번호
	private int productNo;		//상품번호
	private String payUid;		//결제번호
	private int buyCount;		//상품 하나의 구매수량
	private String memberEmail;	//구매자
	private int buyState;		//결제상태
	private String productThumb;//상품썸네일
	private String productName;	//상품이름
	private int productPrice; 	//상품가격
	private int totalPrice;		//총결제금액
	
	private ProductDTO product;	//상품
	private PayDTO pay;			//가격
	private ReviewDTO review;	//리뷰
}
