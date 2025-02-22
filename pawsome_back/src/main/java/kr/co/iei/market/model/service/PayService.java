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
		int numPerPage = 6;
		int pageNaviSize = 5;
		int totalCount = marketDao.payTotalCount(loginEmail);
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		int start = pi.getStart();
		int end = pi.getEnd();
		List list = marketDao.selectAllBuyList(loginEmail, start, end);
		System.out.println("list : "+list);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("pi", pi);
		map.put("totalCount", totalCount);
		return map;
	}

	//환불
	@Transactional
	public int refundService(RefundRequestDTO refund) {
		int result = -1;
		//토큰 받는 메서드
		String token = getToken();
		//환불받는 메서드
		String code = refundRequest(token, refund);
		System.out.println("code 2 : "+code);
		//환불성공시
		if(code.equals("0")) {
			// 부분취소 했으면
			if(refund.getProductNo() != 0) {
				//결제상태 변경
				result = marketDao.updateBuyList(refund);
				if(result >0) {
					//결제 총금액 변경
					result = marketDao.updatePayList(refund);
					PayDTO resultPay = marketDao.selectOnePay(refund.getPayUid());
					if(resultPay.getTotalPrice() < 30000) {
						result = marketDao.updatePayPrice(refund);
					}
				}
			}else {
				//해당 uid 구매내역 갯수 받아오기
				int countbuyNo = marketDao.countbuyList(refund.getPayUid());
				//해당 uid 결제상태 전체 변경
				result = marketDao.updateBuyState(refund.getPayUid());
				if(countbuyNo == result) {
					//해당 uid 결제상태가 전부 변경됐으면 금액 바꾸고 성공
					result = marketDao.updatePayList(refund);
				}else {
					result = 0;
				}
			}
		}
		return result;
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
		
		int amount = pay.getTotalPrice(); //결제했던 금액
		int cancelProductNo = refund.getProductNo(); //결제취소할 상품
		int cancelAmount = refund.getCancelRequestAmount(); //결제취소할 금액
		
		//받아온 productNo가 0이 아니면 부분취소, 0이면 전체취소
		if(cancelProductNo != 0) {
			//부분 취소
			//uid로 해당 결제번호에 결제완료된 항목이 몇 개인지 확인
			int buyCount = marketDao.selectBuyCount(refund.getPayUid());
			System.out.println(buyCount);
			if(buyCount > 1) {
				int totalAmount = pay.getTotalPrice() - refund.getCancelRequestAmount();
				if(totalAmount < 30000) {
					refund.setCancelRequestAmount(cancelAmount);
					cancelAmount -= 3000; //배송비빼고 금액을 결제 총금액에서 빼주기
				}
				System.out.println("부분취소 환불금액(부분) : "+cancelAmount);			
			}else {
				cancelAmount += 3000; //배송비까지 환불
				refund.setCancelRequestAmount(cancelAmount);
				System.out.println("부분취소 환불금액(전체) : "+cancelAmount);						
			}
			
			/*환불 가능 금액 계산*/
			int cancelableAmount = amount - cancelAmount;
			if(cancelableAmount < 0) {
				System.out.println("결제취소가능금액 넘김");
				return "-1"; //이미 전액 환불
			}			
		}
		//아니면 전체취소
		
		//포트원에 취소요청보내기
		String url = "https://api.iamport.kr/payments/cancel";
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.setBearerAuth(token);
		
		Map<String, Object> map = new HashMap<>();
		map.put("merchant_uid", pay.getPayUid());
		map.put("amount", cancelAmount);
		
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
