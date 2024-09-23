package kr.co.iei.market.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.market.model.dto.ProductDTO;
import kr.co.iei.util.PageInfo;

@Mapper
public interface MarketDao {

	int insertProduct(ProductDTO product);
	
	int totalCountAll();

	int totalCount();

	List selectProductList(PageInfo pi);

	List selectProductAllList(PageInfo pi);

	int updateShow(ProductDTO product);
}
