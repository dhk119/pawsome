package kr.co.iei.market.model.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias (value="qna")
public class QnaDTO {
	private int qnaNo;				//Q&A번호
	private int productNo;			//상품번호
	private int qnaType;			//분류 : 1-전체, 2-상품, 3-배송, 4-결제, 5-기타
	private String qnaTitle;		//제목
	private String qnaContent;		//내용
	private int qnaPublic;			//0-공개, 1-비공개
	private String qnaRegDate;		//작성일
	private String qnaWriter;		//작성자
	private String qnaAnswerContent;		//답글 컨텐츠
	private String qnaAnswerRegDate;		//답글 작성일
}
