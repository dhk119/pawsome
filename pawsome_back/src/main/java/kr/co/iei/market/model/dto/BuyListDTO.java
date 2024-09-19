package kr.co.iei.market.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class BuyListDTO {
	private int buyNo;			//구매내역 번호
	private int productNo;		//상품번호
	private String payUid;		//결제번호
	private int buyCount;		//상품 하나의 구매수량
	private String memberEmail;	//구매자
}
