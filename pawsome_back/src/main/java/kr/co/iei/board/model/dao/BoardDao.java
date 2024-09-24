package kr.co.iei.board.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.board.model.dto.BoardDTO;
import kr.co.iei.board.model.dto.BoardFileDTO;

@Mapper
public interface BoardDao {

	

	int totalCount(int tag);

	List selectBoardTag(Map m);

	int insertBoard(BoardDTO board);
	 
	int insertBoardFile(BoardFileDTO boardFile);


}
