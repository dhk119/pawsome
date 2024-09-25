package kr.co.iei.admin.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.co.iei.admin.model.service.AdminService;
import kr.co.iei.market.model.dto.ProductDTO;
import kr.co.iei.util.FileUtils;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/admin")
public class AdminController {
	@Autowired
	private AdminService adminService;
	@Autowired
	private FileUtils fileUtil;
	@Value("${file.root}")
	public String root;
	@PostMapping
	public ResponseEntity<Integer> registProduct(@ModelAttribute ProductDTO product, @ModelAttribute MultipartFile thumb){
		String savepath=root+"/product/thumb/";
		String filepath=fileUtil.upload(savepath, thumb);
		product.setProductThumb(filepath);
		int result=adminService.insertProduct(product);
		return ResponseEntity.ok(result);
	}
	@GetMapping(value = "/productList/{reqPage}")
	public ResponseEntity<Map> productList(@PathVariable int reqPage){
		Map map=adminService.selectProductList(reqPage);
		return ResponseEntity.ok(map);
	}
	@PatchMapping(value = "/product")
	public ResponseEntity<Integer> showProduct(@RequestBody ProductDTO product){
		int result=adminService.updateShow(product);
		return ResponseEntity.ok(result);
	}
	@GetMapping(value = "/productNo/{productNo}")
	public ResponseEntity<ProductDTO> selectOneProduct(@PathVariable int productNo){
		ProductDTO product=adminService.selectOneProduct(productNo);
		return ResponseEntity.ok(product);
	}
}
