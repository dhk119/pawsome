package kr.co.iei.market.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import kr.co.iei.market.model.dao.MarketDao;
import kr.co.iei.market.model.dto.CartDTO;

@Service
public class CartService {
	@Autowired
	private MarketDao marketDao;

	public int searchCart(int productNo, String memberEmail) {
		int result = marketDao.searchCart(productNo, memberEmail);
		return result;
	}

	@Transactional
	public int insertCart(CartDTO cart) {
		int result = marketDao.insertCart(cart);
		return result;
	}

	public List selectCartList(String memberEmail) {
		List list = marketDao.selectCartList(memberEmail);
		System.out.println(list);
		return list;
	}

	@Transactional
	public int updateProductCount(int productNo, int productCartCount, String memberEmail) {
		int result = marketDao.updateProductCount(productNo, productCartCount, memberEmail);
		return result;
	}

	@Transactional
	public int deleteCart(int cartNo) {
		int result = marketDao.deleteCart(cartNo);
		return result;
	}

}
