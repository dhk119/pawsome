import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Interceptor from "./Interceptor";
import { useRecoilState } from "recoil";
import { memberLevelState } from "../utils/RecoilData";
import Swal from "sweetalert2";
const ProductChart = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [typeCategory, setTypeCategory] = useState(0);
  const [buyState, setBuyState] = useState(1);
  const [chartData, setChartData] = useState([]);
  const [barData, setBarData] = useState([
    { key: 2, count: 10 },
    { key: 2, count: 10 },
    { key: 2, count: 10 },
  ]);
  const [data, setData] = useState([]);
  const [renderChart, setRenderChart] = useState("수입 통계");
  const [viewBar, setViewBar] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalTitle, setTotalTitle] = useState("총량:");
  const [cost, setCost] = useState("");
  const [barKey, setBarKey] = useState("");
  const navigate = useNavigate();
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
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
      } else if (index % 10 === 1) {
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
      } else if (index % 10 === 2) {
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
      } else if (index % 10 === 3) {
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
      } else if (index % 10 === 4) {
        chartData.push({
          value: resultData[index].count,
          fill: "#ffa518",
          name: resultData[index].key,
        });
        data.push({
          value: Math.round((10000 * resultData[index].count) / sum) / 100,
          fill: "#ffa518",
          name: resultData[index].key,
        });
      } else if (index % 10 === 5) {
        chartData.push({
          value: resultData[index].count,
          fill: "#ffff00",
          name: resultData[index].key,
        });
        data.push({
          value: Math.round((10000 * resultData[index].count) / sum) / 100,
          fill: "#ffff00",
          name: resultData[index].key,
        });
      } else if (index % 10 === 6) {
        chartData.push({
          value: resultData[index].count,
          fill: "#717100",
          name: resultData[index].key,
        });
        data.push({
          value: Math.round((10000 * resultData[index].count) / sum) / 100,
          fill: "#717100",
          name: resultData[index].key,
        });
      } else if (index % 10 === 7) {
        chartData.push({
          value: resultData[index].count,
          fill: "#577171",
          name: resultData[index].key,
        });
        data.push({
          value: Math.round((10000 * resultData[index].count) / sum) / 100,
          fill: "#577171",
          name: resultData[index].key,
        });
      } else if (index % 10 === 8) {
        chartData.push({
          value: resultData[index].count,
          fill: "#ff0000",
          name: resultData[index].key,
        });
        data.push({
          value: Math.round((10000 * resultData[index].count) / sum) / 100,
          fill: "#ff0000",
          name: resultData[index].key,
        });
      } else if (index % 10 === 9) {
        chartData.push({
          value: resultData[index].count,
          fill: "#00ffff",
          name: resultData[index].key,
        });
        data.push({
          value: Math.round((10000 * resultData[index].count) / sum) / 100,
          fill: "#00ffff",
          name: resultData[index].key,
        });
      }
    }
    setChartData([...chartData]);
    setData([...data]);
  };
  useEffect(() => {
    memberLevel === 1
      ? viewBar > 0
        ? renderChart === "수입 통계"
          ? axios
              .get(
                `${backServer}/admin/barChart/${barKey}/${buyState}/${typeCategory}`
              )
              .then((res) => {
                result(res.data);
              })
          : axios
              .get(
                `${backServer}/admin/barChartIncome/${barKey}/${buyState}/${typeCategory}`
              )
              .then((res) => {
                result(res.data);
              })
        : renderChart === "수입 통계"
        ? axios
            .get(`${backServer}/admin/productChart/${typeCategory}/${buyState}`)
            .then((res) => {
              setBarData(res.data);
              result(res.data);
              let num = 0;
              res.data.forEach((element) => {
                num += element.count;
              });
              setTotal(num);
            })
        : axios
            .get(
              `${backServer}/admin/productIncomeChart/${typeCategory}/${buyState}`
            )
            .then((res) => {
              setBarData(res.data);
              result(res.data);
              let num = 0;
              res.data.forEach((element) => {
                num += element.count;
              });
              setTotal(num);
            })
      : Swal.fire({
          text: "접근 권한이 없습니다",
          icon: "info",
          iconColor: "#ffa518",
          confirmButtonColor: "#ffa518",
        });
  }, [typeCategory, buyState, renderChart, viewBar]);
  const viewBarData = (e) => {
    setChartData([]);
    setData([]);
    setBarKey(e.key);
    setTotal(e.count);
    setViewBar(viewBar + 1);
  };
  const changeBuyState = (e) => {
    setChartData([]);
    setData([]);
    setBuyState(Number(e.target.value));
    setViewBar(0);
  };
  const changeTypeCategory = (e) => {
    setChartData([]);
    setData([]);
    setTypeCategory(Number(e.target.value));
    setViewBar(0);
  };
  const changeRenderChart = () => {
    setChartData([]);
    setData([]);
    setRenderChart(renderChart === "수입 통계" ? "판매량 통계" : "수입 통계");
    setTotalTitle(totalTitle === "총량:" ? "총 수입:" : "총량:");
    setCost(cost ? "" : "원");
    setViewBar(0);
  };
  return (
    <section>
      {memberLevel === 1 ? (
        <div>
          <div className="admin-title">판매 통계</div>
          <div className="admin-write-wrap">
            <div className="admin-search-wrap" id="chart-margin-right">
              <div className="chart-select-wrap admin-write-right">
                <label htmlFor="buyState"></label>
                <select
                  className="chart-select"
                  id="buyState"
                  value={buyState}
                  onChange={changeBuyState}
                >
                  <option value={1}>결제완료</option>
                  <option value={2}>결제취소</option>
                </select>
                <label htmlFor="typeCategory"></label>
                <select
                  className="chart-select"
                  id="typeCategory"
                  value={typeCategory}
                  onChange={changeTypeCategory}
                >
                  <option value={0}>카테고리</option>
                  <option value={1}>강아지</option>
                  <option value={2}>고양이</option>
                </select>
              </div>
              <div className="inquiry-search">
                <button
                  type="button"
                  id="chart-button"
                  onClick={changeRenderChart}
                >
                  {renderChart}
                </button>
              </div>
            </div>
          </div>
          <div className="chart-flex">
            <div className="chart-top">
              <div className="inquiry-sub-title chart-margin-bottom">
                막대 그래프
              </div>
              <BarChart
                width={400}
                height={400}
                data={barData}
                barGap={10}
                margin={0}
              >
                <CartesianGrid strokeDasharray="10 10" />
                <XAxis dataKey="key" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#ffa518" onClick={viewBarData} />
              </BarChart>
              <div className="chart-reset-button">
                {viewBar > 0 ? (
                  <button
                    className="admin-write-submit"
                    type="button"
                    onClick={() => {
                      setChartData([]);
                      setData([]);
                      setViewBar(0);
                    }}
                  >
                    전체 데이터
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="chart-total">
                <p>{totalTitle}</p>
                <p>{total + cost}</p>
              </div>
            </div>
            <div className="chart-width-fix">
              <div className="inquiry-sub-title">
                {renderChart === "수입 통계" ? "수량/백분율" : "수입/백분율"}
              </div>
              <PieChart width={600} height={600}>
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
              <div className="admin-pet-chart-bottom admin-flex-left">
                {chartData.map((chart, i) => {
                  return (
                    <>
                      {i % 10 === 0 ? (
                        <>
                          <div className="chart-label-one chart-bottom"></div>
                          <div
                            style={{
                              color: "#ffbe58",
                              width: "100px",
                              height: "20px",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            {chart.name}
                          </div>
                        </>
                      ) : i % 10 === 1 ? (
                        <>
                          <div className="chart-label-two chart-bottom"></div>
                          <div
                            style={{
                              color: "#5799ff",
                              width: "100px",
                              height: "20px",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            {chart.name}
                          </div>
                        </>
                      ) : i % 10 === 2 ? (
                        <>
                          <div className="chart-label-three chart-bottom"></div>
                          <div
                            style={{
                              color: "#ffd697",
                              width: "100px",
                              height: "20px",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            {chart.name}
                          </div>
                        </>
                      ) : i % 10 === 3 ? (
                        <>
                          <div className="chart-label-four chart-bottom"></div>
                          <div
                            style={{
                              color: "#717171",
                              width: "100px",
                              height: "20px",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            {chart.name}
                          </div>
                        </>
                      ) : i % 10 === 4 ? (
                        <>
                          <div className="chart-label-four chart-bottom"></div>
                          <div
                            style={{
                              color: "#ffa518",
                              width: "100px",
                              height: "20px",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            {chart.name}
                          </div>
                        </>
                      ) : i % 10 === 5 ? (
                        <>
                          <div className="chart-label-four chart-bottom"></div>
                          <div
                            style={{
                              color: "#ffff00",
                              width: "100px",
                              height: "20px",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            {chart.name}
                          </div>
                        </>
                      ) : i % 10 === 6 ? (
                        <>
                          <div className="chart-label-four chart-bottom"></div>
                          <div
                            style={{
                              color: "#717100",
                              width: "100px",
                              height: "20px",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            {chart.name}
                          </div>
                        </>
                      ) : i % 10 === 7 ? (
                        <>
                          <div className="chart-label-four chart-bottom"></div>
                          <div
                            style={{
                              color: "#577171",
                              width: "100px",
                              height: "20px",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            {chart.name}
                          </div>
                        </>
                      ) : i % 10 === 8 ? (
                        <>
                          <div className="chart-label-four chart-bottom"></div>
                          <div
                            style={{
                              color: "#ff0000",
                              width: "100px",
                              height: "20px",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            {chart.name}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="chart-label-four chart-bottom"></div>
                          <div
                            style={{
                              color: "#00ffff",
                              width: "100px",
                              height: "20px",
                              fontWeight: "bold",
                              textAlign: "center",
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
          </div>
          <div className="admin-button-zone" id="chart-button-bottom">
            <button
              className="admin-write-submit"
              type="button"
              onClick={() => {
                navigate("/admin/main");
              }}
            >
              관리자 페이지
            </button>
          </div>
        </div>
      ) : (
        <Interceptor />
      )}
    </section>
  );
};
export default ProductChart;
