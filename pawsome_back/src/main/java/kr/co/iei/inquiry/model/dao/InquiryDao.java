package kr.co.iei.inquiry.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.util.PageInfo;

@Mapper
public interface InquiryDao {

	int totalCount();

	List selectInquiryList(PageInfo pi);

}
