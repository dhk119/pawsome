import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // 기본 CSS 가져오기
import "./calendar.css"; // 커스텀 CSS 가져오기
import moment from "moment";
import axios from "axios";
import { loginEmailState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";
import { IoAddCircle, IoCloseSharp } from "react-icons/io5";
import ReactModal from "react-modal";
import Swal from "sweetalert2";

const MypageCalendar = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [schedule, setSchedule] = useState([]);
  const [value, setValue] = useState(new Date()); // 캘린더 선택 날짜 초기값은 현재 날짜
  const [selectedSchedules, setSelectedSchedules] = useState([]); // 선택된 날짜의 스케줄 목록
  const [selectedSchedule, setSelectedSchedule] = useState(null); // 선택된 개별 일정
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // 일정 추가 모달 상태
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // 일정 상세 모달 상태
  const [isUpdateMode, setIsUpdateMode] = useState(false); // 수정 모드 상태 추가

  const [newSchedule, setNewSchedule] = useState({
    dayTitle: "",
    dayStart: moment().format("YYYY-MM-DD"),
    dayEnd: "",
    dayContent: "",
    memberEmail: loginEmail,
  });

  useEffect(() => {
    axios
      .get(`${backServer}/member/selectSchedule?memberEmail=${loginEmail}`)
      .then((res) => {
        console.log(res);
        setSchedule(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loginEmail]);

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
    setValue(date);

    const selectedDate = moment(date).format("YYYY-MM-DD");
    const filteredSchedules = schedule.filter((item) => {
      const start = moment(item.dayStart).format("YYYY-MM-DD");
      const end = item.dayEnd
        ? moment(item.dayEnd).format("YYYY-MM-DD")
        : start;
      return selectedDate >= start && selectedDate <= end;
    });

    setSelectedSchedules(filteredSchedules);
  };

  // 수정
  const handleUpdateSchedule = () => {
    if (selectedSchedule) {
      axios
        .post(`${backServer}/member/updateSchedule`, selectedSchedule)
        .then((res) => {
          const updatedSchedule = res.data;
          const updatedSchedules = schedule.map((item) =>
            item.dayNo === updatedSchedule.dayNo ? updatedSchedule : item
          );
          setSchedule(updatedSchedules);
          setSelectedSchedules(updatedSchedules);
          closeDetailModal();
          Swal.fire({ text: "일정이 수정되었습니다.", icon: "success" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //모달 열기/닫기 코드들
  const handleScheduleClick = (scheduleItem) => {
    setSelectedSchedule({
      ...scheduleItem,
      dayStart: moment(scheduleItem.dayStart).format("YYYY-MM-DD"),
    });
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedSchedule(null);
    setIsUpdateMode(false);
  };

  const openAddModal = () => {
    setNewSchedule({
      dayTitle: "",
      dayStart: moment(value).format("YYYY-MM-DD"),
      dayEnd: "",
      dayContent: "",
      memberEmail: loginEmail,
    });
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewSchedule({
      dayTitle: "",
      dayStart: moment().format("YYYY-MM-DD"),
      dayEnd: "",
      dayContent: "",
    });
  };
  ///////////////////////

  useEffect(() => {
    setNewSchedule((prevSchedule) => ({
      ...prevSchedule,
      memberEmail: loginEmail,
    }));
  }, [loginEmail]);

  //일정 추가
  const handleAddSchedule = () => {
    axios
      .post(`${backServer}/member/insertSchedule`, newSchedule)
      .then((res) => {
        const addedSchedule = res.data;
        // 전체 일정 상태 업데이트
        setSchedule((prevSchedules) => [...prevSchedules, addedSchedule]);

        // 선택된 날짜에 해당하는 일정 업데이트
        const selectedDate = moment(value).format("YYYY-MM-DD");
        const start = moment(addedSchedule.dayStart).format("YYYY-MM-DD");
        const end = addedSchedule.dayEnd
          ? moment(addedSchedule.dayEnd).format("YYYY-MM-DD")
          : start;

        if (selectedDate >= start && selectedDate <= end) {
          setSelectedSchedules((prevSelected) => [
            ...prevSelected,
            addedSchedule,
          ]);
        }

        // 모달 닫기 및 초기화
        closeAddModal();

        Swal.fire({
          text: "일정이 추가되었습니다.",
          icon: "success",
        });
      })
      .catch((err) => {
        console.log("일정 추가 중 오류 발생:", err);
        Swal.fire({
          text: "일정 추가 중 오류가 발생했습니다.",
          icon: "error",
        });
      });
  };

  //일정 삭제
  const deleteSchedule = () => {
    if (selectedSchedule && selectedSchedule.dayNo) {
      axios
        .delete(`${backServer}/member/deleteSchedule`, {
          params: { dayNo: selectedSchedule.dayNo },
        })
        .then((res) => {
          console.log("일정 삭제 완료:", res.data);

          // 전체 일정에서 삭제된 일정 제거
          const updatedSchedule = schedule.filter(
            (item) => item.dayNo !== selectedSchedule.dayNo
          );
          setSchedule(updatedSchedule);

          // 선택된 날짜의 일정 목록에서도 삭제된 일정 제거
          const updatedSelectedSchedules = selectedSchedules.filter(
            (item) => item.dayNo !== selectedSchedule.dayNo
          );
          setSelectedSchedules(updatedSelectedSchedules);

          Swal.fire({
            text: "일정 삭제 완료",
            icon: "success",
          });
          closeDetailModal();
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
        {/* <IoCloseSharp onClick={closeAddModal} /> */}
        <div>
          <label>제목</label>
          <input
            type="text"
            value={newSchedule.dayTitle}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, dayTitle: e.target.value })
            }
          />
        </div>
        <div>
          <label>시작일</label>
          <input
            type="date"
            value={newSchedule.dayStart}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, dayStart: e.target.value })
            }
          />
        </div>
        <div>
          <label>종료일</label>
          <input
            type="date"
            value={newSchedule.dayEnd}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, dayEnd: e.target.value })
            }
          />
        </div>
        <div>
          <label>내용</label>
          <textarea
            value={newSchedule.dayContent}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, dayContent: e.target.value })
            }
          ></textarea>
        </div>
        <div className="calendar-insert-btns">
          <button className="insert-btn" onClick={handleAddSchedule}>
            추가
          </button>
          <button className="close-btn" onClick={closeAddModal}>
            닫기
          </button>
        </div>
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
          <div className="schedule-wrap">
            {/* 일정 수정 모드 전환 */}
            {isUpdateMode ? (
              <>
                <label>제목</label>
                <input
                  type="text"
                  value={selectedSchedule.dayTitle}
                  onChange={(e) =>
                    setSelectedSchedule({
                      ...selectedSchedule,
                      dayTitle: e.target.value,
                    })
                  }
                />
                <label>시작일</label>
                <input
                  type="date"
                  value={selectedSchedule.dayStart}
                  onChange={(e) =>
                    setSelectedSchedule({
                      ...selectedSchedule,
                      dayStart: e.target.value,
                    })
                  }
                />
                <label>종료일</label>
                <input
                  type="date"
                  value={selectedSchedule.dayEnd}
                  onChange={(e) =>
                    setSelectedSchedule({
                      ...selectedSchedule,
                      dayEnd: e.target.value,
                    })
                  }
                />
                <label>내용</label>
                <textarea
                  value={selectedSchedule.dayContent}
                  onChange={(e) =>
                    setSelectedSchedule({
                      ...selectedSchedule,
                      dayContent: e.target.value,
                    })
                  }
                />
                <div className="schedule-wrap-btns">
                  <button onClick={handleUpdateSchedule}>저장</button>
                  <button
                    className="close-btn"
                    onClick={() => setIsUpdateMode(false)}
                  >
                    취소
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2>{selectedSchedule.dayTitle}</h2>
                {/* <IoCloseSharp onClick={closeDetailModal} /> */}
                <p>시작일: {selectedSchedule.dayStart}</p>
                {selectedSchedule.dayEnd && (
                  <p>종료일: {selectedSchedule.dayEnd}</p>
                )}
                <p className="schedule-wrap-content">
                  {selectedSchedule.dayContent}
                </p>
                <div className="schedule-btns-wrap">
                  <button onClick={() => setIsUpdateMode(true)}>수정</button>
                  <button className="close-btn" onClick={deleteSchedule}>
                    삭제
                  </button>
                </div>
              </>
            )}
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
