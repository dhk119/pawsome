import { useState } from "react";
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
  const [data, setData] = useState([
    { pv: 2, uv: 10 },
    { pv: 3, uv: 5 },
    { pv: 12, uv: 100 },
    { pv: 4, uv: 12 },
    { pv: 8, uv: 2 },
  ]);
  const [data01, setData01] = useState([
    { value: 10, fill: "#ff0000", name: "1" },
    { value: 8, fill: "#0000ff", name: "2" },
    { value: 35, fill: "#ffff00", name: "3" },
    { value: 44, fill: "#00ff00", name: "4" },
    { value: 20, fill: "#00ffff", name: "5" },
  ]);

  return (
    <div className="App">
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
      <PieChart width={730} height={250}>
        <Pie
          data={data01}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={50}
          label
        />
      </PieChart>
      <div>
        <div style={{ color: "#ff0000", width: "20px", height: "20px" }}>1</div>
        <div style={{ color: "#0000ff", width: "20px", height: "20px" }}>2</div>
        <div style={{ color: "#ffff00", width: "20px", height: "20px" }}>3</div>
        <div style={{ color: "#00ff00", width: "20px", height: "20px" }}>4</div>
        <div style={{ color: "#00ffff", width: "20px", height: "20px" }}>5</div>
      </div>
    </div>
  );
};
export default PetChart;
