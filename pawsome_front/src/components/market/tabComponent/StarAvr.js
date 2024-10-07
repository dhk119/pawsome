import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { BarChart, BarPlot } from "@mui/x-charts/BarChart";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { colors } from "@mui/material";

const StarAvr = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const productNo = params.productNo;
  const starData = props.starData;
  const setStarData = props.setStarData;
  const total = props.total;
  const setTotal = props.setTotal;
  useEffect(() => {
    axios
      .get(`${backServer}/product/selectStar/${productNo}`)
      .then((res) => {
        const uData = new Array();
        for (let i = 0; i < res.data.length; i++) {
          uData.push(res.data[i].totalStar);
        }
        setStarData(uData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    const totalStar = (starData) => {
      let totalSum = 0;
      starData.forEach((item, i) => {
        let c = 5 - i;
        totalSum += item * c;
      });
      setTotal(totalSum);
    };
    if (starData.length) {
      totalStar(starData); // starData가 있을 때 호출
    }
  }, [starData, setTotal]);

  const xColors = ["#ffa518", "#ffa518", "#ffa518", "#ffa518", "#ffa518"];
  const xLabels = ["5점", "4점", "3점", "2점", "1점"];
  const chekData = [25, 25, 23, 21, 32];
  return (
    <>
      {/* <ChartContainer
        width={500}
        height={300}
        xAxis={[
          {
            scaleType: "band",
            data: xLabels,
            fill: "#ffa518",
          },
        ]} // x축을 수치형으로 설정
        // y축을 범주형으로 설정
        series={[{ data: uData, label: "uv", type: "bar" }]} // 데이터를 객체 배열로 설정
      >
        <BarPlot layout="horizontal" />  수평으로 설정 
    </ChartContainer > 
      */}
      {starData ? (
        <BarChart
          width={500}
          height={300}
          sx={[{ p: 2 }]}
          yAxis={[
            {
              scaleType: "band",
              data: xLabels,
            },
          ]}
          series={[{ data: starData, type: "bar", color: "#ffa518" }]}
          layout="horizontal"
        />
      ) : (
        ""
      )}
    </>
  );
};

export default StarAvr;
