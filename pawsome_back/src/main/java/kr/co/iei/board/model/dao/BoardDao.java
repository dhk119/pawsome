package kr.co.iei.board.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardDao {

	List selectBoardTag(int reqPage, int tag);

}
