package kr.co.iei.member.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "schedule")
public class ScheduleDTO {
	private int dayNo;
	private String dayTitle;
	private String dayStart;
	private String dayEnd; //null이면, start기준  1일치 일정
	private String dayContent;
	private String memberEmail;
	private int petBirth;
}
