package kr.co.iei.admin.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.market.model.dao.MarketDao;
import kr.co.iei.market.model.dto.ProductDTO;
import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.util.PageInfo;
import kr.co.iei.util.PageUtil;

@Service
public class AdminService {
	@Autowired
	private MarketDao marketDao;
	@Autowired
	private MemberDao memberDao;
	@Autowired
	private PageUtil pageUtil;
	@Transactional
	public int insertProduct(ProductDTO product) {
		int result=marketDao.insertProduct(product);
		return result;
	}
	public Map selectProductList(int reqPage) {
		int numPerPage=10;
		int pageNaviSize=5;
		int totalCount=marketDao.totalCountMagnum();
		PageInfo pi=pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List list=marketDao.selectProductListMagnum(pi);
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("list",list);
		map.put("pi",pi);
		return map;
	}
	@Transactional
	public int updateShow(ProductDTO product) {
		int result=marketDao.updateShow(product);
		return result;
	}
	public ProductDTO selectOneProduct(int productNo) {
		ProductDTO product=marketDao.selectOneProductMagnum(productNo);
		return product;
	}
	@Transactional
	public int updateProduct(ProductDTO product) {
		int result=marketDao.updateProduct(product);
		return result;
	}
	@Transactional
	public int deleteProduct(int productNo) {
		int result=marketDao.deleteProduct(productNo);
		return result;
	}
	public Map selectMemberList(int reqPage) {
		int numPerPage=10;
		int pageNaviSize=5;
		int totalCount=memberDao.totalCountMagnum();
		PageInfo pi=pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List list=memberDao.selectMemberListMagnum(pi);
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("list",list);
		map.put("pi",pi);
		return map;
	}
	@Transactional
	public int updateMemberLevel(MemberDTO member) {
		int result=memberDao.updateMemberLevelMagnum(member);
		return result;
	}
	
}
