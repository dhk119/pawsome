package kr.co.iei.market.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.co.iei.market.model.dto.ProductDTO;
import kr.co.iei.market.model.dto.QnaAnswerDTO;
import kr.co.iei.market.model.dto.QnaDTO;
import kr.co.iei.market.model.dto.ReviewDTO;
import kr.co.iei.market.model.dto.ReviewFileDTO;
import kr.co.iei.market.model.service.ProductService;
import kr.co.iei.util.FileUtils;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/product")
public class ProductController {
	@Autowired
	private ProductService productService;
	
	@Autowired
	private FileUtils fileUtil;
	@Value("${file.root}")
	public String root;
	
	@GetMapping(value="/productList/{typeCategory}/{mainCategory}/{reqPage}/{filterType}/{loginEmail}")
	public ResponseEntity<Map> productList (@PathVariable int typeCategory, @PathVariable String mainCategory, @PathVariable int reqPage, @PathVariable int filterType, @PathVariable String loginEmail) {
		Map map = productService.selectProductList(typeCategory, mainCategory, reqPage, filterType, loginEmail);
		return ResponseEntity.ok(map);
	}
	
	@GetMapping(value="/productDetail/{productNo}")
	public ResponseEntity<ProductDTO> selectOneProduct(@PathVariable int productNo){
		ProductDTO product = productService.selectOneProduct(productNo);
		return ResponseEntity.ok(product);
	}
	
	@PostMapping(value="/qna")
	public ResponseEntity<Boolean> insertQna(@ModelAttribute QnaDTO qna){
		int result = productService.insertQna(qna);
		return ResponseEntity.ok(result == 1);
	}
	
	@GetMapping(value="/qnaList/{productNo}/{reqPage}")
	public ResponseEntity<Map> qnaList (@PathVariable int productNo, @PathVariable int reqPage) {
		Map map = productService.selectQnaList(productNo, reqPage);
		return ResponseEntity.ok(map);
	}
	
	@GetMapping(value="/qna/{qnaNo}")
	public ResponseEntity<QnaDTO> selectQna(@PathVariable int qnaNo){
		QnaDTO qna = productService.selectQna(qnaNo);
		return ResponseEntity.ok(qna);
	}
	
	@PatchMapping(value="/qna")
	public ResponseEntity<Boolean> updateQna(@ModelAttribute QnaDTO qna){
		int result = productService.updateQna(qna);
		return ResponseEntity.ok(result == 1);
	}
	
	@DeleteMapping(value="/qna/{qnaNo}")
	public ResponseEntity<Integer> deleteQna(@PathVariable int qnaNo){
		int result = productService.deleteQna(qnaNo);
		return ResponseEntity.ok(result);
	}
	
	@PostMapping(value="/qnaAnswer")
	public  ResponseEntity<Boolean> insertQnaAnswer(@ModelAttribute QnaAnswerDTO qnaAnswer){
		int result = productService.insertQnaAnswer(qnaAnswer);
		return ResponseEntity.ok(result == 1);
	}
	
	@PatchMapping(value="/qnaAnswer")
	public ResponseEntity<Boolean> updateQnaQnaAnswer(@ModelAttribute QnaAnswerDTO qnaAnswer){
		int result = productService.updateQnaAnswer(qnaAnswer);
		return ResponseEntity.ok(result == 1);
	}
	
	@DeleteMapping(value="/qnaAnswer/{qnaNo}")
	public ResponseEntity<Integer> deleteQnaAnswer(@PathVariable int qnaNo){
		int result = productService.deleteQnaAnswer(qnaNo);
		return ResponseEntity.ok(result);
	}
	
	@PostMapping(value="/changeLike/{loginEmail}")
	public ResponseEntity<Integer> changeLike(@PathVariable String loginEmail, @RequestBody ProductDTO product){
		System.out.println(product);
		int result = productService.changeLike(loginEmail,product);
		return ResponseEntity.ok(result);
	}
	
	@PostMapping(value="/writeReview")
	//받아올 때 multipartFile을 ModelAttribute 로 받아오니까 임시저장소에 저장이 안 되엉서 받아와지지가 않음... requestparam으로 하나씩 다 받아옴
	public ResponseEntity<Boolean> insertReview(@RequestParam(value="productNo") int productNo,
												@RequestParam(value="reviewStar") int reviewStar,
												@RequestParam(value="reviewContent") String reviewContent,
												@RequestParam(value="reviewWriter") String reviewWriter,												
												@RequestParam(value="fileList", required=false) MultipartFile[] fileList){
		//받아온 애들 객체로 묶어줌
		ReviewDTO review = new ReviewDTO();
		review.setProductNo(productNo);
		review.setReviewStar(reviewStar);
		review.setReviewContent(reviewContent);
		review.setReviewWriter(reviewWriter);
		
		List<ReviewFileDTO> reviewFileList = new ArrayList<ReviewFileDTO>();
		if(fileList != null) {
			String savepath = root + "/review/sum/";
			for(MultipartFile reviewfIle : fileList) {
				ReviewFileDTO file = new ReviewFileDTO();
				String reviewFileOrg = reviewfIle.getOriginalFilename();
				String reviewFileStorage = fileUtil.upload(savepath, reviewfIle);
				file.setReviewFileOrg(reviewFileOrg);
				file.setReviewFileStorage(reviewFileStorage); 
				reviewFileList.add(file); 
			}
		}
		System.out.println("reviewFileList : "+reviewFileList);
		int result = productService.insertReview(review, reviewFileList);
		return ResponseEntity.ok(result == 1+reviewFileList.size());
	}
	
	@GetMapping(value="/selectReview/{reviewNo}")
	public ResponseEntity<ReviewDTO> selectOneReview (@PathVariable int reviewNo){
		ReviewDTO review = productService.selectOneReview(reviewNo);
		return ResponseEntity.ok(review);
	}
	
	@PatchMapping(value="/updateReview")
	public ResponseEntity<Boolean> updateReview (@RequestParam(value="reviewNo") int reviewNo,
												@RequestParam(value="reviewStar") int reviewStar,
												@RequestParam(value="reviewContent") String reviewContent,											
												@RequestParam(value="fileList", required=false) MultipartFile[] fileList,
												@RequestParam(value="delFileNo") int[] delFileNo){
		
		System.out.println(fileList);
		return null;
	}
	
}
