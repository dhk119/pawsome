package kr.co.iei.market.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.market.model.dao.MarketDao;
import kr.co.iei.market.model.dto.CartDTO;
import kr.co.iei.market.model.dto.PayDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.util.PageInfo;
import kr.co.iei.util.PageUtil;

@Service
public class PayService {
	@Autowired
	private MarketDao marketDao;
	@Autowired
	private PageUtil pageUtil;

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

	public Map selectBuyList(String loginEmail, int reqPage) {
		int numPerPage = 10;
		int pageNaviSize = 5;
		int totalCount = marketDao.payTotalCount(loginEmail);
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		int start = pi.getStart();
		int end = pi.getEnd();
		List list = marketDao.selectBuyList(loginEmail, start, end);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("pi", pi);
		map.put("totalCount", totalCount);
		return map;
	}
	
}
