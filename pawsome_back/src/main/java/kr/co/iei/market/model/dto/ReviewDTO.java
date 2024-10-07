package kr.co.iei.market.model.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias (value="review")
public class ReviewDTO {
	private int reviewNo;			//리뷰번호
	private int productNo;			//상품번호
	private int reviewStar;			//별점
	private String reviewContent;	//리뷰내용
	private String reviewRegDate;	//리뷰 등록일
	private String reviewWriter;		//작성자
	private List<ReviewFileDTO> reviewFileList; //리뷰사진리스트
	private int[] delFileNo;		//삭제할 리뷰사진번호
	private int star;
	private int totalStar;
	
}
