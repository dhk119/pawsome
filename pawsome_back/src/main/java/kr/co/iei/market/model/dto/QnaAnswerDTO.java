package kr.co.iei.market.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias (value="qnaAnswer")
public class QnaAnswerDTO {
	private int qnaAnswerNo;			//답글 번호
	private int qnaNo;					//Q&A번호
	private String qnaAnswerContent;	//답글 내용
	private String qnaRegDate;			//답글 작성일
	private String qnaAnswerWriter;			//답글 작성자(관리자로 고정)
}
