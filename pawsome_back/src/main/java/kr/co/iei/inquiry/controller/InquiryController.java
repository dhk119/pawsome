package kr.co.iei.inquiry.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.co.iei.inquiry.model.dto.Inquiry;
import kr.co.iei.inquiry.model.service.InquiryService;
import kr.co.iei.util.FileUtils;

@CrossOrigin("*")
@RestController
@RequestMapping("/inquiry")
public class InquiryController {
	@Autowired
	private InquiryService inquiryService;
	@Autowired
	private FileUtils fileUtil;
	@Value("${file.root}")
	public String root;
	@GetMapping("/list/{reqPage}")
	public ResponseEntity<Map> list(@PathVariable int reqPage){
		Map map=inquiryService.selectInquiryList(reqPage);
		return ResponseEntity.ok(map);
	}
	@PostMapping
	public ResponseEntity<Integer> insertInquiry(@ModelAttribute Inquiry inquiry){
		System.out.println(inquiry);
		int result=inquiryService.insertInquiry(inquiry);
		return ResponseEntity.ok(result);
	}
	@PostMapping(value = "/editorImage")
	public ResponseEntity<String> editorImage(@ModelAttribute MultipartFile image){
		String savepath=root+"/editor/";
		String filepath=fileUtil.upload(savepath, image);
		return ResponseEntity.ok("/editor/"+filepath);
	}
	@GetMapping("/inquiryNo/{inquiryNo}")
	public ResponseEntity<Inquiry> selectOneInquiry(@PathVariable int inquiryNo){
		Inquiry inquiry=inquiryService.selectOneInquiry(inquiryNo);
		return ResponseEntity.ok(inquiry);
	}
	@DeleteMapping(value = "/{inquiryNo}")
	public ResponseEntity<Integer> deleteinquiry(@PathVariable int inquiryNo){
		int result=inquiryService.deleteInquiry(inquiryNo);
			return ResponseEntity.ok(result); 
	}
}
