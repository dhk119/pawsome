package kr.co.iei.market.model.service;

import java.util.ArrayList;
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

	public ProductDTO selectOneProduct(int productNo, String loginEmail) {
		ProductDTO product = marketDao.selectOneProduct(productNo);
		int result = marketDao.isLike(productNo, loginEmail);
		product.setIsLike(result);
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

	public ReviewDTO selectOneReview(int reviewNo) {
		ReviewDTO review = marketDao.selectOneReview(reviewNo);
		List reviewFileList = marketDao.selectReviewFileList(reviewNo);
		review.setReviewFileList(reviewFileList);
		return review;
	}

	@Transactional
	public List<ReviewFileDTO> updateReview(ReviewDTO review, List<ReviewFileDTO> reviewFileList) {
		int result = marketDao.updateReview(review);
		if(result > 0) {
			List<ReviewFileDTO> delFileList = new ArrayList<ReviewFileDTO>();
			if(review.getDelFileNo()!=null && review.getDelFileNo().length > 0) {
				delFileList = marketDao.selectDelReviewFileList(review.getDelFileNo());
				result += marketDao.deleteReviewFile(review.getDelFileNo());
			}
			for(ReviewFileDTO reviewFile : reviewFileList) {
				result += marketDao.insertReviewFile(reviewFile);
			}
			int updateTotal = review.getDelFileNo() == null
								? 1 + reviewFileList.size()
								: 1 + reviewFileList.size() + review.getDelFileNo().length;
			if(result == updateTotal) {
				return delFileList;
			}
		}
		return null;
	}

	public Map selectReviewList(int productNo,int reqPage) {
		int numPerPage = 5;
		int pageNaviSize = 5;
		int totalCount = marketDao.reviewTotalCount(productNo);
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		int start = pi.getStart();
		int end = pi.getEnd();
		List<ReviewDTO> list = marketDao.selectReviewList(productNo,start,end);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("pi", pi);
		map.put("totalCount", totalCount);
		return map;
	}

	public List selectOneReviewFileList(int reviewNo) {
		List list = marketDao.selectOneReviewFileList(reviewNo);
		return list;
	}
	
	@Transactional
	public List<ReviewFileDTO> deleteReview(int reviewNo) {
		List<ReviewFileDTO> delFileList = marketDao.selectOneReviewFile(reviewNo);
		int result = marketDao.deleteReivew(reviewNo);
		if(result>0) {
			return delFileList;
		}else {
			return null;			
		}
	}

	public List selectStar(int productNo) {
		List<Integer> starList = marketDao.starList(productNo); //별점리스트
		return starList;
	}
	
	public Map selectSearchMarketList(int reqPage, String searchKeyWord) {
		int numPerPage = 4;
		int pageNaviSize = 5;
		int totalCount = marketDao.searchMarketTotalCount(searchKeyWord);
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		Map<String, Object> m = new HashMap<String, Object>();
		m.put("start", pi.getStart());
		m.put("end", pi.getEnd());
		m.put("searchKeyWord", searchKeyWord);
		List list = marketDao.selectSearchMarketList(m);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("pi", pi);
		System.out.println(map);
		return map;
	}

	public List selectMainMarketList() {
		List list = marketDao.selectMainMarketList();
		return list;
	}
}
