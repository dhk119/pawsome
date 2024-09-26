package kr.co.iei.inquiry.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.inquiry.model.dao.InquiryDao;
import kr.co.iei.inquiry.model.dto.Inquiry;
import kr.co.iei.inquiry.model.dto.InquiryComment;
import kr.co.iei.util.PageInfo;
import kr.co.iei.util.PageUtil;

@Service
public class InquiryService {
	@Autowired
	private InquiryDao inquiryDao;
	@Autowired
	private PageUtil pageUtil;

	public Map selectInquiryList(int reqPage) {
		int numPerPage=10;
		int pageNaviSize=5;
		int totalCount=inquiryDao.totalCount();
		PageInfo pi=pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List list=inquiryDao.selectInquiryList(pi);
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("list",list);
		map.put("pi",pi);
		return map;
	}
	
	@Transactional
	public int insertInquiry(Inquiry inquiry) {
		int result=inquiryDao.insertInquiry(inquiry);
		return result;
	}

	public Inquiry selectOneInquiry(int inquiryNo) {
		Inquiry inquiry=inquiryDao.selectOneInquiry(inquiryNo);
		return inquiry;
	}
	@Transactional
	public int deleteInquiry(int inquiryNo) {
		int result=inquiryDao.deleteInquiry(inquiryNo);
		return result;
	}
	@Transactional
	public int updateInquiry(Inquiry inquiry) {
		int result=inquiryDao.updateInquiry(inquiry);
		return result;
	}
	
	@Transactional
	public int insertInquiryComment(InquiryComment inquiryComment) {
		int result=inquiryDao.insertInquiryComment(inquiryComment);
		return result;
	}
	@Transactional
	public int updateInquiryComment(InquiryComment inquiryComment) {
		int result=inquiryDao.updateInquiryComment(inquiryComment);
		return result;
	}
	@Transactional
	public int deleteInquiryComment(int inquiryCommentNo) {
		int result=inquiryDao.deleteInquiryComment(inquiryCommentNo);
		return result;
	}
}
