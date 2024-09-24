package kr.co.iei.board.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.co.iei.board.model.dto.BoardDTO;
import kr.co.iei.board.model.dto.BoardFileDTO;
import kr.co.iei.board.model.service.BoardService;
import kr.co.iei.util.FileUtils;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/board")
public class BoardController {
	@Autowired
	private BoardService boardService;
	
	@Autowired
	private FileUtils fileUtil;
	
	@Value("${file.root}")
	public String root;
	
	@GetMapping("/list/{tag}/{reqPage}")
	public ResponseEntity<Map> list(@PathVariable int reqPage, @PathVariable int tag){
		Map map = boardService.selectBoardList(reqPage, tag);
		System.out.println(map);
		return ResponseEntity.ok(map);
	}
	
	@PostMapping(value = "/editorImage")
	public ResponseEntity<String> editorImage(@ModelAttribute MultipartFile image){
		String savepath=root+"/editor/";
		String filepath=fileUtil.upload(savepath, image);
		return ResponseEntity.ok("/editor/"+filepath);
	}
	
	 @PostMapping 
	 public ResponseEntity<Boolean> insertBoard(@ModelAttribute BoardDTO board, @ModelAttribute MultipartFile[] boardFile){
		
		 List<BoardFileDTO> boardFileList = new ArrayList<BoardFileDTO>();
		 if(boardFile != null) { 
			 String savepath = root + "/board/";
			 for(MultipartFile file : boardFile) {
				 BoardFileDTO fileDTO = new BoardFileDTO();
				 String filename = file.getOriginalFilename();
				 String filepath = fileUtil.upload(savepath, file);
				 fileDTO.setFilename(filename);
				 fileDTO.setFilepath(filepath); 
				 boardFileList.add(fileDTO); 
			}
		} 
		 int result = boardService.insertBoard(board, boardFileList); 
		 return ResponseEntity.ok(result == 1+boardFileList.size());
		 }
	 
}
