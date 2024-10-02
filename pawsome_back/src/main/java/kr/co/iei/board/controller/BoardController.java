package kr.co.iei.board.controller;

import java.io.File;
import java.util.ArrayList;
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

import kr.co.iei.board.model.dto.BoardDTO;
import kr.co.iei.board.model.dto.BoardFileDTO;
import kr.co.iei.board.model.dto.ReplyDTO;
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
	 
	 @GetMapping(value="/boardNo/{boardNo}")
	 public ResponseEntity<BoardDTO> selectOneBoard(@PathVariable int boardNo){
		 List<ReplyDTO> replyList = new ArrayList<ReplyDTO>();
		 BoardDTO board = boardService.selectOneBoard(boardNo);
		 return ResponseEntity.ok(board);
	 }
	 
	 @DeleteMapping(value="/{boardNo}")
	 public ResponseEntity<Integer> deleteBoard(@PathVariable int boardNo){
		 List<BoardFileDTO> delFileList = boardService.deleteBoard(boardNo);
		 if(delFileList != null) {
			 String savepath = root+"/board/";
			 for(BoardFileDTO boardFile : delFileList) {
				 File delFile = new File(savepath+boardFile.getFilepath());
				 delFile.delete();
			 }
			 return ResponseEntity.ok(1);
		 }else {
			 return ResponseEntity.ok(0);
		 }
	 }
	 @PatchMapping
	 public ResponseEntity<Boolean> updateBoard(@ModelAttribute BoardDTO board, @ModelAttribute MultipartFile[] boardFile){
		 List<BoardFileDTO> boardFileList = new ArrayList<BoardFileDTO>();
		 if(boardFile != null) { 
			 String savepath = root + "/board/";
			 for(MultipartFile file : boardFile) {
				 BoardFileDTO fileDTO = new BoardFileDTO();
				 String filename = file.getOriginalFilename();
				 String filepath = fileUtil.upload(savepath, file);
				 fileDTO.setFilename(filename);
				 fileDTO.setFilepath(filepath);
				 fileDTO.setBoardNo(board.getBoardNo());
				 boardFileList.add(fileDTO); 
			}
		 }
		 List<BoardFileDTO> delFileList = boardService.updateBoard(board,boardFileList);
			if(delFileList != null) {
				String savepath = root+"/board/";
				for(BoardFileDTO deleteFile : delFileList) {
					File delFile = new File(savepath+deleteFile.getFilepath());
				}
				return ResponseEntity.ok(true);
			}else {
				return ResponseEntity.ok(false);
			}
	 }
	 @PostMapping(value="{boardNo}")
	 public ResponseEntity<Boolean> isLike(@ModelAttribute BoardDTO board){
		 int result = boardService.isLike(board);
		 return ResponseEntity.ok(true);
	 }
	 
	 @GetMapping(value="/replyList/{boardNo}/{reqPage}")
	 public ResponseEntity<Map> replyList(@PathVariable int reqPage, @PathVariable int boardNo){
		 Map map = boardService.selectReplyList(reqPage, boardNo);
			return ResponseEntity.ok(map);
	 }
	 
	 @PostMapping(value="/reply")
	 public ResponseEntity<Boolean> reply(@ModelAttribute ReplyDTO reply){
		 int result = boardService.insertReply(reply);
		 return ResponseEntity.ok(result == 1);
	 }
	 
	 @DeleteMapping(value="/reply/{replyNo}")
	 public ResponseEntity<Integer> deleteReply(@PathVariable int replyNo){
		 List<ReplyDTO> reply = boardService.deleteReply(replyNo);
		 System.out.println(reply);
		 if(reply != null) {
			 return ResponseEntity.ok(1);
		 }else {
			 return ResponseEntity.ok(0);
		 }
	 }
	 @PostMapping(value="/reply/{replyNo}")
	 public ResponseEntity<Boolean> replyLike(@ModelAttribute ReplyDTO reply){
		 int result = boardService.replyLike(reply);
		 System.out.println(result);
		 return ResponseEntity.ok(true);
	 }
	 
	 
}
