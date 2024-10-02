package kr.co.iei.market.model.service;

import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.market.model.dao.MarketDao;
import kr.co.iei.market.model.dto.CartDTO;
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
	
}
