package kr.co.iei.market.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias (value="reviewFile")
public class ReviewFileDTO {
	private int reviewFileNo;			//파일번호
	private String reviewFileOrg;		//원본이름
	private String reviewFileStorage;	//저장이름
	private int reviewNo;				//리뷰 번호
}
