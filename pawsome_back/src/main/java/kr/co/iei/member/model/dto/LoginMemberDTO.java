package kr.co.iei.member.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class LoginMemberDTO {
	private String accessToken;
	private String refreshToken;
	private String memberEmail;
	private int memberLevel;
	private String memberNickname;
	private String loginType;
}
