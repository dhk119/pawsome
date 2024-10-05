package kr.co.iei.board.model.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="reply")
public class ReplyDTO {
	private int replyNo;
	private int boardNo;
	private int replyNoRef;
	private String replyContent;
	private String replyRegDate;
	private String memberNickname;
	private String memberProfile;
	private int reReplyCount;
	private int replyLike;
	private int isLike;
	private List reReplyList;
}
