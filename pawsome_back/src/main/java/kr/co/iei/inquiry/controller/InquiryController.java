package kr.co.iei.inquiry.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.inquiry.model.service.InquiryService;

@CrossOrigin("*")
@RestController
public class InquiryController {
	@Autowired
	private InquiryService inquiryService;
}
