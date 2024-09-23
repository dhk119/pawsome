package kr.co.iei.market.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.market.model.dto.ProductDTO;

@Mapper
public interface MarketDao {

	int insertProduct(ProductDTO product);

}
