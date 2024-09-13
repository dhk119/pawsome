package kr.co.iei.member.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "member")
public class MemberDTO {
	private String memberEmail;
	private String memberNickname;
	private String memberPw;
	private String memberName;
	private String memberAddr1;
	private String memberAddr2;
	private String memberAddr3;
	private int memberLevel;
	private String memberProfile;
	private String enrollDate;
	private String loginType;
}
