package kr.co.iei.util;

import java.util.Calendar;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import kr.co.iei.member.model.dto.LoginMemberDTO;

@Component
public class JwtUtils {
	@Value("${jwt.secret-key}")
	public String secretKey;
	@Value("${jwt.expire-hour}")
	public int expireHour;
	@Value("${jwt.expire-hour-refresh}")
	public int expireHourRefresh;
	
	//1시간짜리 토큰생성
	public String createAccessToken(String memberEmail, int memberLevel) {
		//1. 작성해둔 키값을 이용해서 암호화코드 생성
		SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
		//2. 토큰 생성시간 및 만료시간 설정
		Calendar c = Calendar.getInstance();
		Date startTime = c.getTime();
		c.add(Calendar.HOUR, expireHour);
		Date expireTime = c.getTime();
		
		String token = Jwts.builder()				//JWT생성 시작
							.issuedAt(startTime)	//토큰발행 시작시간
							.expiration(expireTime) //토큰만료 시간
							.signWith(key) 			//암호화 서명
							.claim("memberEmail", memberEmail)
							.claim("memberLevel", memberLevel)
							.compact();
		return token;
	}
	
	//8760시간(1년)짜리 accessToken
	public String createRefreshToken(String memberEmail, int memberLevel) {
		//1. 작성해둔 키값을 이용해서 암호화코드 생성
		SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
		//2. 토큰 생성시간 및 만료시간 설정
		Calendar c = Calendar.getInstance();
		Date startTime = c.getTime();
		c.add(Calendar.HOUR, expireHourRefresh);
		Date expireTime = c.getTime();
				
		String token = Jwts.builder()				//JWT생성 시작
							.issuedAt(startTime)	//토큰발행 시작시간
							.expiration(expireTime) //토큰만료 시간
							.signWith(key) 			//암호화 서명
							.claim("memberEmail", memberEmail)
							.claim("memberLevel", memberLevel)
							.compact();
		return token;
	}
	
	//토큰을 받아서 확인
	//토큰을 받아서 확인
	public LoginMemberDTO checkToken(String token) {
		//1. 토큰 해석을 위한 암호화 키 세팅 
		SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
		Claims claims = (Claims) Jwts.parser()				//토큰해석 시작
										.verifyWith(key)	//암호화키
										.build()	
										.parse(token)
										.getPayload();		
		String memberEmail = (String)claims.get("memberEmail");
		int memberLevel = (int)claims.get("memberLevel");
		LoginMemberDTO loginMember = new LoginMemberDTO();
		loginMember.setMemberEmail(memberEmail);
		loginMember.setMemberLevel(memberLevel);
		return loginMember;
	}
}
