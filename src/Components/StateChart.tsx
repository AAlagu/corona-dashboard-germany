import React, { useEffect, useState } from "react";
import { Row } from "antd";
import { Bar, BarChart, Cell, Legend, XAxis, YAxis } from "recharts";

//------------------------------------- style -------------------------------------
const legendCountStyle = {
  fontWeight: "bold",
  fontSize: "large",
} as React.CSSProperties;

const legendPrevCountStyle = {
  position: "relative",
  left: 5,
  fontWeight: "bold",
  fontSize: "small",
} as React.CSSProperties;

const legendTextStyle = {
  fontStyle: "oblique",
};

const legendLayout = {
  verticalAlign: "top",
  align: "left",
};
//------------------------------------- interface -------------------------------------
interface props {
  cases: any;
  deaths: any;
  recovered: any;
  interval: number;
  days: number;
}

interface ILegend {
  date: string;
  count: number;
  prevCount: number;
}

//--------------------------------- Component ------------------------------------------
const StateChart: React.FC<props> = ({
  cases,
  deaths,
  recovered,
  interval,
  days,
}) => {
  //Chart properties
  const barChartWidth: number = 500;
  const barChartHeight: number = 200;
  const barChartMargin = {
    top: 5,
    left: 30,
    bottom: 5,
  };
  const barSize: number = 5;
  const xAxisDatakey: string = "date";
  const casesBarColor: string = "#69c0ff";
  const recoveredBarColor: string = "#95de64";
  const deathsBarColor: string = "#ff7875";

  const yesterdayIndex: number = days - 1;
  const [activeBarDate, setActiveBarDate] = useState<Date>(new Date());

  const formatDate = (inputString: any): any => {
    let date = new Date(inputString);
    let day = date.getDate();
    let month = date.toLocaleString("default", { month: "short" });
    return month + " " + day;
  };

  //Initial Bar Charts Legend
  const [casesLegend, setCasesLegend] = useState<ILegend>({
    date: "",
    count: 0,
    prevCount: 0,
  });
  const [deathsLegend, setDeathsLegend] = useState<ILegend>({
    date: "",
    count: 0,
    prevCount: 0,
  });
  const [recoveredLegend, setRecoveredLegend] = useState<ILegend>({
    date: "",
    count: 0,
    prevCount: 0,
  });

  const yesterdayData = () => {
    let casesContent: ILegend = {
      date: formatDate(cases[yesterdayIndex]?.date),
      count: cases[yesterdayIndex]?.cases,
      prevCount:
        cases[yesterdayIndex]?.cases - cases[yesterdayIndex - 1]?.cases,
    };
    let deathsContent: ILegend = {
      date: formatDate(deaths[yesterdayIndex]?.date),
      count: deaths[yesterdayIndex]?.deaths,
      prevCount:
        deaths[yesterdayIndex]?.deaths - deaths[yesterdayIndex - 1]?.deaths,
    };
    let recoveredContent: ILegend = {
      date: formatDate(recovered[yesterdayIndex]?.date),
      count: recovered[yesterdayIndex]?.recovered,
      prevCount:
        recovered[yesterdayIndex]?.recovered -
        recovered[yesterdayIndex - 1]?.recovered,
    };
    setCasesLegend(casesContent);
    setDeathsLegend(deathsContent);
    setRecoveredLegend(recoveredContent);
  };

  useEffect(() => {
    yesterdayData();
  }, [cases, deaths, recovered]);

  const barChartMouseLeaveEvent = (event: any) => {
    yesterdayData();
    setActiveBarDate(new Date());
  };

  const barMouseMoveEvent = (event: any) => {
    let date = new Date(event.date);
    setActiveBarDate(date);
    let dateFormat = formatDate(event.date);

    let casesCount: number = 0;
    let deathsCount: number = 0;
    let recoveredCount: number = 0;
    let prevCases: number = 0;
    let prevDeaths: number = 0;
    let prevRecovered: number = 0;

    cases?.map((a: any) => {
      let d2 = new Date(a.date);
      if (date.getTime() === d2.getTime()) {
        casesCount = a.cases;
      }
      if (date.getTime() - 24 * 60 * 60 * 1000 === d2.getTime()) {
        prevCases = a.cases;
      }
    });

    deaths?.map((a: any) => {
      let d2 = new Date(a.date);
      if (date.getTime() === d2.getTime()) {
        deathsCount = a.deaths;
      }
      if (date.getTime() - 24 * 60 * 60 * 1000 === d2.getTime()) {
        prevDeaths = a.deaths;
      }
    });

    recovered?.map((a: any) => {
      let d2 = new Date(a.date);
      if (date.getTime() === d2.getTime()) {
        recoveredCount = a.recovered;
      }
      if (date.getTime() - 24 * 60 * 60 * 1000 === d2.getTime()) {
        prevRecovered = a.recovered;
      }
    });

    let casesContent: ILegend = {
      date: dateFormat,
      count: casesCount,
      prevCount: casesCount - prevCases,
    };
    let deathsContent: ILegend = {
      date: dateFormat,
      count: deathsCount,
      prevCount: deathsCount - prevDeaths,
    };
    let recoveredContent: ILegend = {
      date: dateFormat,
      count: recoveredCount,
      prevCount: recoveredCount - prevRecovered,
    };

    setCasesLegend(casesContent);
    setDeathsLegend(deathsContent);
    setRecoveredLegend(recoveredContent);
  };

  const renderCasesLegend = () => {
    return (
      <div style={{ color: "#0088FE" }}>
        <div style={legendTextStyle}>Cases</div>
        <div style={legendTextStyle}>{casesLegend?.date}</div>
        <div style={{ position: "relative" }}>
          <span style={legendCountStyle}>{casesLegend?.count}</span>
          <span style={legendPrevCountStyle}>
            {casesLegend?.prevCount > 0
              ? "+" + casesLegend?.prevCount
              : casesLegend?.prevCount}
          </span>
        </div>
      </div>
    );
  };

  const renderDeathsLegend = () => {
    return (
      <div style={{ color: "red" }}>
        <div style={legendTextStyle}>Deaths</div>
        <div style={legendTextStyle}>{deathsLegend?.date}</div>
        <div style={{ position: "relative" }}>
          <span style={legendCountStyle}>{deathsLegend?.count}</span>
          <span style={legendPrevCountStyle}>
            {deathsLegend?.prevCount > 0
              ? "+" + deathsLegend?.prevCount
              : deathsLegend?.prevCount}
          </span>
        </div>
      </div>
    );
  };

  const renderRecoveredLegend = () => {
    return (
      <div style={{ color: "green" }}>
        <div style={legendTextStyle}>Recovered</div>
        <div style={legendTextStyle}>{recoveredLegend?.date}</div>
        <div style={{ position: "relative" }}>
          <span style={legendCountStyle}>{recoveredLegend?.count}</span>
          <span style={legendPrevCountStyle}>
            {recoveredLegend?.prevCount > 0
              ? "+" + recoveredLegend?.prevCount
              : recoveredLegend?.prevCount}
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      <Row>
        <div style={{ background: "#e6f7ff" }}>
          <BarChart
            width={barChartWidth}
            height={barChartHeight}
            data={cases}
            margin={barChartMargin}
            onMouseLeave={barChartMouseLeaveEvent}
          >
            <XAxis
              dataKey={xAxisDatakey}
              tickFormatter={formatDate}
              interval={interval}
              stroke={casesBarColor}
            />
            <YAxis dataKey="cases" orientation="right" stroke={casesBarColor} />

            <Legend
              verticalAlign="top"
              align="left"
              content={renderCasesLegend}
            />

            <Bar
              dataKey="cases"
              fill={casesBarColor}
              barSize={barSize}
              onMouseMove={barMouseMoveEvent}
            >
              {cases.map((item: any) => (
                <Cell
                  cursor="pointer"
                  fill={
                    new Date(item.date).getTime() === activeBarDate.getTime()
                      ? "#0088FE"
                      : casesBarColor
                  }
                  key={`cell-${item.date}`}
                />
              ))}
            </Bar>
          </BarChart>
        </div>
      </Row>
      <Row style={{ paddingTop: "50px" }}>
        <div style={{ background: "#d9f7be" }}>
          <BarChart
            width={barChartWidth}
            height={barChartHeight}
            data={recovered}
            margin={barChartMargin}
            onMouseLeave={barChartMouseLeaveEvent}
          >
            <XAxis
              dataKey={xAxisDatakey}
              tickFormatter={formatDate}
              interval={interval}
              stroke={recoveredBarColor}
            />
            <YAxis
              dataKey="recovered"
              orientation="right"
              stroke={recoveredBarColor}
            />
            <Legend
              verticalAlign="top"
              align="left"
              content={renderRecoveredLegend}
            />
            <Bar
              dataKey="recovered"
              fill={recoveredBarColor}
              barSize={barSize}
              onMouseMove={barMouseMoveEvent}
            >
              {recovered.map((item: any) => (
                <Cell
                  cursor="pointer"
                  fill={
                    new Date(item.date).getTime() === activeBarDate.getTime()
                      ? "green"
                      : recoveredBarColor
                  }
                  key={`cell-${item.date}`}
                />
              ))}
            </Bar>
          </BarChart>
        </div>
      </Row>
      <Row style={{ paddingTop: "50px" }}>
        <div style={{ background: "#ffccc7" }}>
          <BarChart
            width={barChartWidth}
            height={barChartHeight}
            data={deaths}
            margin={barChartMargin}
            onMouseLeave={barChartMouseLeaveEvent}
          >
            <XAxis
              dataKey={xAxisDatakey}
              tickFormatter={formatDate}
              interval={interval}
              stroke={deathsBarColor}
            />
            <YAxis
              dataKey="deaths"
              orientation="right"
              stroke={deathsBarColor}
            />
            <Legend
              verticalAlign="top"
              align="left"
              content={renderDeathsLegend}
            />
            <Bar
              dataKey="deaths"
              fill={deathsBarColor}
              barSize={barSize}
              onMouseMove={barMouseMoveEvent}
            >
              {deaths.map((item: any) => (
                <Cell
                  cursor="pointer"
                  fill={
                    new Date(item.date).getTime() === activeBarDate.getTime()
                      ? "red"
                      : deathsBarColor
                  }
                  key={`cell-${item.date}`}
                />
              ))}
            </Bar>
          </BarChart>
        </div>
      </Row>
    </>
  );
};

//--------------------------------- Export ------------------------------------------

export default StateChart;
