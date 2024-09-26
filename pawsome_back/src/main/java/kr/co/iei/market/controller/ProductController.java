package kr.co.iei.market.controller;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.market.model.dto.ProductDTO;
import kr.co.iei.market.model.dto.QnaDTO;
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
	
	@GetMapping(value="/productList/{typeCategory}/{mainCategory}/{reqPage}")
	public ResponseEntity<Map> productList (@PathVariable int typeCategory, @PathVariable String mainCategory, @PathVariable int reqPage) {
		Map map = productService.selectProductList(typeCategory, mainCategory, reqPage);
		return ResponseEntity.ok(map);
	}
	
	@GetMapping(value="/productDetail/{productNo}")
	public ResponseEntity<ProductDTO> selectOneProduct(@PathVariable int productNo){
		ProductDTO product = productService.selectOneProduct(productNo);
		return ResponseEntity.ok(product);
	}
	
	@PostMapping
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
	
	@PatchMapping
	public ResponseEntity<Boolean> updateQna(@ModelAttribute QnaDTO qna){
		int result = productService.updateQna(qna);
		return ResponseEntity.ok(result == 1);
	}
	
	@DeleteMapping(value="/qna/{qnaNo}")
	public ResponseEntity<Integer> deleteQna(@PathVariable int qnaNo){
		System.out.println(qnaNo);
		int result = productService.deleteQna(qnaNo);
		return ResponseEntity.ok(result);
	}
}
