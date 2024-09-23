package kr.co.iei.admin.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.market.model.dao.MarketDao;
import kr.co.iei.market.model.dto.ProductDTO;

@Service
public class AdminService {
	@Autowired
	private MarketDao marketDao;
	@Transactional
	public int insertProduct(ProductDTO product) {
		int result=marketDao.insertProduct(product);
		return result;
	}
	
}
