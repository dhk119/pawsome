package kr.co.iei.board.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.board.model.dao.BoardDao;
import kr.co.iei.board.model.dto.BoardDTO;
import kr.co.iei.board.model.dto.BoardFileDTO;
import kr.co.iei.board.model.dto.ReplyDTO;
import kr.co.iei.util.PageInfo;
import kr.co.iei.util.PageUtil;

@Service
public class BoardService {
	@Autowired
	private BoardDao boardDao;
	@Autowired
	private PageUtil pageUtil;

	public Map selectBoardList(int reqPage, int tag) {
		int numPerPage = 5;
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
		  if(!boardFileList.isEmpty()) {
			  board.setBoardThumb(boardFileList.get(0).getFilepath());
		  }
		 int result = boardDao.insertBoard(board);
		 int boardNo = boardDao.selectBoardNo();
		 
		 for(BoardFileDTO boardFile : boardFileList) {
		 boardFile.setBoardNo(boardNo);
		 result += boardDao.insertBoardFile(boardFile); } 
		 System.out.println(result);
		 if(result == 0) {
			 return 0;
		 }else {
			 
			 return result; 
		 }
		 }


	public BoardDTO selectOneBoard(int boardNo) {
		BoardDTO board = boardDao.selectOneBoard(boardNo);
		List<BoardFileDTO> fileList = boardDao.selectFileImage(boardNo);
		int readCount = boardDao.updateBoardCount(boardNo);
		board.setFileList(fileList);
		return board;
	}

	@Transactional
	public List<BoardFileDTO> deleteBoard(int boardNo) {
		List<BoardFileDTO> fileList = boardDao.selectOneBoardFileList(boardNo);
		int result = boardDao.deleteBoard(boardNo);
		if(result>0) {
			return fileList;
		}else {
			return null;			
		}
	}

	@Transactional
	public List<BoardFileDTO> updateBoard(BoardDTO board, List<BoardFileDTO> boardFileList) {
		int result = boardDao.updateBoard(board);
		if(result>0) {
			List<BoardFileDTO> delFileList = new ArrayList<BoardFileDTO>();
			if(board.getDelBoardFileNo() != null) {
				delFileList = boardDao.selectBoardFile(board.getDelBoardFileNo());
				result += boardDao.deleteBoardFile(board.getDelBoardFileNo());
			}
			for(BoardFileDTO boardFile : boardFileList) {
				result += boardDao.insertBoardFile(boardFile);
			}
		
			int updateTotal = board.getDelBoardFileNo() == null
								? 1 + boardFileList.size()
								: 1 + boardFileList.size() + board.getDelBoardFileNo().length;
			if(result == updateTotal) {
				return delFileList;
			}
		}
		return null;
	}

	@Transactional
	public int isLike(BoardDTO board) {
		int result = 0;
		if(board.getBoardLike() == 0) {
			result = boardDao.insertBoardLike(board);
			return result;
		}else {
			return -1;
		}
	}


	public Map selectReplyList(int reqPage, int boardNo) {
		int numPerPage = 5;
		int pageNaviSize = 5;
		int totalCount = boardDao.totalReplyCount(boardNo);
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		Map<String, Object> m = new HashMap<String, Object>();
		m.put("start", pi.getStart());
		m.put("end", pi.getEnd());
		m.put("boardNo", boardNo);
		List list = boardDao.selectReplyList(m);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list.size() == 0 ? null : list);
		map.put("pi", pi);
		return map;
	}

	@Transactional
	public int insertReply(ReplyDTO reply) {
		System.out.println(reply);
		int result = boardDao.insertReply(reply);
		return result;
	}

	@Transactional
	public List<ReplyDTO> deleteReply(int replyNo) {
		List<ReplyDTO> reply = boardDao.selectOneReply(replyNo);
		int result = boardDao.deleteReply(replyNo);
		if(result>0) {
			return reply;
		}else {
			return null;			
		}
	}

	@Transactional
	public int replyLike(ReplyDTO reply) {
		int result = 0;
		if(reply.getReplyNo() == 0 ) {
			result = boardDao.insertReplyLike(reply);
		}
		if(result >0){
			int likeCount = boardDao.selectReplyLikeCount(reply);
			System.out.println(likeCount);
			return likeCount;
		}else {
			return -1;
		}
	}




	

	
}
