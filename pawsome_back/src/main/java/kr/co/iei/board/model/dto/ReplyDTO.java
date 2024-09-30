package kr.co.iei.board.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="Reply")
public class ReplyDTO {
	private int replyNo;
	private int boardNo;
	private int replyNoRef;
	private String reply;
	private String replyRegDate;
	private String replyImage;
	private String memberNickname;
	private String memberProfile;

}
