package kr.co.iei.inquiry.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias("searchFrm")
public class SearchFrm {
	private int reqPage;
	private String keyword;
	private String type;
	private int option;
}
