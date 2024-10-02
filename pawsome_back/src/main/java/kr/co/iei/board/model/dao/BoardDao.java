package kr.co.iei.board.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.board.model.dto.BoardDTO;
import kr.co.iei.board.model.dto.BoardFileDTO;
import kr.co.iei.board.model.dto.ReplyDTO;

@Mapper
public interface BoardDao {

	

	int totalCount(int tag);

	List selectBoardList(Map m);

	int insertBoard(BoardDTO board);
	 
	int insertBoardFile(BoardFileDTO boardFile);

	int selectBoardNo();

	BoardDTO selectOneBoard(int boardNo);

	List selectFileImage(int boardNo);

	int updateBoardCount(int boardNo);

	List<BoardFileDTO> selectOneBoardFileList(int boardNo);

	int deleteBoard(int boardNo);

	int updateBoard(BoardDTO board);

	List<BoardFileDTO> selectBoardFile(int[] delBoardFileNo);

	int deleteBoardFile(int[] delBoardFileNo);

	int insertBoardLike(BoardDTO board);

	int selectBoardLike(BoardDTO board);

	int totalReplyCount(int boardNo);

	List selectReplyList(Map<String, Object> m);

	int insertReply(ReplyDTO reply);

	int deleteReply(int replyNo);

	List<ReplyDTO> selectOneReply(int replyNo);

	int insertReplyLike(ReplyDTO reply);

	int selectReplyLikeCount(ReplyDTO reply);




}
