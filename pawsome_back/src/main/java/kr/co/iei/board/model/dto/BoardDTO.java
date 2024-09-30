package kr.co.iei.board.model.dto;

import java.util.List;

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
	private String memberProfile;
	private List<BoardFileDTO> fileList;
	private List<ReplyDTO> replyList;
	private int[] delBoardFileNo;
}
