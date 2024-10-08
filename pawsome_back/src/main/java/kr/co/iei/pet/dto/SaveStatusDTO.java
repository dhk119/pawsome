package kr.co.iei.pet.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "petHealth")
public class SaveStatusDTO {
	private int testNo;
	private int petNo;
	private int petWeightStatus;
	private int petSkinStatus;
	private int petDentalStatus;
	private int petBoneStatus;
	private int petEyeStatus;
	private int petHeartStatus;
	private int petImmunityStatus;
	
}


