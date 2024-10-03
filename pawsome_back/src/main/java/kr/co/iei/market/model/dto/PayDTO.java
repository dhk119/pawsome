package kr.co.iei.market.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias (value="pay")
public class PayDTO {
	private String payUid;			//결제번호
	private int totalPrice;			//총 결제금액
	private String payDate;			//결제일
	private String payAddr1;		//받는 곳 우편번호
	private String payAddr2;		//받는 곳 도로명주소
	private String payAddr3;		//받는 곳 상세주소
	private String payName;			//받는 사람
	private int payState;			//1-결제완료, 2-결제취소
	private String memberEmail;		//실결제자
	private String payProductNo;		//결제상품 목록 받아올 문자열
}
