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
} from "./StyledComponents"; // 스타일 컴포넌트를 불러오는 경로를 수정하세요.
import { SlDrop } from "react-icons/sl"; // 아이콘을 불러오는 경로를 수정하세요.

const Weather = () => {
  const [temp, setTemp] = useState(0);
  const [temp_max, setTempMax] = useState(0);
  const [temp_min, setTempMin] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [desc, setDesc] = useState("");
  const [icon, setIcon] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cityName = "Seoul";
    const apiKey = process.env.REACT_APP_WEATHER_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&lang=KR`;

    axios
      .get(url)
      .then((responseData) => {
        const data = responseData.data;
        setTemp(data.main.temp);
        setTempMax(data.main.temp_max);
        setTempMin(data.main.temp_min);
        setHumidity(data.main.humidity);
        setDesc(data.weather[0].description);
        setIcon(data.weather[0].icon);
        setLoading(false);
        console.log(responseData);
      })
      .catch((error) => console.log(error));
  }, []);

  const imgSrc = `https://openweathermap.com/img/w/${icon}.png`;

  if (loading) {
    return <p>Loading</p>;
  } else {
    return (
      <Wrapper>
        <div>
          <TemperText>서울 특별시</TemperText>
        </div>
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
            최고: {(temp_max - 273.15).toFixed(0)}° 최저:{" "}
            {(temp_min - 273.15).toFixed(0)}°
          </MaxMin>
          <HumidityText>
            <SlDrop
              size="17px"
              style={{ marginTop: "7px", marginRight: "8px" }}
            />
            습도: {humidity} %
          </HumidityText>
        </SpaceAround>
      </Wrapper>
    );
  }
};

export default Weather;
