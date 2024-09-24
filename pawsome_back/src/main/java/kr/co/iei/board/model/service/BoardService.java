package kr.co.iei.board.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.board.model.dao.BoardDao;
import kr.co.iei.board.model.dto.BoardDTO;
import kr.co.iei.board.model.dto.BoardFileDTO;
import kr.co.iei.util.PageInfo;
import kr.co.iei.util.PageUtil;

@Service
public class BoardService {
	@Autowired
	private BoardDao boardDao;
	@Autowired
	private PageUtil pageUtil;

	public Map selectBoardList(int reqPage, int tag) {
		int numPerPage = 10;
		int pageNaviSize = 5;
		int totalCount = boardDao.totalCount(tag);
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		Map<String, Object> m = new HashMap<String, Object>();
		m.put("start", pi.getStart());
		m.put("end", pi.getEnd());
		m.put("tag", tag);
		List list = boardDao.selectBoardList(m);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("pi", pi);
		return map;
	}

	
	  @Transactional
	  public int insertBoard(BoardDTO board, List<BoardFileDTO> boardFileList) { 
		  board.setBoardThumb(boardFileList.get(0).getFilepath());
		 int result = boardDao.insertBoard(board);
		 int boardNo = boardDao.selectBoardNo();
		 
		 for(BoardFileDTO boardFile : boardFileList) {
		 boardFile.setBoardNo(boardNo);
		 result += boardDao.insertBoardFile(boardFile); } 
		 return result; 
		 }


	
}
