package kr.co.iei.market.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias("product")
public class ProductDTO {
	private int productNo;				//상품 번호
	private String productName;			//상품 이름
	private int typeCategory;			//0-전체, 1-강아지, 2-고양이
	private String mainCategory;		//전체, 사료, 간식, 영양제, 식기용품, 위생용품, 장난감, 패션, 하우스	
	private int productPrice;			//상품 가격
	private String productThumb;		//상품 썸네일
	private String productDetail;		//상품 상세정보
	private String productRegDate;		//상품 등록일
	private String productShow;			//Y/N
	private String memberEmail;			//등록자(관리자로 고정)
}
