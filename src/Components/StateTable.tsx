import Table from "antd/lib/table";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import * as api from "../CovidApi";
import "./styles.css";
import { Result, Spin, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

//------------------------------------- interface -------------------------------------
interface IStateColumn {
  key: string;
  name: string;
  cases: number;
  deaths: number;
  recovered: number;
  receivedNoOfDays: number;
}

//props
interface props {
  selectedDays: number;
  selectionState: string;
  onChange: (
    selectedTblState: string,
    cases: any,
    deaths: any,
    recovered: any,
    lastFourWkCases: any
  ) => void;
}

//------------------------------------- style -------------------------------------
const highlightStyle = {
  fontWeight: "bold",
  fontSize: "large",
} as React.CSSProperties;

const tableStyle = {
  width: 650,
  cursor: "pointer",
};

const infoStyle = {
  color: "#0088FE",
  fontSize: "small",
} as React.CSSProperties;

//--------------------------------- Component ------------------------------------------
const StateTable: React.FC<props> = ({
  selectedDays,
  selectionState,
  onChange,
}) => {
  const totalDays: number = 28;

  const [stateData, setStateData] = useState<IStateColumn[]>([
    {
      key: "SH",
      name: "Schleswig-Holstein",
      cases: 0,
      deaths: 0,
      recovered: 0,
      receivedNoOfDays: 0,
    },
    {
      key: "HH",
      name: "Hamburg",
      cases: 0,
      deaths: 0,
      recovered: 0,
      receivedNoOfDays: 0,
    },
    {
      key: "NI",
      name: "Niedersachsen",
      cases: 0,
      deaths: 0,
      recovered: 0,
      receivedNoOfDays: 0,
    },
    {
      key: "HB",
      name: "Bremen",
      cases: 0,
      deaths: 0,
      recovered: 0,
      receivedNoOfDays: 0,
    },
    {
      key: "NW",
      name: "Nordrhein-Westfalen",
      cases: 0,
      deaths: 0,
      recovered: 0,
      receivedNoOfDays: 0,
    },
    {
      key: "HE",
      name: "Hessen",
      cases: 0,
      deaths: 0,
      recovered: 0,
      receivedNoOfDays: 0,
    },
    {
      key: "RP",
      name: "Rheinland-Pfalz",
      cases: 0,
      deaths: 0,
      recovered: 0,
      receivedNoOfDays: 0,
    },
    {
      key: "BW",
      name: "Baden-Württemberg",
      cases: 0,
      deaths: 0,
      recovered: 0,
      receivedNoOfDays: 0,
    },
    {
      key: "BY",
      name: "Bayern",
      cases: 0,
      deaths: 0,
      recovered: 0,
      receivedNoOfDays: 0,
    },
    {
      key: "SL",
      name: "Saarland",
      cases: 0,
      deaths: 0,
      recovered: 0,
      receivedNoOfDays: 0,
    },
    {
      key: "BE",
      name: "Berlin",
      cases: 0,
      deaths: 0,
      recovered: 0,
      receivedNoOfDays: 0,
    },
    {
      key: "BB",
      name: "Brandenburg",
      cases: 0,
      deaths: 0,
      recovered: 0,
      receivedNoOfDays: 0,
    },
    {
      key: "MV",
      name: "Mecklenburg-Vorpommern",
      cases: 0,
      deaths: 0,
      recovered: 0,
      receivedNoOfDays: 0,
    },
    {
      key: "SN",
      name: "Sachsen",
      cases: 0,
      deaths: 0,
      recovered: 0,
      receivedNoOfDays: 0,
    },
    {
      key: "ST",
      name: "Sachsen-Anhalt",
      cases: 0,
      deaths: 0,
      recovered: 0,
      receivedNoOfDays: 0,
    },
    {
      key: "TH",
      name: "Thüringen",
      cases: 0,
      deaths: 0,
      recovered: 0,
      receivedNoOfDays: 0,
    },
  ]);

  const {
    isLoading: casesLoading,
    error: casesError,
    data: statesCases,
  } = useQuery(["AllStatesCases"], () => api.getAllStatesCases(totalDays));

  const {
    isLoading: deathsLoading,
    error: deathsError,
    data: statesDeaths,
  } = useQuery(["AllStatesDeaths"], () => api.getAllStatesDeaths(totalDays));

  const {
    isLoading: recoveredLoading,
    error: recoveredError,
    data: statesRecovered,
  } = useQuery(["AllStatesRecovered"], () =>
    api.getAllStatesRecovered(totalDays)
  );

  const totalCases = (
    statekey: string,
    casesHistory: any,
    noOfCases: number
  ) => {
    let totalCases: number = casesHistory
      ?.map((a: any) => a?.cases)
      .reduce(function (a: number, b: number) {
        return a + b;
      });

    const updated = stateData?.map((data) => {
      if (data.key === statekey) {
        data.cases = totalCases;
        data.receivedNoOfDays = noOfCases;
        return data;
      } else {
        return data;
      }
    });

    setStateData(updated);
  };

  const totalDeaths = (
    statekey: string,
    deathsHistory: any,
    noOfDeaths: number
  ) => {
    let totalDeaths: number = deathsHistory
      ?.map((a: any) => a?.deaths)
      .reduce(function (a: number, b: number) {
        return a + b;
      });

    const updated = stateData?.map((data) => {
      if (data.key === statekey) {
        data.deaths = totalDeaths;
        data.receivedNoOfDays = noOfDeaths;
        return data;
      } else {
        return data;
      }
    });

    setStateData(updated);
  };

  const totalRecovered = (
    statekey: string,
    recoveredHistory: any,
    noOfRecovered: number
  ) => {
    let totalRecovered: number = recoveredHistory
      ?.map((a: any) => a?.recovered)
      .reduce(function (a: number, b: number) {
        return a + b;
      });

    const updated = stateData?.map((data) => {
      if (data.key === statekey) {
        data.recovered = totalRecovered;
        data.receivedNoOfDays = noOfRecovered;
        return data;
      } else {
        return data;
      }
    });

    setStateData(updated);
  };

  const selectedDaysHistory = (stateId: string): [any, any, any, any] => {
    let cases: any = [];
    let deaths: any = [];
    let recovered: any = [];
    let lastFourWkCases: any = [];

    for (let i = totalDays - selectedDays; i < totalDays; i++) {
      let casesHistory = statesCases?.data[stateId]?.history[i];
      let deathsHistory = statesDeaths?.data[stateId]?.history[i];
      let recoveredHistory = statesRecovered?.data[stateId]?.history[i];
      if (casesHistory && deathsHistory && recoveredHistory) {
        cases.push(casesHistory);
        deaths.push(deathsHistory);
        recovered.push(recoveredHistory);
      }
    }

    //Last 4 weeks
    for (let i = 0; i < totalDays; i++) {
      let casesHistory = statesCases?.data[stateId]?.history[i];
      if (casesHistory) {
        lastFourWkCases.push(casesHistory);
      }
    }
    return [cases, deaths, recovered, lastFourWkCases];
  };

  //Filter the data depends on selected timeframe
  const selectedData = () => {
    stateData?.map((stateData) => {
      const [cases, deaths, recovered] = selectedDaysHistory(stateData.key);

      totalCases(stateData.key, cases, cases.length);
      totalDeaths(stateData.key, deaths, deaths.length);
      totalRecovered(stateData.key, recovered, recovered.length);
    });
  };

  //Filter the data depends on selected state
  const selectedRow = (state: string) => {
    const [cases, deaths, recovered, lastFourWkCases] =
      selectedDaysHistory(state);

    onChange(state, cases, deaths, recovered, lastFourWkCases);
  };

  useEffect(() => {
    if (statesCases && statesDeaths && statesRecovered) {
      selectedData();
      selectedRow(selectionState);
    }
  }, [
    selectedDays,
    selectionState,
    statesCases,
    statesDeaths,
    statesRecovered,
  ]);

  const columns = [
    {
      title: "State",
      dataIndex: "name",
      key: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      render: (at: any, row: any) => {
        let info: string =
          "Last " +
          (selectedDays - row.receivedNoOfDays) +
          " day/s is not yet available";
        return row.key === selectionState ? (
          <div style={highlightStyle}>
            {row.name}{" "}
            {row.receivedNoOfDays !== selectedDays ? (
              <>
                <Tooltip title={info}>
                  <InfoCircleOutlined style={infoStyle} />
                </Tooltip>
              </>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div>
            {row.name}{" "}
            {row.receivedNoOfDays !== selectedDays ? (
              <>
                <Tooltip title={info}>
                  <InfoCircleOutlined style={infoStyle} />
                </Tooltip>
              </>
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      title: "Cases",
      dataIndex: "cases",
      key: "cases",
      sorter: (a: any, b: any) => a.cases - b.cases,
      render: (at: any, row: any) => {
        return row.key === selectionState ? (
          <div style={highlightStyle}>{row.cases}</div>
        ) : (
          <div>{row.cases} </div>
        );
      },
    },
    {
      title: "Recovered",
      dataIndex: "recovered",
      key: "recovered",
      sorter: (a: any, b: any) => a.recovered - b.recovered,
      render: (at: any, row: any) => {
        return row.key === selectionState ? (
          <div style={highlightStyle}>{row.recovered}</div>
        ) : (
          <div>{row.recovered} </div>
        );
      },
    },
    {
      title: "Deaths",
      dataIndex: "deaths",
      key: "deaths",
      sorter: (a: any, b: any) => a.deaths - b.deaths,
      render: (at: any, row: any) => {
        return row.key === selectionState ? (
          <div style={highlightStyle}>{row.deaths}</div>
        ) : (
          <div>{row.deaths} </div>
        );
      },
    },
  ];

  //For Error status
  if (casesError || deathsError || recoveredError) {
    return (
      <Result
        status="error"
        title="429 Too Many Requests"
        subTitle="You are only allowed to make 15 requests every minute. Retry in 0.597 seconds."
      />
    );
  }

  //For Loading status
  if (casesLoading || deathsLoading || recoveredLoading) {
    return (
      <div className="spinLoading">
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  return (
    <div>
      <Table
        className="stateTable"
        bordered
        pagination={false}
        columns={columns}
        dataSource={stateData}
        style={tableStyle}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "table-row-light" : "table-row-dark"
        }
        onRow={(record, index) => {
          return {
            onClick: () => {
              selectedRow(record.key);
            },
          };
        }}
      />
    </div>
  );
};

//--------------------------------- Export ------------------------------------------

export default StateTable;
