package kr.co.iei.market.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.market.model.service.MarketService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/market")
public class MarketController {
	@Autowired
	private MarketService marketService;
}
