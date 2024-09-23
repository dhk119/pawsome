package kr.co.iei.market.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.util.PageInfo;

@Mapper
public interface MarketDao {

	int totalCount();

	List selectProductList(PageInfo pi);

}
