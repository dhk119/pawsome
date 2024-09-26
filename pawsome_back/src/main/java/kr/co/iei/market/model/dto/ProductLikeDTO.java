package kr.co.iei.market.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias (value="productLike")
public class ProductLikeDTO {
	private int productNo;			//상품번호
	private String memberEmail;		//좋아요한 사람
}
