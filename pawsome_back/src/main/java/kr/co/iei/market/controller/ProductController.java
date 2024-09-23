package kr.co.iei.market.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.market.model.service.ProductService;
import kr.co.iei.util.FileUtils;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/market")
public class ProductController {
	@Autowired
	private ProductService productService;
	
	@Autowired
	private FileUtils fileUtil;
	@Value("${file.root}")
	public String root;
	
	@GetMapping(value="/productList/{reqPage}")
	public ResponseEntity<Map> productList (@PathVariable int reqPage) {
		Map map = productService.selectProductList(reqPage);
		return ResponseEntity.ok(map);
	}
}
