import { useQuery } from "react-query";
import * as api from "../CovidApi";
import "antd/dist/antd.css";
import LineChartLayout from "../Layouts/LineChartLayout";
import TimeFrameSelection from "./TimeFrameSelection";
import { useEffect, useState } from "react";
import { AutoComplete, Col, Input, Result, Row, Space, Spin } from "antd";
import StateTable from "./StateTable";
import StateChart from "./StateChart";
import "./styles.css";
import StateSelection from "./StateSelection";
import HeatmapRange from "./HeatmapRange";
import StateDetails from "./StateDetails";
import { FaGithub, FaLinkedinIn, FaXing } from "react-icons/fa";

//------------------------------------- style -------------------------------------
const layout = {
  width: 220,
  height: 250,
};

const leftCol = {
  sm: 24,
  md: 24,
  xl: 13,
  xxl: 12,
};

const rightCol = {
  xs: 20,
  sm: 20,
  md: 24,
  xl: 10,
  xxl: 10,
};

const { Search } = Input;

//--------------------------------- Component ------------------------------------------
const CountryComponent = () => {
  const totalDays: number = 28;
  const [selectedDays, setSelectedDays] = useState<number>(totalDays);
  const [state, setState] = useState<string>("BW");

  const [lineChartCases, setLineChartCases] = useState<any>();
  const [lineChartDeaths, setLineChartDeaths] = useState<any>();
  const [lineChartRecovered, setLineChartRecovered] = useState<any>();

  const [stateCases, setStateCases] = useState<any>();
  const [stateDeaths, setStateDeaths] = useState<any>();
  const [stateRecovered, setStateRecovered] = useState<any>();

  const [chartInterval, setChartInterval] = useState<number>(7);

  const [germanyTotalCases, setGermanyTotalCases] = useState<number>(0);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);
  const [toggleCountryToStateLineChart, setToggleCountryToStateLineChart] =
    useState<boolean>(false);

  const {
    isLoading: casesLoading,
    error: casesError,
    data: germanyCases,
  } = useQuery("GermanyCases", () => api.getGermanyCases(totalDays), {
    onSuccess: (germanyCases) => {
      setLineChartCases(germanyCases?.data);
      let total: number = germanyCases?.data
        .map((a: any) => a?.cases)
        .reduce(function (a: number, b: number) {
          return a + b;
        });
      setGermanyTotalCases(total);
      setLastUpdate(new Date(germanyCases?.meta?.lastUpdate));
    },
  });

  const {
    isLoading: deathsLoading,
    error: deathsError,
    data: germanyDeaths,
  } = useQuery("GermanyDeaths", () => api.getGermanyDeaths(totalDays), {
    onSuccess: (germanyDeaths) => {
      setLineChartDeaths(germanyDeaths?.data);
    },
  });

  const {
    isLoading: recoveredLoading,
    error: recoveredError,
    data: germanyRecovered,
  } = useQuery("GermanyRecovered", () => api.getGermanyRecovered(totalDays), {
    onSuccess: (germanyRecovered) => {
      setLineChartRecovered(germanyRecovered?.data);
    },
  });

  const timeChangeCalculation = (days: number) => {
    let cases: any = [];
    let deaths: any = [];
    let recovered: any = [];
    for (let i = totalDays - days; i < totalDays; i++) {
      cases.push(germanyCases?.data[i]);
      deaths.push(germanyDeaths?.data[i]);
      recovered.push(germanyRecovered?.data[i]);
    }
    setLineChartCases(cases);
    setLineChartDeaths(deaths);
    setLineChartRecovered(recovered);
  };

  const onTimeChange = (days: number, interval: number) => {
    setSelectedDays(days);
    setChartInterval(interval);
    timeChangeCalculation(days);
  };

  const onStateSelectionChange = (state: string) => {
    setState(state);
  };

  const onStateTableChange = (
    state: string,
    cases: any,
    deaths: any,
    recovered: any
  ) => {
    setState(state);
    setStateCases(cases);
    setStateDeaths(deaths);
    setStateRecovered(recovered);
  };

  useEffect(() => {
    if (toggleCountryToStateLineChart) {
      setLineChartCases(stateCases);
      setLineChartDeaths(stateDeaths);
      setLineChartRecovered(stateRecovered);
    }
  }, [stateCases, stateDeaths, stateRecovered]);

  const onSearch = (value: string) => {
    {
      let searchState: any = [];
      StateDetails.map((item) => {
        if (item.name.toUpperCase().indexOf(value.toUpperCase()) >= 0) {
          searchState.push({ value: item.name, label: item.name });
        }
      });
      setAutoCompleteOptions(value ? searchState : []);
    }
  };

  const onSearchBarSelect = (value: string) => {
    StateDetails.map((item) => {
      if (value === item.name) {
        setState(item.id);
      }
    });
    setToggleCountryToStateLineChart(true);
  };

  const onSearchBarChange = (value: string) => {
    if (value === "") {
      setToggleCountryToStateLineChart(false);
    }
    timeChangeCalculation(selectedDays);
  };

  if (casesError || deathsError || recoveredError) {
    return (
      <Result
        status="error"
        title="429 Too Many Requests"
        subTitle="You are only allowed to make 15 requests every minute. Retry in 0.597 seconds."
      />
    );
  }

  if (casesLoading || deathsLoading || recoveredLoading) {
    return (
      <div className="spinLoading">
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  return (
    <Row>
      <Row>
        <Col {...leftCol}>
          <Row justify="center" style={{ paddingTop: "50px" }}>
            <label style={{ color: "#8c8c8c", fontSize: "large" }}>
              Search your state
            </label>
          </Row>
          <Row justify="center" style={{ paddingTop: "20px" }}>
            <AutoComplete
              options={autoCompleteOptions}
              onSearch={onSearch}
              onSelect={onSearchBarSelect}
              onChange={onSearchBarChange}
              style={{
                height: 80,
              }}
            >
              <Search
                className="search"
                placeholder="Baden-Württemberg"
                allowClear
                size="large"
                style={{
                  width: 450,
                  background: "-webkit-linear-gradient(black, white)",
                  height: 50,
                }}
              />
            </AutoComplete>
          </Row>
          <Row justify="center" style={{ paddingTop: "60px" }}>
            <Col>
              <LineChartLayout
                LineChartData={lineChartCases}
                DataKey="cases"
                StrokeColor="#0088FE"
                LegendTitle="Total Cases"
                LegendColor="#0088FE"
                BackgroundColor="#e6f7ff"
              />
            </Col>
            <Col>
              <LineChartLayout
                LineChartData={lineChartRecovered}
                DataKey="recovered"
                StrokeColor="green"
                LegendTitle="Total Recovered"
                LegendColor="green"
                BackgroundColor="#d9f7be"
              />
            </Col>
            <Col>
              <LineChartLayout
                LineChartData={lineChartDeaths}
                DataKey="deaths"
                StrokeColor="red"
                LegendTitle="Total Deaths"
                LegendColor="red"
                BackgroundColor="#fff1f0"
              />
            </Col>
          </Row>
          <Row justify="space-around" style={{ paddingTop: "120px" }}>
            <TimeFrameSelection onChange={onTimeChange} />
          </Row>
          <Row justify="center" style={{ paddingTop: "40px" }}>
            <StateTable
              selectedDays={selectedDays}
              selectionState={state}
              onChange={onStateTableChange}
            />
          </Row>
        </Col>
        <Col {...rightCol}>
          <Row
            justify="center"
            style={{
              background: "white",
              paddingTop: "50px",
            }}
          >
            <Col xs={20} sm={21} md={17} lg={13} xl={17}>
              <div>
                <div
                  style={{
                    height: "40px",
                    width: "80px",
                    background:
                      "-webkit-linear-gradient(#000000 , #ff0000, #ffff00 )",
                    color: "white",
                    textAlign: "center",
                    verticalAlign: "middle",
                    lineHeight: "40px",
                    fontWeight: "bold",
                    fontSize: "large",
                    position: "relative",
                  }}
                >
                  Germany
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    color: "#8c8c8c",
                  }}
                >
                  Last updated on{" "}
                  {lastUpdate?.toLocaleString([], {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </Col>

            <Col xs={25} sm={26} md={3} lg={3} xl={30}>
              <div
                style={{
                  color: "#0088FE",
                  position: "absolute",
                  width: "100px",
                  textAlign: "right",
                }}
              >
                <div
                  style={{
                    fontSize: "18px",
                  }}
                >
                  Cases
                </div>
                <div
                  style={{
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  {germanyTotalCases}
                </div>
              </div>
            </Col>
          </Row>
          <Row
            justify="center"
            style={{ paddingTop: "40px", fontWeight: "bold", fontSize: "18px" }}
          >
            Week Incidence
          </Row>
          <Row justify="end" style={{ paddingRight: "150px" }}>
            <img
              src="https://api.corona-zahlen.org/map/states"
              style={{ width: "80%" }}
            />
          </Row>
          <Row justify="start">
            <HeatmapRange />
          </Row>
          <Row justify="center" style={{ paddingBottom: "50px" }}>
            <StateSelection
              selectedTblState={state}
              onChange={onStateSelectionChange}
            />
          </Row>
          <Row justify="center">
            {stateCases && stateDeaths && stateRecovered && (
              <StateChart
                cases={stateCases}
                deaths={stateDeaths}
                recovered={stateRecovered}
                interval={chartInterval}
              />
            )}
          </Row>
        </Col>
      </Row>

      <Row
        justify="center"
        style={{
          paddingTop: "100px",
          paddingBottom: "100px",
          width: "100%",
        }}
      >
        <Row justify="center" style={{ width: "100%" }}>
          <div className="link">
            <a
              style={{
                color: "#8c8c8c",
                fontSize: "25px",
                fontWeight: "bold",
              }}
              href="https://github.com/AAlagu/corona-dashboard-germany"
              target="_blank"
            >
              CovidGermany
            </a>
          </div>
        </Row>
        <Row justify="center" style={{ width: "100%" }}>
          <div style={{ paddingTop: "30px" }}>
            <Space size="middle">
              <a
                href="https://www.linkedin.com/in/alaguvelammal-alagusubbiah/"
                target="_blank"
              >
                <FaLinkedinIn size="30px" color="#096dd9" />
              </a>
              <a href="https://github.com/AAlagu" target="_blank">
                <FaGithub size="30px" color="black" />
              </a>
              <a
                href="https://www.xing.com/profile/Alaguvelammal_Alagusubbiah"
                target="_blank"
              >
                <FaXing size="30px" color="#00474f" />
              </a>
            </Space>
          </div>
        </Row>
      </Row>
    </Row>
  );
};

//--------------------------------- Export ------------------------------------------

export default CountryComponent;
