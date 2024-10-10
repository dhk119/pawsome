import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 300px;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  width: 95%;
  margin-right: 20px;
  height: 550px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
`;
export const VideoContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 550px;
  border-radius: 15px; /* 둥근 모서리 추가 */
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
`;
export const BackgroundVideo = styled.video`
  position: absolute;
  z-index: -1;
  object-fit: cover;
  width: 100%;
  height: 550px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
`;

export const Content = styled.div`
  position: relative;
  z-index: 1; /* 콘텐츠를 앞쪽에 표시 */
  color: #fff;
  padding: 0 10px;
`;
export const SpaceAround = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export const TemperText = styled.h1`
  font-size: 2em;
  margin: 10px 0;
`;

export const WeatherWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ImgFlex = styled.div`
  display: flex;
`;

export const WeatherImg = styled.img`
  width: 50px;
  height: 50px;
`;

export const WeatherText = styled.p`
  font-size: 1.2em;
`;

export const MaxMin = styled.p`
  font-size: 1em;
`;

export const HumidityText = styled.p`
  font-size: 1em;
`;

export const Margin = styled.div`
  height: ${(props) => props.height}px;
`;

export const WeatherList = styled.ul`
  display: flex; // 가로로 나열
  flex-wrap: wrap; // 화면 크기에 맞춰 줄바꿈
  padding: 0; // 기본 패딩 제거
  list-style: none; // 기본 리스트 스타일 제거
`;

export const WeatherBox = styled.div`
  background: rgba(255, 255, 255, 0.2); // 반투명 배경
  border-radius: 10px; // 모서리 둥글게
  padding: 15px; // 패딩 추가
  margin: 10px; // 좌우 마진
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); // 그림자 효과
  display: flex;
  justify-content: space-between; // 내용 정렬
  align-items: center; // 가운데 정렬
  width: 400px; // 각 박스의 너비
  height: 30px; // 각 박스의 높이
`;

export const DateText = styled.span`
  font-weight: bold; // 글씨 두껍게
`;

export const TempText = styled.span`
  font-size: 1.2em; // 글씨 크기 조정
`;
