package kr.co.iei.board.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "board")
public class BoardDTO {
	private int boardNo;
	private int boardTag;
	private String boardTitle;
	private String boardContent;
	private String boardThumb;
	private int readCount;
	private String regDate;
	private String memberNickname;
	private int boardLike;
}
