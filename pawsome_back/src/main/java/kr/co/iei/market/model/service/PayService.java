package kr.co.iei.market.model.service;

import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.market.model.dao.MarketDao;
import kr.co.iei.market.model.dto.CartDTO;
import kr.co.iei.market.model.dto.PayDTO;
import kr.co.iei.member.model.dto.MemberDTO;

@Service
public class PayService {
	@Autowired
	private MarketDao marketDao;

	public List selectPayList(String checkCartNo) {
		StringTokenizer sT = new StringTokenizer(checkCartNo, "-");
		List payList = new ArrayList();
		while (sT.hasMoreElements()) {
			int cartNo = Integer.parseInt(sT.nextToken());
			CartDTO cart = new CartDTO();
			cart = marketDao.selectPayList(cartNo);
			payList.add(cart);
		}
		return payList;
	}

	public MemberDTO selectPayer(String memberEmail) {
		MemberDTO payer = marketDao.selectPayer(memberEmail);
		return payer;
	}

	@Transactional
	public boolean insertPayment(PayDTO pay) {
		boolean result = false;
		int payResult = marketDao.insertPayment(pay);
		System.out.println("payResult : "+payResult);
		if(payResult > 0) {
			//결제 성공
			StringTokenizer sT = new StringTokenizer(pay.getPayCartNo(), "-");
			while (sT.hasMoreElements()) {
				int payCartNo = Integer.parseInt(sT.nextToken());
				CartDTO cart = marketDao.selectPayCartList(payCartNo);
				int buyResult = marketDao.insertBuyList(pay, cart);
				if(buyResult == 1) {
					result = true;
					int delResult = marketDao.payDeleteCart(payCartNo);
					if(delResult < 1) {
						result = false;
						break;
					}
				}else {
					break;
				}
		}
	}
	return result;
	}
	
}
