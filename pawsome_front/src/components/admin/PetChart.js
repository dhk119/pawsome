import axios from "axios";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

const PetChart = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [dataData, setDataData] = useState([]);
  useEffect(() => {
    axios.get(`${backServer}/admin/petPercentClass`).then((res) => {
      setData([
        {
          value: res.data[0],
          fill: "#ffbe58",
          name: "강아지",
        },
        {
          value: res.data[1],
          fill: "#5799ff",
          name: "고양이",
        },
      ]);
      setDataData([
        {
          value:
            Math.round((10000 * res.data[0]) / (res.data[0] + res.data[1])) /
            100,
          fill: "#ffbe58",
          name: "강아지",
        },
        {
          value:
            Math.round((10000 * res.data[1]) / (res.data[0] + res.data[1])) /
            100,
          fill: "#5799ff",
          name: "고양이",
        },
      ]);
    });
  }, []);
  const [data, setData] = useState([]);
  return (
    <div className="App">
      <div className="admin-title">펫 차트</div>
      <div className="admin-flex admin-pet-chart-top">
        <div className="inquiry-sub-title">수량/퍼센트</div>
        <PieChart width={500} height={500}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          />
          <Pie
            data={dataData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={150}
            outerRadius={200}
            fill="#82ca9d"
            label
          />
        </PieChart>
      </div>
      <div className="admin-pet-chart-bottom admin-flex-left">
        <div className="admin-chart-label-one"></div>
        <div
          style={{
            color: "#ffbe58",
            width: "50px",
            height: "20px",
            fontWeight: "bold",
          }}
        >
          강아지
        </div>
        <div className="admin-chart-label-two"></div>
        <div
          style={{
            color: "#5799ff",
            width: "50px",
            height: "20px",
            fontWeight: "bold",
          }}
        >
          고양이
        </div>
      </div>
    </div>
  );
};
export default PetChart;
