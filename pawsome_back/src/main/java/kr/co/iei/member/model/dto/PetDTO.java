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
	private int petClasses;	//1, 2
	private String petBreed;
	private String petBirth;
	private String petGender; //남, 여
	private int neutering;	//1, 2
	private String petProfile;
	private int petWeight;
	private String memberEmail;
}
