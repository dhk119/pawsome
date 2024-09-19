package kr.co.iei.market.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class QnaFileDTO {
	private int qnaFileNo;			//파일번호
	private String qnaFileOrg;		//원본이름
	private String qnaFileStorage;	//저장이름
	private int qnaNo;				//Q&A 번호
}
