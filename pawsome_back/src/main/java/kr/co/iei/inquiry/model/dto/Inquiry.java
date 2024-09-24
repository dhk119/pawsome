package kr.co.iei.inquiry.model.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias("inquiry")
public class Inquiry {
	private int inquiryNo;
	private String inquiryTitle;
	private String inquiryContent;
	private String inquiryRegDate;
	private int inquiryType;
	private String memberEmail;
	List<InquiryComment> inquiryCommentList;
}
