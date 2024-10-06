package kr.co.iei.market.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import kr.co.iei.market.model.dao.MarketDao;
import kr.co.iei.market.model.dto.ProductDTO;
import kr.co.iei.market.model.dto.QnaAnswerDTO;
import kr.co.iei.market.model.dto.QnaDTO;
import kr.co.iei.market.model.dto.ReviewDTO;
import kr.co.iei.market.model.dto.ReviewFileDTO;
import kr.co.iei.util.PageInfo;
import kr.co.iei.util.PageUtil;

@Service
public class ProductService {
	@Autowired
	private MarketDao marketDao;
	@Autowired
	private PageUtil pageUtil;

	public Map selectProductList(int typeCategory, String mainCategory, int reqPage, int filterType, String loginEmail) {
		int numPerPage = 15;
		int pageNaviSize = 5;
		int totalCount = marketDao.totalCount(typeCategory, mainCategory);
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		int start = pi.getStart();
		int end = pi.getEnd();
		List<ProductDTO> list = marketDao.selectProductList(typeCategory, mainCategory,start,end,filterType);
		//좋아요 여부 세팅
		for (ProductDTO product : list) {
			int isLike = marketDao.isLike(product.getProductNo(),loginEmail);
			if(isLike == 1) {
				product.setIsLike(isLike);
			}
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("pi", pi);
		map.put("totalCount", totalCount);
		return map;
	}

	public ProductDTO selectOneProduct(int productNo) {
		ProductDTO product = marketDao.selectOneProduct(productNo);
		return product;
	}

	@Transactional
	public int insertQna(QnaDTO qna) {
		int result = marketDao.insertQna(qna);
		return result;
	}

	public Map selectQnaList(int productNo, int reqPage) {
		int numPerPage = 10;
		int pageNaviSize = 5;
		int totalQnaCount = marketDao.totalQnaCount(productNo);
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalQnaCount);
		int start = pi.getStart();
		int end = pi.getEnd();
		List list = marketDao.selectQnaList(productNo,start,end);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("pi", pi);
		map.put("totalCount", totalQnaCount);
		return map;
	}

	public QnaDTO selectQna(int qnaNo) {
		QnaDTO qna = marketDao.selectQna(qnaNo);
		return qna;
	}

	@Transactional
	public int updateQna(QnaDTO qna) {
		int result = marketDao.updateQna(qna);
		return result;
	}

	@Transactional
	public int deleteQna(int qnaNo) {
		int result = marketDao.deleteQna(qnaNo);
		return result;
	}

	@Transactional
	public int insertQnaAnswer(QnaAnswerDTO qnaAnswer) {
		int result = marketDao.insertQnaAnswer(qnaAnswer);
		return result;
	}

	@Transactional
	public int updateQnaAnswer(QnaAnswerDTO qnaAnswer) {
		int result = marketDao.updateQnaAnswer(qnaAnswer);
		return result;
	}

	@Transactional
	public int deleteQnaAnswer(int qnaNo) {
		int result = marketDao.deleteQnaAnswer(qnaNo);
		return result;
	}

	@Transactional
	public int changeLike(String loginEmail, ProductDTO product) {
		int result = -1;
		if(product.getIsLike() == 1) {
			product.setIsLike(0);
			int reResult = marketDao.deleteLike(loginEmail, product);
			if(reResult > 0) {
				result = 2;
			}
		}else {
			product.setIsLike(1);
			int reResult = marketDao.insertLike(loginEmail, product);
			if(reResult > 0) {
				result = 3;
			}
		}
		return result;
	}

	@Transactional
	public int insertReview(ReviewDTO review, List<ReviewFileDTO> reviewFileList) {
		int result = marketDao.insertReview(review);
		int reviewNo = marketDao.selectReviewNo(review);
		for(ReviewFileDTO reviewFile : reviewFileList) {
			reviewFile.setReviewNo(reviewNo);
			result += marketDao.insertReviewFile(reviewFile);
		}
		System.out.println("파일인서트결과 : "+result);
		if(result > 0) {
			return result;
		}else {
			return 0;			
		}
	}
	
	
}
