import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SpaceAround = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export const TemperText = styled.h1`
  font-size: 2em;
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
