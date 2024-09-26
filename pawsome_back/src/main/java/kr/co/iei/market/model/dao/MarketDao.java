package kr.co.iei.market.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.market.model.dto.ProductDTO;
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
	
	
	/*원희*/
	int totalCount(int typeCategory, String mainCategory);

	List selectProductList(int typeCategory, String mainCategory, int start, int end);

	ProductDTO selectOneProduct(int productNo);

	int insertQna(QnaDTO qna);

	int totalQnaCount(int productNo);

	List selectQnaList(int productNo, int start, int end);

	QnaDTO selectQna(int qnaNo);

	int updateQna(QnaDTO qna);

	

}
