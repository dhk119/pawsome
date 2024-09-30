import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import axios from "axios";
import { loginEmailState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";

const MypageCalendar = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);

  useEffect(() => {
    axios
      .post(`${backServer}/member/calendar`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loginEmail]);

  return (
    <div className="calendar-wrap">
      <Calendar formatDay={(local, date) => moment(date).format("DD")} />
    </div>
  );
};

export default MypageCalendar;
