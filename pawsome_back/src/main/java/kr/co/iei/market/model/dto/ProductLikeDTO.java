package kr.co.iei.market.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductLikeDTO {
	private int productNo;			//상품번호
	private String memberEmail;		//좋아요한 사람
}
