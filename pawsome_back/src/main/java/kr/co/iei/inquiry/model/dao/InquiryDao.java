package kr.co.iei.inquiry.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.inquiry.model.dto.Inquiry;
import kr.co.iei.inquiry.model.dto.InquiryComment;
import kr.co.iei.util.PageInfo;

@Mapper
public interface InquiryDao {

	int totalCount();

	List selectInquiryList(PageInfo pi);

	int insertInquiry(Inquiry inquiry);

	Inquiry selectOneInquiry(int inquiryNo);

	int deleteInquiry(int inquiryNo);

	int updateInquiry(Inquiry inquiry);

	int insertInquiryComment(InquiryComment inquiryComment);

	int updateInquiryComment(InquiryComment inquiryComment);

	int deleteInquiryComment(int inquiryCommentNo);

	int searchTotalCount(int reqPage, String type, String keyword, int option);

	List searchInquiryList(int start, int end, int reqPage , String type, String keyword, int option);
	
}
