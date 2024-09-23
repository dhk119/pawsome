package kr.co.iei.board.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardDao {

	

	int totalCount(int tag);

	List selectBoardTag(Map m);

}
