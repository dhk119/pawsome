package kr.co.iei.market.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class RefundRequestDTO {
	private int buyNo;		//구매번호
	private int productNo;	//상품번호
	private String payUid;	//uid
	private int cancelRequestAmount;	//환불금액
}
