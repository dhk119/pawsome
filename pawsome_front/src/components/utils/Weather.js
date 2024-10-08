import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Wrapper,
  SpaceAround,
  TemperText,
  WeatherWrapper,
  ImgFlex,
  WeatherImg,
  WeatherText,
  MaxMin,
  HumidityText,
  Margin,
  BackgroundVideo,
  Content,
  VideoContainer,
  WeatherBox,
  DateText,
  TempText,
  WeatherList,
} from "./StyledComponents"; // 스타일 컴포넌트를 불러오는 경로를 수정하세요.
import { SlDrop } from "react-icons/sl"; // 아이콘을 불러오는 경로를 수정하세요.
import Loading from "./Loading";

const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cityName = "Seoul"; // API 요청을 위한 도시 이름
  const apiKey = process.env.REACT_APP_WEATHER_KEY;

  useEffect(() => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&lang=kr`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&lang=kr`;

    Promise.all([axios.get(weatherUrl), axios.get(forecastUrl)])
      .then(([weatherResponse, forecastResponse]) => {
        setCurrentWeather(weatherResponse.data);
        groupForecastByDay(forecastResponse.data.list);
        getKoreanWeekday(forecastResponse.data.list);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [cityName, apiKey]);

  const getCurrentDate = () => {
    const today = new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      locale: "ko-KR",
    };
    return today.toLocaleDateString("ko-KR", options); // 한국어로 형식화
  };

  const getKoreanWeekday = (date) => {
    const weekdays = ["월", "화", "수", "목", "금", "토", "일"];
    return weekdays[new Date(date).getDay()]; // 요일 인덱스에 맞춰 한글 요일 반환
  };

  const groupForecastByDay = (forecastList) => {
    const grouped = forecastList.reduce((acc, item) => {
      // 날짜를 월/일 형식으로 가져오기
      const date = new Date(item.dt * 1000).toLocaleDateString("ko-KR", {
        month: "2-digit", // 두 자리 수 월
        day: "2-digit", // 두 자리 수 일
      });

      if (!acc[date]) {
        acc[date] = {
          temps: [],
          weather: item.weather[0].description,
          icon: item.weather[0].icon,
        };
      }
      acc[date].temps.push(item.main.temp - 273.15); // 켈빈을 섭씨로 변환
      return acc;
    }, {});

    const dailyData = Object.entries(grouped).map(([date, data]) => ({
      date,
      avgTemp: (
        data.temps.reduce((sum, temp) => sum + temp, 0) / data.temps.length
      ).toFixed(1),
      weather: data.weather,
      icon: data.icon,
      weekday: getKoreanWeekday(date), // 요일 추가
    }));

    setDailyForecast(dailyData);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Loading />;
  }

  const temp = currentWeather.main.temp;
  const temp_max = currentWeather.main.temp_max;
  const temp_min = currentWeather.main.temp_min;
  const humidity = currentWeather.main.humidity;
  const desc = currentWeather.weather[0].description;
  const icon = currentWeather.weather[0].icon;
  const imgSrc = `https://openweathermap.com/img/w/${icon}.png`;

  return (
    <Wrapper>
      <VideoContainer>
        <BackgroundVideo autoPlay muted loop>
          <source src="image/cloud.mp4" type="video/mp4" />
        </BackgroundVideo>
      </VideoContainer>
      <div
        style={{
          width: "1200px",
          background: "rgba(255, 255, 255, 0.3)",
          borderRadius: "10px",
          padding: "50px",
          marginLeft: "200px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Content>
          <TemperText style={{ textAlign: "center" }}>
            {cityName === "Seoul" ? "서울특별시" : ""}
          </TemperText>
          <DateText style={{ marginLeft: "20px" }}>
            오늘 : {getCurrentDate()}
          </DateText>
          <SpaceAround>
            <div>
              <TemperText>{(temp - 273.15).toFixed(0)}°</TemperText>
            </div>
            <WeatherWrapper>
              <ImgFlex>
                <WeatherImg src={imgSrc} />
              </ImgFlex>
              <WeatherText>{desc}</WeatherText>
            </WeatherWrapper>
          </SpaceAround>
          <Margin height="10" />
          <SpaceAround>
            <MaxMin>
              최고: {(temp_max - 273.15).toFixed(0)}° 최저:
              {(temp_min - 273.15).toFixed(0)}°
            </MaxMin>
            <HumidityText>
              <SlDrop
                size="17px"
                style={{ marginTop: "3px", marginRight: "8px" }}
              />
              습도: {humidity} %
            </HumidityText>
          </SpaceAround>
        </Content>
      </div>
      <div>
        <Content>
          <TemperText>주간 예보</TemperText>
          <WeatherList>
            {dailyForecast.map((day) => (
              <li key={day.date}>
                <WeatherBox>
                  <DateText>{day.weekday}</DateText>
                  <DateText>{day.date}</DateText>
                  <TempText>평균 : {day.avgTemp}°</TempText>
                  <WeatherImg
                    src={`https://openweathermap.com/img/w/${day.icon}.png`}
                    alt={day.weather}
                  />
                  <TempText>{day.weather}</TempText>
                </WeatherBox>
              </li>
            ))}
          </WeatherList>
        </Content>
      </div>
    </Wrapper>
  );
};

export default Weather;
