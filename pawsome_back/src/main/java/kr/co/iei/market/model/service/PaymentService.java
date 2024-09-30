package kr.co.iei.market.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.market.model.dao.MarketDao;
import kr.co.iei.market.model.dto.CartDTO;

@Service
public class PaymentService {
	@Autowired
	private MarketDao marketDao;

	@Transactional
	public int insertCart(CartDTO cart) {
		int result = marketDao.insertCart(cart);
		return result;
	}
}
