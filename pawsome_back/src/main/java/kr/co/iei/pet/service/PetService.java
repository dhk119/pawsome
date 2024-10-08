package kr.co.iei.pet.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.member.model.dto.PetDTO;
import kr.co.iei.pet.dao.PetDao;

import kr.co.iei.pet.dto.SaveStatusDTO;
@Service
public class PetService {
	@Autowired
	private PetDao petDao;
	
	public List<PetDTO> selectPetList(String memberEmail) {
		List<PetDTO> petList = petDao.selectPetList(memberEmail);
		return petList;
	}
	@Transactional
	public int savePetStatus(SaveStatusDTO saveResultStatus) {
		int searchStatus = petDao.selectPetStatus(saveResultStatus.getPetNo());
		int updateResult = 0;
		int saveResult = 0;
		if(searchStatus > 0) {
			 updateResult = petDao.updatePetStatus(saveResultStatus);
		}else {
			
			 saveResult = petDao.savePetStatus(saveResultStatus);
		}
		if(updateResult > 0 ) {
			return updateResult;
		}else if(saveResult > 0 ) {
			return saveResult;
		}else {
			return 0;
		}
	}



}
