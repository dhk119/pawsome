package kr.co.iei.pet.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.member.model.dto.PetDTO;
import kr.co.iei.pet.dao.PetDao;
@Service
public class PetService {
	@Autowired
	private PetDao petDao;
	
	public List<PetDTO> selectPetList(String memberEmail) {
		List<PetDTO> petList = petDao.selectPetList(memberEmail);
		return null;
	}

	

}
