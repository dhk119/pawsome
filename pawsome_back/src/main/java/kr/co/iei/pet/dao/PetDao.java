package kr.co.iei.pet.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.member.model.dto.PetDTO;
import kr.co.iei.pet.dto.SaveStatusDTO;
@Mapper
public interface PetDao {

	List<PetDTO> selectPetList(String memberEmail);

	int savePetStatus(SaveStatusDTO saveResultStatus);

	int selectPetStatus(int petNo);

	int updatePetStatus(SaveStatusDTO saveResultStatus);

	SaveStatusDTO selectPetResult(int petNo);

}
