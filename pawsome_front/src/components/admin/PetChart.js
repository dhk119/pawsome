import axios from "axios";
import { useEffect, useState } from "react";
import { Pie, PieChart } from "recharts";

const PetChart = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [chartData, setChartData] = useState([]);
  const [data, setData] = useState([]);
  const [option, setOption] = useState(0);
  const result = (resultData) => {
    for (let index = 0; index < resultData.length; index++) {
      let sum = 0;
      for (let index = 0; index < resultData.length; index++) {
        sum += resultData[index].count;
      }
      if (index % 4 === 0) {
        chartData.push({
          value: resultData[index].count,
          fill: "#ffbe58",
          name: resultData[index].key,
        });
        data.push({
          value: Math.round((10000 * resultData[index].count) / sum) / 100,
          fill: "#ffbe58",
          name: resultData[index].key,
        });
      } else if (index % 4 === 1) {
        chartData.push({
          value: resultData[index].count,
          fill: "#5799ff",
          name: resultData[index].key,
        });
        data.push({
          value: Math.round((10000 * resultData[index].count) / sum) / 100,
          fill: "#5799ff",
          name: resultData[index].key,
        });
      } else if (index % 4 === 2) {
        chartData.push({
          value: resultData[index].count,
          fill: "#ffd697",
          name: resultData[index].key,
        });
        data.push({
          value: Math.round((10000 * resultData[index].count) / sum) / 100,
          fill: "#ffd697",
          name: resultData[index].key,
        });
      } else if (index % 4 === 3) {
        chartData.push({
          value: resultData[index].count,
          fill: "#717171",
          name: resultData[index].key,
        });
        data.push({
          value: Math.round((10000 * resultData[index].count) / sum) / 100,
          fill: "#717171",
          name: resultData[index].key,
        });
      }
    }
  };
  useEffect(() => {
    {
      option === 0
        ? axios.get(`${backServer}/admin/petChartClass`).then((res) => {
            result(res.data);
            setChartData([...chartData]);
            setData([...data]);
          })
        : option === 1
        ? axios.get(`${backServer}/admin/petChartBreedDog`).then((res) => {
            result(res.data);
            setChartData([...chartData]);
            setData([...data]);
          })
        : option === 2
        ? axios.get(`${backServer}/admin/petChartBreedCat`).then((res) => {
            result(res.data);
            setChartData([...chartData]);
            setData([...data]);
          })
        : axios.get(`${backServer}/admin/petChartGender`).then((res) => {
            result(res.data);
            setChartData([...chartData]);
            setData([...data]);
          });
    }
  }, [option]);
  const changeOption = (e) => {
    setOption(Number(e.target.value));
    setChartData([]);
    setData([]);
  };
  return (
    <div className="App">
      <div className="admin-title">펫 차트</div>
      <div className="admin-write-wrap" id="admin-chart-hight">
        <div className="admin-top-left"></div>
        <div className="admin-top-left"></div>
        <div className="admin-top-left"></div>
        <div className="admin-top-left"></div>
        <div className="admin-top-mid"></div>
        <div className="admin-search-chart">
          <div className="admin-chart-right">
            <label htmlFor="chart-option"></label>
            <select id="chart-option" value={option} onChange={changeOption}>
              <option value={0}>종</option>
              <option value={1}>품종(강아지)</option>
              <option value={2}>품종(고양이)</option>
              <option value={3}>성별</option>
            </select>
          </div>
        </div>
      </div>
      <div className="admin-flex admin-pet-chart-top">
        <div className="inquiry-sub-title">수량/퍼센트</div>
        <PieChart width={500} height={500}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            tspan={data + "%"}
            outerRadius={100}
            label
          />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={170}
            outerRadius={220}
            fill="#82ca9d"
            label
          />
        </PieChart>
      </div>
      <div className="admin-pet-chart-bottom admin-flex-left">
        {chartData.map((chart, i) => {
          return (
            <>
              {i % 4 === 0 ? (
                <>
                  <div className="admin-chart-label-one"></div>
                  <div
                    style={{
                      color: "#ffbe58",
                      width: "50px",
                      height: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {chart.name}
                  </div>
                </>
              ) : i % 4 === 1 ? (
                <>
                  <div className="admin-chart-label-two"></div>
                  <div
                    style={{
                      color: "#5799ff",
                      width: "50px",
                      height: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {chart.name}
                  </div>
                </>
              ) : i % 4 === 2 ? (
                <>
                  <div className="admin-chart-label-three"></div>
                  <div
                    style={{
                      color: "#ffd697",
                      width: "50px",
                      height: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {chart.name}
                  </div>
                </>
              ) : (
                <>
                  <div className="admin-chart-label-four"></div>
                  <div
                    style={{
                      color: "#717171",
                      width: "50px",
                      height: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {chart.name}
                  </div>
                </>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};
export default PetChart;
