package kr.co.iei.pet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.member.model.dto.PetDTO;

import kr.co.iei.pet.dto.SaveStatusDTO;
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
	
	@PostMapping("/saveStatus")
	public ResponseEntity<Integer> savePetStatus(@RequestBody SaveStatusDTO saveResultStatus){
		int saveResult = petService.savePetStatus(saveResultStatus);
	return ResponseEntity.ok(saveResult);
}
	@GetMapping("/healthResult/{petNo}")
	public ResponseEntity<SaveStatusDTO> selectPetResult(@PathVariable int petNo){
		SaveStatusDTO healthResult = petService.selectPetResult(petNo);
		return ResponseEntity.ok(healthResult);
	}
}
