package kr.co.iei.inquiry.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.inquiry.model.dao.InquiryDao;
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
}
