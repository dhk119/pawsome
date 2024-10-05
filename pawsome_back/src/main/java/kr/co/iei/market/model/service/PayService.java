package kr.co.iei.market.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import kr.co.iei.market.model.dao.MarketDao;
import kr.co.iei.market.model.dto.BuyListDTO;
import kr.co.iei.market.model.dto.CartDTO;
import kr.co.iei.market.model.dto.PayDTO;
import kr.co.iei.market.model.dto.RefundRequestDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.util.PageInfo;
import kr.co.iei.util.PageUtil;

@Service
public class PayService {
	@Autowired
	private MarketDao marketDao;
	@Autowired
	private PageUtil pageUtil;
	
	private final String restApi = "7270287125167647";
	private final String restApiSecret = "XNExBvNxthTj2ehbMmrq9WneGBK6N20LI8nwyU7cbnncKPyd80RCnhoZUeBSxz4sRGt4Twvv8VpvIjWW";
	@Autowired
    private RestTemplate restTemplate;

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

	public Map selectAllBuyList(String loginEmail, int reqPage) {
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

	public int refundService(RefundRequestDTO refund) {
		//토큰 받는 메서드
		String token = getToken();
		//환불받는 메서드
		String code = refundRequest(token, refund);
		System.out.println("code 2 : "+code);
		if(code.equals("0")) {
//			성공한거
			
		}
		else {
			
		}
		return 0;
	}
	
	//결제취소위한 토큰 만듦
	public String getToken() {
		String clientId = restApi;
        String clientSecret = restApiSecret;
		String url = "https://api.iamport.kr/users/getToken";
		
		String tokenRequest = "imp_key="+clientId+"&imp_secret="+clientSecret;
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
		
		HttpEntity<String> entity = new HttpEntity<>(tokenRequest,headers);
		ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);
		
		String responseBody = response.getBody();
		System.out.println("responseBody : "+responseBody);
		ObjectMapper om = new ObjectMapper();
		String accessToken = "";
		//객체의 객체의 데이터 꺼내기 위함
		try {
            JsonNode jsonNode = om.readTree(responseBody);
            JsonNode responseObject = jsonNode.get("response");
            accessToken = responseObject.get("access_token").asText();
            System.out.println("파싱 토큰임 : " + accessToken);
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        // String accessToken = responseBody.substring(responseBody.indexOf("access_token\":\"") + 15, responseBody.indexOf("\",\"now"));
        // accessToken = accessToken.replaceAll("\"", "");
        return accessToken;
	}
	
	public String refundRequest(String token, RefundRequestDTO refund) {
		System.out.println(refund);
		//uid로 해당 결제정보 조회
		PayDTO pay = marketDao.selectOnePay(refund.getPayUid());
		System.out.println(pay);
		
		String uid = pay.getPayUid(); //주문번호
		int amount = pay.getTotalPrice(); //결제했던 금액
		int cancelAmount = refund.getCancelRequestAmount(); //결제취소할 금액
		int cancelProductNo = refund.getProductNo(); //결제취소할 상품
		/*
		//환불 가능 금액 계산
		int cancelableAmount = amount - cancelAmount;
		if(cancelableAmount <=0) {
			return "-1"; //이미 전액 환불
		}
		*/

		//포트원에 취소요청보내기
		String url = "https://api.iamport.kr/payments/cancel";
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.setBearerAuth(token);
		
		Map<String, Object> map = new HashMap<>();
		map.put("merchant_uid", pay.getPayUid());
//		map.put("amount", refund.getCancelRequestAmount());
		
		HttpEntity<Map<String, Object>> entity = new HttpEntity<>(map, headers);
		ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);
		System.out.println("response : "+response);
		ObjectMapper om = new ObjectMapper();
		String code = "-1";
		try {
			JsonNode json = om.readTree(response.getBody());
			code = json.get("code").asText();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("code(200, code:0 => 삭제완료) : "+code);
		return code;
	}
	
}
