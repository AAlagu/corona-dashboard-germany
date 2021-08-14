import { useQuery } from "react-query";
import * as api from "../CovidApi";
import "antd/dist/antd.css";
import LineChartLayout from "../Layouts/LineChartLayout";
import TimeFrameSelection from "./TimeFrameSelection";
import { useState } from "react";
import {
  AutoComplete,
  Col,
  Descriptions,
  Input,
  Layout,
  Menu,
  Result,
  Row,
  Space,
  Spin,
} from "antd";
import StateTable from "./StateTable";
import StateChart from "./StateChart";
import "./styles.css";
import StateSelection from "./StateSelection";
import HeatmapRange from "./HeatmapRange";
import StateDetails from "./StateDetails";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { FaReact } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { GithubFilled } from "@ant-design/icons";

//------------------------------------- style -------------------------------------
const layout = {
  width: 220,
  height: 250,
  //cursor: "pointer",
};

const { Sider, Content, Header, Footer } = Layout;

const { Search } = Input;

//--------------------------------- Component ------------------------------------------
const CountryComponent = () => {
  // const { state }: { state: string } = useParams();
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const totalDays: number = 28;
  const [selectedDays, setSelectedDays] = useState<number>(totalDays);
  const [state, setState] = useState<string>("SH");

  const [germanyCasesData, setGermanyCasesData] = useState<any>();
  const [germanyDeathsData, setGermanyDeathsData] = useState<any>();
  const [germanyRecoveredData, setGermanyRecoveredData] = useState<any>();

  const [stateCasesData, setStateCasesData] = useState<any>();
  const [stateDeathsData, setStateDeathsData] = useState<any>();
  const [stateRecoveredData, setStateRecoveredData] = useState<any>();

  const [chartInterval, setChartInterval] = useState<number>(7);

  const [totalCases, setTotalCases] = useState<number>(0);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const [options, setOptions] = useState([]);

  const {
    isLoading: casesLoading,
    error: casesError,
    data: germanyCases,
  } = useQuery("GermanyCases", () => api.getGermanyCases(totalDays), {
    onSuccess: (germanyCases) => {
      setGermanyCasesData(germanyCases?.data);
      let total: number = germanyCases?.data
        .map((a: any) => a.cases)
        .reduce(function (a: number, b: number) {
          return a + b;
        });
      setTotalCases(total);
      setLastUpdate(new Date(germanyCases?.meta.lastUpdate));
    },
  });

  const {
    isLoading: deathsLoading,
    error: deathsError,
    data: germanyDeaths,
  } = useQuery("GermanyDeaths", () => api.getGermanyDeaths(totalDays), {
    onSuccess: (germanyDeaths) => {
      setGermanyDeathsData(germanyDeaths?.data);
    },
  });

  const {
    isLoading: recoveredLoading,
    error: recoveredError,
    data: germanyRecovered,
  } = useQuery("GermanyRecovered", () => api.getGermanyRecovered(totalDays), {
    onSuccess: (germanyRecovered) => {
      setGermanyRecoveredData(germanyRecovered?.data);
    },
  });

  const onTimeChange = (days: number, interval: number) => {
    setSelectedDays(days);
    setChartInterval(interval);
    let cases: any = [];
    let deaths: any = [];
    let recovered: any = [];
    for (let i = totalDays - days; i < totalDays; i++) {
      cases.push(germanyCases?.data[i]);
      deaths.push(germanyDeaths?.data[i]);
      recovered.push(germanyRecovered?.data[i]);
    }
    setGermanyCasesData(cases);
    setGermanyDeathsData(deaths);
    setGermanyRecoveredData(recovered);
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
    setStateCasesData(cases);
    setStateDeathsData(deaths);
    setStateRecoveredData(recovered);
  };

  /*  useEffect(() => {
    console.log(selectedDays);
    console.log(state);
  }, [selectedDays, state]);*/
  const onSearch = (value: string) => {
    {
      let searchState: any = [];
      StateDetails.map((item) => {
        if (item.name.toUpperCase().indexOf(value.toUpperCase()) >= 0) {
          searchState.push({ value: item.name, label: item.name });
        }
      });
      setOptions(value ? searchState : []);
    }
  };

  const onSelect = (value: string) => {
    StateDetails.map((item) => {
      if (value === item.name) {
        setState(item.id);
      }
    });
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
  //md={18} lg={20} xxl={19}
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider style={{ background: "#8c8c8c" }} collapsed={collapsed}></Sider>
      <Layout>
        <Content
          style={{
            background: "white",
          }}
        >
          <Row>
            <Col sm={24} md={24} xl={19} xxl={12}>
              <Row justify="center" style={{ paddingTop: "50px" }}>
                <label style={{ color: "#8c8c8c", fontSize: "large" }}>
                  Search your state
                </label>
              </Row>
              <Row justify="center" style={{ paddingTop: "20px" }}>
                <AutoComplete
                  options={options}
                  onSearch={onSearch}
                  onSelect={onSelect}
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
                      width: 660,
                      background: "-webkit-linear-gradient(black, white)",
                      height: 50,
                    }}
                  />
                </AutoComplete>
              </Row>
              <Row justify="center" style={{ paddingTop: "60px" }}>
                <Col>
                  <LineChartLayout
                    LineChartData={germanyCasesData}
                    DataKey="cases"
                    StrokeColor="#0088FE"
                    LegendTitle="Total Cases"
                    LegendColor="#0088FE"
                    BackgroundColor="#e6f7ff"
                  />
                </Col>
                <Col>
                  <LineChartLayout
                    LineChartData={germanyRecoveredData}
                    DataKey="recovered"
                    StrokeColor="green"
                    LegendTitle="Total Recovered"
                    LegendColor="green"
                    BackgroundColor="#d9f7be"
                  />
                </Col>
                <Col>
                  <LineChartLayout
                    LineChartData={germanyDeathsData}
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
            <Col sm={25} md={24} xl={21} xxl={10}>
              <Row
                justify="center"
                style={{
                  background: "white",

                  paddingTop: "50px",
                }}
              >
                <Col sm={15} md={19} lg={14} xl={13}>
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
                      {lastUpdate.toLocaleString([], {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </Col>

                <Col sm={25} md={3} lg={3} xl={5}>
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
                      {totalCases}
                    </div>
                  </div>
                </Col>
              </Row>
              <Row
                justify="center"
                style={{ paddingTop: "40px", fontWeight: "bold" }}
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
                {stateCasesData && stateDeathsData && stateRecoveredData && (
                  <StateChart
                    cases={stateCasesData}
                    deaths={stateDeathsData}
                    recovered={stateRecoveredData}
                    interval={chartInterval}
                    days={selectedDays}
                  />
                )}
              </Row>
            </Col>
          </Row>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            background: "white",
            paddingTop: "200px",
            paddingBottom: "200px",
          }}
        >
          <div className="link">
            <a
              style={{
                color: "#8c8c8c",
                fontSize: "25px",
                fontWeight: "bold",
              }}
              href="https://github.com/AAlagu"
              target="_blank"
            >
              CovidGermany
            </a>
          </div>
          <div style={{ paddingTop: "30px" }}>
            <Space size="middle">
              <a href="https://reactjs.org/" target="_blank">
                <FaReact size="30px" color="#096dd9" />
              </a>
              <a href="https://github.com/AAlagu" target="_blank">
                <GithubFilled style={{ fontSize: "35px" }} />
              </a>
              <a href="https://www.typescriptlang.org/" target="_blank">
                <SiTypescript size="30px" color="#096dd9" />
              </a>
            </Space>
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
};

//--------------------------------- Export ------------------------------------------

export default CountryComponent;
// {state && <StateChart state={state} />}
//<StateTable selectedDays={days} />

/*  <StateTable selectedDays={selectedDays} onStateChange={stateChange} />
      <StateChart
        cases={stateCasesData}
        deaths={stateDeathsData}
        recovered={stateRecoveredData}
        interval={chartInterval}
      />*/
