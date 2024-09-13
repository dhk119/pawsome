package kr.co.iei.member.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "pet")
public class PetDTO {
	private int petNo;
	private String petName;
	private int petClasses;
	private String petBreed;
	private String petBirth;
	private String petGender;
	private String neutering;
	private String petProfile;
	private int petWeight;
	private String memberEmail;
}
