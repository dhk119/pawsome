package kr.co.iei.admin.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.market.model.dao.MarketDao;
import kr.co.iei.market.model.dto.ProductDTO;
import kr.co.iei.market.model.dto.QnaAnswerDTO;
import kr.co.iei.market.model.dto.QnaDTO;
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
	public Map selectPetList(int reqPage) {
		int numPerPage=10;
		int pageNaviSize=5;
		int totalCount=memberDao.totalPetCountMagnum();
		PageInfo pi=pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List list=memberDao.selectPetListMagnum(pi);
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("list",list);
		map.put("pi",pi);
		return map;
	}
	public Map selectQnaList(int reqPage, boolean answer) {
		int numPerPage=10;
		int pageNaviSize=5;
		int totalCount=marketDao.totalQnaCountMagnum(answer);
		PageInfo pi=pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List list=marketDao.selectQnaListMagnum(pi.getStart(), pi.getEnd(), answer);
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("list",list);
		map.put("pi",pi);
		return map;
	}
	public QnaDTO selectOneQna(int qnaNo) {
		QnaDTO qna=marketDao.selectOneQnaMagnum(qnaNo);
		return qna;
	}
	@Transactional
	public int insertQnaAnswer(QnaAnswerDTO qnaAnswer) {
		int result=marketDao.insertQnaAnswer(qnaAnswer);
		return result;
	}
	@Transactional
	public int updateQnaAnswer(QnaAnswerDTO qnaAns) {
		int result=marketDao.updateQnaAnswer(qnaAns);
		return result;
	}
	@Transactional
	public int deleteQnaAnswer(int qnaNo) {
		int result=marketDao.deleteQnaAnswer(qnaNo);
		return result;
	}
	public Map searchProductList(int reqPage, String type, String keyword, String option) {
		int numPerPage=10;
		int pageNaviSize=5;
		int totalCount=marketDao.searchTotalCountMagnum(type, keyword, option);
		PageInfo pi=pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List list=marketDao.searchProductListMagnum(pi.getStart(), pi.getEnd(), type, keyword, option);
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("list",list);
		map.put("pi",pi);
		return map;
	}
	public Map searchProductList(int reqPage, String option) {
		int numPerPage=10;
		int pageNaviSize=5;
		int totalCount=marketDao.searchTotalCountOption(option);
		PageInfo pi=pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List list=marketDao.searchProductListOption(pi.getStart(), pi.getEnd(), option);
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("list",list);
		map.put("pi",pi);
		return map;
	}
}
