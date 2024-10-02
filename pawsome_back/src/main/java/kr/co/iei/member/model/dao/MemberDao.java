package kr.co.iei.member.model.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.member.model.dto.MemberDTO;

import kr.co.iei.util.PageInfo;
import kr.co.iei.member.model.dto.PetDTO;
import kr.co.iei.member.model.dto.ScheduleDTO;


@Mapper
public interface MemberDao {

	int insertMember(MemberDTO member);

	MemberDTO selectOneMember(String memberEmail);

	int checkEmail(String memberEmail);

	int checkNickname(String memberNickname);


	int totalCountMagnum();

	List selectMemberListMagnum(PageInfo pi);

	int updateMemberLevelMagnum(MemberDTO member);

	int insertPet(PetDTO pet);

	List selectMemberPet(String memberEmail);

	String selectOneEmail(MemberDTO member);

	int changePassword(String memberEmail, String memberPw);

	int updateMember(MemberDTO member);

	ArrayList<ScheduleDTO> selectSchedule(String memberEmail);

	int totalPetCountMagnum();

	List selectPetListMagnum(PageInfo pi);

	int insertSchedule(ScheduleDTO schedule);

	int deleteSchedule(int dayNo);

	int updateSchedule(ScheduleDTO schedule);

	PetDTO selectOnePet(int petNo);

	int deleteMember(String memberEmail);
}
