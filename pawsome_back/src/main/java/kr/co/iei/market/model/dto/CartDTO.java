package kr.co.iei.market.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CartDTO {
	private int cartNo;				//장바구니 번호
	private int productNo;			//상품 번호
	private int productCartCount;	//구매수량
	private String memberEmail;		//구매자
}
