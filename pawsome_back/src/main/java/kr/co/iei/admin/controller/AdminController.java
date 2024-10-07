package kr.co.iei.admin.controller;

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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.co.iei.admin.model.service.AdminService;
import kr.co.iei.market.model.dto.ProductDTO;
import kr.co.iei.market.model.dto.QnaAnswerDTO;
import kr.co.iei.market.model.dto.QnaDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.util.ChartData;
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
	@PatchMapping
	public ResponseEntity<Integer> updateProduct(@ModelAttribute ProductDTO product, @ModelAttribute MultipartFile thumb){
		if(thumb!=null) {
			String savepath=root+"/product/thumb/";
			String filepath=fileUtil.upload(savepath, thumb);
			product.setProductThumb(filepath);
		}
		int result=adminService.updateProduct(product);
		return ResponseEntity.ok(result);
	}
	@DeleteMapping(value = "/productNo/{productNo}")
	public ResponseEntity<Integer> deleteProduct(@PathVariable int productNo){
		int result=adminService.deleteProduct(productNo);
		return ResponseEntity.ok(result);
	}
	@GetMapping(value = "/memberList/{reqPage}")
	public ResponseEntity<Map> memberList(@PathVariable int reqPage){
		Map map=adminService.selectMemberList(reqPage);
		return ResponseEntity.ok(map);
	}
	@PatchMapping(value = "/member")
	public ResponseEntity<Integer> updateMemberLevel(@RequestBody MemberDTO member){
		int result=adminService.updateMemberLevel(member);
		return ResponseEntity.ok(result);
	}
	@GetMapping(value = "/petList/{reqPage}")
	public ResponseEntity<Map> petList(@PathVariable int reqPage){
		Map map=adminService.selectPetList(reqPage);
		return ResponseEntity.ok(map);
	}
	@GetMapping(value = "/qnaList/{reqPage}/{answer}")
	public ResponseEntity<Map> qnaList(@PathVariable int reqPage, @PathVariable boolean answer){
		Map map=adminService.selectQnaList(reqPage,answer);
		return ResponseEntity.ok(map);
	}
	@GetMapping(value = "/qna/{qnaNo}")
	public ResponseEntity<QnaDTO> selectOneQna(@PathVariable int qnaNo){
		QnaDTO qna=adminService.selectOneQna(qnaNo);
		return ResponseEntity.ok(qna);
	}
	@PostMapping(value = "/qna")
	public ResponseEntity<Integer> insertQnaAnswer(@ModelAttribute QnaAnswerDTO qnaAns){
		int result=adminService.insertQnaAnswer(qnaAns);
		return ResponseEntity.ok(result);
	}
	@PatchMapping(value = "/qna")
	public ResponseEntity<Integer> updateQnaAnswer(@ModelAttribute QnaAnswerDTO qnaAns){
		int result=adminService.updateQnaAnswer(qnaAns);
		return ResponseEntity.ok(result);
	}
	@DeleteMapping(value = "qna/{qnaNo}")
	public ResponseEntity<Integer> deleteQnaAnswer(@PathVariable int qnaNo){
		System.out.println(qnaNo);
		int result=adminService.deleteQnaAnswer(qnaNo);
		return ResponseEntity.ok(result); 
	}
	@GetMapping(value = "/searchProduct/{reqPage}/{type}/{keyword}/{option}")
	public ResponseEntity<Map> searchProduct(@PathVariable int reqPage, @PathVariable String type, @PathVariable String keyword, @PathVariable String option){
		Map map=adminService.searchProductList(reqPage, type, keyword, option);
		return ResponseEntity.ok(map);
	}
	@GetMapping(value = "/searchProduct/{reqPage}/{option}")
	public ResponseEntity<Map> searchProduct(@PathVariable int reqPage, @PathVariable String option){
		Map map=adminService.searchProductList(reqPage, option);
		return ResponseEntity.ok(map);
	}
	@GetMapping(value = "/searchMember/{reqPage}/{type}/{keyword}/{option}")
	public ResponseEntity<Map> searchMember(@PathVariable int reqPage, @PathVariable String type, @PathVariable String keyword, @PathVariable String option){
		Map map=adminService.searchMemberList(reqPage, type, keyword, option);
		return ResponseEntity.ok(map);
	}
	@GetMapping(value = "/searchMember/{reqPage}/{option}")
	public ResponseEntity<Map> searchMember(@PathVariable int reqPage, @PathVariable String option){
		Map map=adminService.searchMemberList(reqPage, option);
		return ResponseEntity.ok(map);
	}
	@GetMapping(value = "/searchPet/{reqPage}/{type}/{keyword}/{option}")
	public ResponseEntity<Map> searchPet(@PathVariable int reqPage, @PathVariable String type, @PathVariable String keyword, @PathVariable int option){
		Map map=adminService.searchPetList(reqPage, type, keyword, option);
		return ResponseEntity.ok(map);
	}
	@GetMapping(value = "/searchPet/{reqPage}/{option}")
	public ResponseEntity<Map> searchPet(@PathVariable int reqPage, @PathVariable int option){
		Map map=adminService.searchPetList(reqPage, option);
		return ResponseEntity.ok(map);
	}
	@GetMapping(value = "/searchQna/{reqPage}/{answer}/{type}/{keyword}/{option}")
	public ResponseEntity<Map> searchQna(@PathVariable int reqPage,@PathVariable boolean answer, @PathVariable String type, @PathVariable String keyword, @PathVariable int option){
		Map map=adminService.searchQnaList(reqPage, answer, type, keyword, option);
		return ResponseEntity.ok(map);
	}
	@GetMapping(value = "/searchQna/{reqPage}/{answer}/{option}")
	public ResponseEntity<Map> searchQna(@PathVariable int reqPage,@PathVariable boolean answer, @PathVariable int option){
		Map map=adminService.searchQnaList(reqPage, answer, option);
		return ResponseEntity.ok(map);
	}
	@GetMapping(value = "/petChartClass")
	public ResponseEntity<List<ChartData>> petChartClass(){
		List<ChartData> list=adminService.petChartClass();
		return ResponseEntity.ok(list);
	}
	@GetMapping(value = "/petChartBreedDog")
	public ResponseEntity<List<ChartData>> petChartBreedDog(){
		List<ChartData> list=adminService.petChartBreedDog();
		return ResponseEntity.ok(list);
	}
	@GetMapping(value = "/petChartBreedCat")
	public ResponseEntity<List<ChartData>> petChartBreedCat(){
		List<ChartData> list=adminService.petChartBreedCat();
		return ResponseEntity.ok(list);
	}
	@GetMapping(value = "/petChartGender")
	public ResponseEntity<List<ChartData>> petChartGender(){
		List<ChartData> list=adminService.petChartGender();
		return ResponseEntity.ok(list);
	}
	@GetMapping(value = "/productChart/{typeCategory}/{buyState}")
	public ResponseEntity<List<ChartData>> productChart(@PathVariable int typeCategory, @PathVariable int buyState){
		List<ChartData> list=adminService.productChart(typeCategory, buyState);
		return ResponseEntity.ok(list);
	}
	@GetMapping(value = "/productIncomeChart/{typeCategory}/{buyState}")
	public ResponseEntity<List<ChartData>> productIncomeChart(@PathVariable int typeCategory, @PathVariable int buyState){
		List<ChartData> list=adminService.productIncomeChart(typeCategory, buyState);
		return ResponseEntity.ok(list);
	}
}
