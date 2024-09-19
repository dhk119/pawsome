package kr.co.iei.inquiry.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.inquiry.model.service.InquiryService;

@CrossOrigin("*")
@RestController
@RequestMapping("/inquiry")
public class InquiryController {
	@Autowired
	private InquiryService inquiryService;
	@GetMapping("/list/{reqPage}")
	public ResponseEntity<Map> list(@PathVariable int reqPage){
		Map map=inquiryService.selectInquiryList(reqPage);
		return ResponseEntity.ok(map);
	}
}
