package kr.co.iei.board.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.board.model.service.BoardService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/board")
public class BoardController {
	@Autowired
	private BoardService boardService;
	
	@GetMapping("/list/{tag}/{reqPage}")
	public ResponseEntity<Map> list(@PathVariable int reqPage, @PathVariable int tag){
		Map map = boardService.selectBoardTag(reqPage, tag);
		return ResponseEntity.ok(map);
	}
}
