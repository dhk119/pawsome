package kr.co.iei.member.model.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.market.model.dao.MarketDao;
import kr.co.iei.market.model.dto.BuyListDTO;
import kr.co.iei.market.model.dto.ProductLikeDTO;
import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.LoginMemberDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.dto.PetDTO;
import kr.co.iei.member.model.dto.ScheduleDTO;
import kr.co.iei.util.JwtUtils;

@Service
public class MemberService {
	@Autowired
	private MemberDao memberDao;
	@Autowired
	private BCryptPasswordEncoder encoder;
	@Autowired
	private JwtUtils jwtUtil;
	
	@Autowired
	private MarketDao MarketDao;

	@Transactional
	public int insertMember(MemberDTO member) {
		if(member.getMemberPw() != null) {			
			String encPw = encoder.encode(member.getMemberPw());
			member.setMemberPw(encPw);
		}
		int result = memberDao.insertMember(member);
		return result;
	}

	public LoginMemberDTO login(MemberDTO member) {
		MemberDTO m = memberDao.selectOneMember(member.getMemberEmail());
		if(m != null && encoder.matches(member.getMemberPw(), m.getMemberPw())) {
			String accessToken = jwtUtil.createAccessToken(m.getMemberEmail(), m.getMemberLevel(), m.getMemberNickname());
			String refreshToken = jwtUtil.createRefreshToken(m.getMemberEmail(), m.getMemberLevel(), m.getMemberNickname());
			LoginMemberDTO loginMember = new LoginMemberDTO(accessToken, refreshToken, m.getMemberEmail(), m.getMemberLevel(), m.getMemberNickname(), m.getLoginType());
			return loginMember;
		}
		return null;
	}
	
	public LoginMemberDTO login(String memberEmail) {
		MemberDTO m = memberDao.selectOneMember(memberEmail);
		String accessToken = jwtUtil.createAccessToken(m.getMemberEmail(), m.getMemberLevel(), m.getMemberNickname());
		String refreshToken = jwtUtil.createRefreshToken(m.getMemberEmail(), m.getMemberLevel(), m.getMemberNickname());
		LoginMemberDTO loginMember = new LoginMemberDTO(accessToken, refreshToken, memberEmail, m.getMemberLevel(), m.getMemberNickname(), m.getLoginType());
		return loginMember;
	}

	public LoginMemberDTO refresh(String token) {
		try {
			LoginMemberDTO loginMember = jwtUtil.checkToken(token);				
			String accessToken
			= jwtUtil.createAccessToken(loginMember.getMemberEmail(), loginMember.getMemberLevel(), loginMember.getMemberNickname());
			String refreshToken
			= jwtUtil.createRefreshToken(loginMember.getMemberEmail(), loginMember.getMemberLevel(), loginMember.getMemberNickname());
			loginMember.setAccessToken(accessToken);
			loginMember.setRefreshToken(refreshToken);
			return loginMember;
		}catch(Exception e) {
			
		}
		return null;
	}

	public int checkEmail(String memberEmail) {
		int result = memberDao.checkEmail(memberEmail);
		return result;
	}

	public int checkNickname(String memberNickname) {
		int result = memberDao.checkNickname(memberNickname);
		return result;
	}

	public MemberDTO selectOneMember(String token) {
		LoginMemberDTO loginMember = jwtUtil.checkToken(token);
		MemberDTO member = memberDao.selectOneMember(loginMember.getMemberEmail());
		member.setMemberPw(null);
		if(member != null) {
			List list = memberDao.selectMemberPet(member.getMemberEmail());
			member.setPetList(list);
		}
		return member;
	}
	
	public MemberDTO selectMember(String memberEmail) {
		MemberDTO member = memberDao.selectOneMember(memberEmail);
		member.setMemberPw(null);
		return member;
	}

	@Transactional
	public int insertPet(PetDTO pet) {
		int result = memberDao.insertPet(pet);
		return result;
	}

	public String selectOneEmail(MemberDTO member) {
		String loginType = memberDao.selectOneEmail(member);
		return loginType;
	}

	@Transactional
	public int changePassword(String memberEmail, String memberPw) {
		String encPw = encoder.encode(memberPw);
		int result = memberDao.changePassword(memberEmail, encPw);
		return result;
	}

	public int updateMember(MemberDTO member) {
		int result = memberDao.updateMember(member);
		return result;
	}

	public int checkPw(String memberEmail, String memberPw) {
		MemberDTO m = memberDao.selectOneMember(memberEmail);
		if(m!=null && encoder.matches(memberPw, m.getMemberPw())) {
			return 1;
		}
		return 0;
	}

	public List<ScheduleDTO> selectSchedule(MemberDTO member) {
	    List<ScheduleDTO> scheduleList = memberDao.selectSchedule(member.getMemberEmail());

	    List<PetDTO> petList = member.getPetList();
	    for (PetDTO pet : petList) {
	        ScheduleDTO petSchedule = new ScheduleDTO(0, 
	            pet.getPetName() + "의 생일입니다.",
	            pet.getPetBirth(),
	            null,
	            pet.getPetBreed() + " "+ pet.getPetName() + "의 생일입니다.",
	            member.getMemberEmail());
	        
	        scheduleList.add(petSchedule);
	    }

	    return scheduleList;
	}

	@Transactional
	public int insertSchedule(ScheduleDTO schedule) {
		int result = memberDao.insertSchedule(schedule);
		return result;
	}

	@Transactional
	public int deleteSchedule(int dayNo) {
		int result = memberDao.deleteSchedule(dayNo);
		return result;
	}

	@Transactional
	public int updateSchedule(ScheduleDTO schedule) {
		int result = memberDao.updateSchedule(schedule);
		return result;
	}

	public PetDTO selectOnePet(int petNo) {
		PetDTO pet = memberDao.selectOnePet(petNo);
		return pet;
	}

	@Transactional
	public int deleteMember(String memberEmail) {
		int result = memberDao.deleteMember(memberEmail);
		return result;
	}

	@Transactional
	public int updatePet(PetDTO pet) {
		int result = memberDao.updatePet(pet);
		return result;
	}

	@Transactional
	public int deletePet(int petNo) {
		int result = memberDao.deletePet(petNo);
		return result;
	}

	public List selectBuyList(String memberEmail) {
		System.out.println(memberEmail);
		List<BuyListDTO> buyList = MarketDao.selectBuyList(memberEmail);
		System.out.println(buyList);
		return buyList;
	}

	public BuyListDTO selectOneBuy(int buyNo) {
		BuyListDTO buy = MarketDao.selectOneBuy(buyNo);
	    return buy;
	}

	public List<ProductLikeDTO> productLike(String memberEmail) {
		List<ProductLikeDTO> list = MarketDao.productLike(memberEmail);
		return list;
	}

}
