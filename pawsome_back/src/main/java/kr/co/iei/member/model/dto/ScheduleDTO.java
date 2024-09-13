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
	private String dayEnd;
	private String dayContent;
	private String memberEmail;
}
