import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // 기본 CSS 가져오기
import "./calendar.css"; // 커스텀 CSS 가져오기
import moment from "moment";
import axios from "axios";
import { loginEmailState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";
import { IoAddCircle } from "react-icons/io5";
import ReactModal from "react-modal";

const MypageCalendar = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [schedule, setSchedule] = useState([]);
  const [value, setValue] = useState(new Date()); // 캘린더 선택 날짜 초기값은 현재 날짜
  const [selectedSchedules, setSelectedSchedules] = useState([]); // 선택된 날짜의 스케줄 목록
  const [selectedSchedule, setSelectedSchedule] = useState(null); // 선택된 개별 일정
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // 일정 추가 모달 상태
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // 일정 상세 모달 상태

  // 일정 추가 모달에서 사용될 상태
  const [newSchedule, setNewSchedule] = useState({
    title: "",
    date: value,
    content: "",
  });

  useEffect(() => {
    axios
      .get(`${backServer}/member/selectSchedule?memberEmail=${loginEmail}`)
      .then((res) => {
        console.log(res);
        setSchedule(res.data); // 일정 데이터 설정
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loginEmail]);

  // 날짜와 일정을 비교하여 해당 날짜에 일정을 표시하는 함수
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = moment(date).format("YYYY-MM-DD");

      const daySchedules = schedule.filter((item) => {
        const start = moment(item.dayStart).format("YYYY-MM-DD");
        const end = item.dayEnd
          ? moment(item.dayEnd).format("YYYY-MM-DD")
          : start;

        return formattedDate >= start && formattedDate <= end;
      });

      return daySchedules.length > 0 ? (
        <div className="schedule-dot">
          {daySchedules.length === 1 ? (
            <span className="schedule-text">{daySchedules[0].dayTitle}</span>
          ) : (
            <span className="schedule-text">일정 {daySchedules.length}건</span>
          )}
        </div>
      ) : null;
    }
  };

  const handleDateChange = (date) => {
    setValue(date); // 선택한 날짜 업데이트

    const selectedDate = moment(date).format("YYYY-MM-DD");
    const filteredSchedules = schedule.filter((item) => {
      const start = moment(item.dayStart).format("YYYY-MM-DD");
      const end = item.dayEnd
        ? moment(item.dayEnd).format("YYYY-MM-DD")
        : start;

      return selectedDate >= start && selectedDate <= end;
    });

    setSelectedSchedules(filteredSchedules); // 선택된 날짜의 스케줄 목록 업데이트
  };

  const handleScheduleClick = (scheduleItem) => {
    setSelectedSchedule(scheduleItem); // 선택된 스케줄 저장
    setIsDetailModalOpen(true); // 일정 상세 모달 열기
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false); // 상세 모달 닫기
    setSelectedSchedule(null); // 선택된 스케줄 초기화
  };

  const openAddModal = () => {
    setIsAddModalOpen(true); // 일정 추가 모달 열기
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false); // 일정 추가 모달 닫기
    setNewSchedule({ title: "", date: value, content: "" }); // 초기화
  };

  const handleAddSchedule = () => {
    // 여기서 서버에 일정 추가 요청을 보낼 수 있습니다.
    console.log("새 일정 추가:", newSchedule);

    // 모달 닫기
    closeAddModal();
  };

  return (
    <>
      <div className="calendar-wrap">
        <Calendar
          onChange={handleDateChange} // 날짜 선택 시 선택된 날짜의 스케줄 목록 업데이트
          value={value} // 선택된 날짜 상태
          formatDay={(local, date) => moment(date).format("DD")} // 날짜 포맷
          formatYear={(locale, date) => moment(date).format("YYYY")} // 네비게이션에서 년도만 보이게 설정
          formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")} // 네비게이션에서 월/년도 보이게 설정
          calendarType="gregory" // 일요일 부터 시작
          next2Label={null} // +1년 & +10년 이동 버튼 숨기기
          prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
          minDetail="year" // 10년 단위 년도 숨기기
          tileContent={tileContent} // 각 타일에 일정 표시
        />
        <div className="calendar-list">
          <div className="calendar-list-title">
            <h2>일정 목록</h2>
            <IoAddCircle onClick={openAddModal} />
          </div>
          <div className="calendar-schedule-list">
            {selectedSchedules.length > 0 ? (
              selectedSchedules.map((item, index) => (
                <div
                  key={index}
                  className="schedule-item"
                  onClick={() => handleScheduleClick(item)} // 클릭 시 상세 모달 열기
                >
                  <h3>{item.dayTitle}</h3>
                </div>
              ))
            ) : (
              <p>선택된 날짜에 일정이 없습니다.</p>
            )}
          </div>
        </div>
      </div>

      {/* 일정 추가 모달 */}
      <ReactModal
        isOpen={isAddModalOpen}
        onRequestClose={closeAddModal}
        contentLabel="일정 추가"
        ariaHideApp={false}
        className="calendar-modal"
      >
        <h2>일정 추가</h2>
        <div>
          <label>제목</label>
          <input
            type="text"
            value={newSchedule.title}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, title: e.target.value })
            }
          />
        </div>
        <div>
          <label>날짜</label>
          <input
            type="date"
            value={moment(newSchedule.date).format("YYYY-MM-DD")}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, date: new Date(e.target.value) })
            }
          />
        </div>
        <div>
          <label>내용</label>
          <textarea
            value={newSchedule.content}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, content: e.target.value })
            }
          ></textarea>
        </div>
        <button onClick={handleAddSchedule}>일정 추가</button>
        <button onClick={closeAddModal}>닫기</button>
      </ReactModal>

      {/* 일정 상세 모달 */}
      <ReactModal
        isOpen={isDetailModalOpen}
        onRequestClose={closeDetailModal}
        contentLabel="일정 상세"
        ariaHideApp={false}
        className="calendar-modal"
      >
        {selectedSchedule ? (
          <div>
            <h2>{selectedSchedule.dayTitle}</h2>
            <p>시작일: {selectedSchedule.dayStart}</p>
            {selectedSchedule.dayEnd && (
              <p>종료일: {selectedSchedule.dayEnd}</p>
            )}
            <p>내용: {selectedSchedule.dayContent}</p>
            <button onClick={closeDetailModal}>닫기</button>
          </div>
        ) : (
          <div>
            <p>일정을 선택하세요.</p>
            <button onClick={closeDetailModal}>닫기</button>
          </div>
        )}
      </ReactModal>
    </>
  );
};

export default MypageCalendar;
