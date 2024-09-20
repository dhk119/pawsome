package kr.co.iei.board.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.board.model.dao.BoardDao;

@Service
public class BoardService {
	@Autowired
	private BoardDao boardDao;

	public Map selectBoardTag(int reqPage, int tag) {
		List list = boardDao.selectBoardTag(reqPage, tag);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		return map;
	}

	
}
