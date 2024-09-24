package kr.co.iei.inquiry.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias("inquiryComment")
public class InquiryComment {
	private int inquiryCommentNo;
	private int inquiryNo;
	private String inquiryCommentContent;
	private String inquiryCommentRegDate;
	private String memberEmail;
}
