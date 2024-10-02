package kr.co.iei.pet.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.member.model.dto.PetDTO;
@Mapper
public interface PetDao {

	List<PetDTO> selectPetList(String memberEmail);

}
