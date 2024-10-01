package kr.co.iei.market.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.market.model.dto.CartDTO;
import kr.co.iei.market.model.dto.ProductDTO;
import kr.co.iei.market.model.dto.QnaAnswerDTO;
import kr.co.iei.market.model.dto.QnaDTO;
import kr.co.iei.util.PageInfo;

@Mapper
public interface MarketDao {
	/*승환*/
	int insertProduct(ProductDTO product);
	
	int totalCountMagnum();
	
	List selectProductListMagnum(PageInfo pi);
	
	ProductDTO selectOneProductMagnum(int productNo);
	
	int updateShow(ProductDTO product);
	
	int updateProduct(ProductDTO product);
	
	int deleteProduct(int productNo);
	
	int totalQnaCountMagnum(boolean answer);

	List selectQnaListMagnum(int start, int end, boolean answer);
	
	QnaDTO selectOneQnaMagnum(int qnaNo);

	
	/*원희*/
	int totalCount(int typeCategory, String mainCategory);

	List selectProductList(int typeCategory, String mainCategory, int start, int end);

	ProductDTO selectOneProduct(int productNo);
/*Q&A*/
	int insertQna(QnaDTO qna);

	int totalQnaCount(int productNo);

	List selectQnaList(int productNo, int start, int end);

	QnaDTO selectQna(int qnaNo);

	int updateQna(QnaDTO qna);

	int deleteQna(int qnaNo);

	int insertQnaAnswer(QnaAnswerDTO qnaAnswer);

	int updateQnaAnswer(QnaAnswerDTO qnaAnswer);

	int deleteQnaAnswer(int qnaNo);
/*장바구니*/
	int searchCart(int productNo, String memberEmail);
	
	int insertCart(CartDTO cart);

	List selectCartList(String memberEmail);

	int updateProductCount(int productNo, int productCartCount, String memberEmail);




	

}
