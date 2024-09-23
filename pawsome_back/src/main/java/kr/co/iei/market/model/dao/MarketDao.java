package kr.co.iei.market.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.market.model.dto.ProductDTO;
import kr.co.iei.util.PageInfo;

@Mapper
public interface MarketDao {
	/*승환*/
	int insertProduct(ProductDTO product);
	
	int totalCountAll();
	
	List selectProductAllList(PageInfo pi);
	
	
	/*원희*/
	int totalCount(int typeCategory, int mainCategory);

	List selectProductList(PageInfo pi);

	ProductDTO selectOneProduct(int productNo);
}
