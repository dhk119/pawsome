import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // 기본 CSS 가져오기
import "./calendar.css"; // 커스텀 CSS 가져오기
import moment from "moment";
import axios from "axios";
import { loginEmailState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";

const MypageCalendar = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [schedule, setSchedule] = useState([]);
  const [value, onChange] = useState(new Date()); // 캘린더 선택 날짜 초기값은 현재 날짜

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
      // 월간 보기일 때만 일정 표시
      const formattedDate = moment(date).format("YYYY-MM-DD");

      // 해당 날짜가 dayStart와 dayEnd 범위 내에 있는 일정 필터링
      const daySchedules = schedule.filter((item) => {
        const start = moment(item.dayStart).format("YYYY-MM-DD");
        const end = item.dayEnd
          ? moment(item.dayEnd).format("YYYY-MM-DD")
          : start; // dayEnd가 없으면 start와 동일하게 설정

        return formattedDate >= start && formattedDate <= end;
      });

      // 일정이 있는 경우, dot 또는 텍스트로 일정 개수 표시
      return daySchedules.length > 0 ? (
        <div className="schedule-dot">
          {/* 일정 개수나 제목 표시 */}
          {daySchedules.length === 1 ? (
            <span className="schedule-text">{daySchedules[0].dayTitle}</span>
          ) : (
            <span className="schedule-text">일정 {daySchedules.length}건</span>
          )}
        </div>
      ) : null;
    }
  };

  return (
    <>
      <div className="calendar-wrap">
        <Calendar
          onChange={onChange} // 날짜 선택 시 선택된 날짜 상태 업데이트
          value={value} // 선택된 날짜 상태
          formatDay={(local, date) => moment(date).format("DD")} // 날짜 포맷
          formatYear={(locale, date) => moment(date).format("YYYY")} // 네비게이션에서 년도만 보이게 설정
          formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")} // 네비게이션에서 월/년도 보이게 설정
          calendarType="gregory" // 일요일 부터 시작
          // showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
          next2Label={null} // +1년 & +10년 이동 버튼 숨기기
          prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
          minDetail="year" // 10년 단위 년도 숨기기
          tileContent={tileContent} // 각 타일에 일정 표시
        />
      </div>
    </>
  );
};

export default MypageCalendar;
