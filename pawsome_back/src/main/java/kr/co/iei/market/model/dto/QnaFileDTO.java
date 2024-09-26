package kr.co.iei.market.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias (value="qnaFile")
public class QnaFileDTO {
	private int qnaFileNo;			//파일번호
	private String qnaFileOrg;		//원본이름
	private String qnaFileStorage;	//저장이름
	private int qnaNo;				//Q&A 번호
}
