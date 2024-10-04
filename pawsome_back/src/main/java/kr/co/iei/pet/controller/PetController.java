package kr.co.iei.pet.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.member.model.dto.PetDTO;
import kr.co.iei.pet.service.PetService;

@CrossOrigin
@RestController
@RequestMapping(value="/pet")
public class PetController {
	@Autowired
	private PetService petService;
	
	@GetMapping("/petList/{memberEmail}")
	public ResponseEntity<List> selectPetList(@PathVariable String memberEmail){
		System.out.println(memberEmail);
		List<PetDTO> petList = petService.selectPetList(memberEmail);
		return ResponseEntity.ok(petList);	
	}
}
