package kr.co.iei.market.model.service;

import java.util.List;
import java.util.StringTokenizer;

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
		return list;
	}

	@Transactional
	public int updateProductCount(int productNo, int productCartCount, String memberEmail) {
		int result = marketDao.updateProductCount(productNo, productCartCount, memberEmail);
		return result;
	}

	@Transactional
	public boolean deleteCartList(String str) {
		StringTokenizer sT = new StringTokenizer(str, "-");
		boolean result=true;
		while (sT.hasMoreElements()) {
			int cartNo = Integer.parseInt(sT.nextToken());
			int intResult = marketDao.deleteCart(cartNo);
			if(intResult < 1) {
				result=false;
				break;
			}
		}
		return result;
	}

	public int searchMaxCartNo(String loginEmail) {
		int result = marketDao.searchMaxCartNo(loginEmail);
		return result;
	}

}
