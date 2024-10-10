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
  const [videoUrl, setVideoUrl] = useState("");

  const cityName = "Seoul"; // API 요청을 위한 도시 이름
  const apiKey = process.env.REACT_APP_WEATHER_KEY;

  useEffect(() => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&lang=kr`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&lang=kr`;

    const updateVideoUrl = (mainWeather) => {
      const currentHour = new Date().getHours();
      if (currentHour >= 18 || currentHour < 6) {
        // 저녁 시간에 다른 링크를 사용
        setVideoUrl(
          "https://videos.pexels.com/video-files/26690702/11987721_2560_1440_60fps.mp4"
        );
        return;
      }
      switch (mainWeather) {
        case "Clear":
          setVideoUrl(
            "https://videos.pexels.com/video-files/2605326/2605326-uhd_2560_1440_30fps.mp4"
          );
          break;
        case "Clouds":
          setVideoUrl(
            "https://videos.pexels.com/video-files/14117658/14117658-uhd_2560_1440_30fps.mp4"
          );
          break;
        case "Rain":
          setVideoUrl(
            "https://videos.pexels.com/video-files/8549580/8549580-uhd_2560_1440_25fps.mp4"
          );
          break;
        case "Snow":
          setVideoUrl(
            "https://videos.pexels.com/video-files/6620470/6620470-uhd_2732_1440_25fps.mp4"
          );
          break;
        case "Thunderstorm":
          setVideoUrl(
            "https://videos.pexels.com/video-files/5908584/5908584-hd_1920_1080_25fps.mp4"
          );
          break;
        case "Mist":
          setVideoUrl(
            "https://videos.pexels.com/video-files/28647807/12442307_1080_1920_30fps.mp4"
          );
          break;
        default:
          setVideoUrl("https://example.com/weather-videos/default.mp4");
          break;
      }
    };
    Promise.all([axios.get(weatherUrl), axios.get(forecastUrl)])
      .then(([weatherResponse, forecastResponse]) => {
        setCurrentWeather(weatherResponse.data);
        groupForecastByDay(forecastResponse.data.list);
        getKoreanWeekday(forecastResponse.data.list);
        setLoading(false);
        updateVideoUrl(weatherResponse.data.weather[0].main);
      })
      .catch((error) => {
        console.error("api 호출 에러:", error);
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
    return "에러 발생";
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
        {videoUrl && (
          <BackgroundVideo autoPlay muted loop>
            <source src={videoUrl} type="video/mp4" />
          </BackgroundVideo>
        )}
      </VideoContainer>
      <div
        style={{
          width: "1200px",
          background: "rgba(255, 255, 255, 0.1)",
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
