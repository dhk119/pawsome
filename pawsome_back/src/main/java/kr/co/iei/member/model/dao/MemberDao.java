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

	int updatePet(PetDTO pet);

	int deletePet(int petNo);

	int searchTotalCountMemberMagnum(String type, String keyword, String option);

	List searchMemberListMagnum(int start, int end, String type, String keyword, String option);

	int searchTotalCountMemberOption(String option);

	List searchMemberListOption(int start, int end, String option);

	int searchTotalCountPetMagnum(String type, String keyword, int option);

	List searchPetListMagnum(int start, int end, String type, String keyword, int option);

	int searchTotalCountPetOption(int option);

	List searchPetListOption(int start, int end, int option);
}
