package kr.co.iei.member.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.member.model.dto.MemberDTO;

@Mapper
public interface MemberDao {

	int insertMember(MemberDTO member);

	MemberDTO selectOneMember(String memberEmail);

	int checkEmail(String memberEmail);

	int checkNickname(String memberNickname);

}
