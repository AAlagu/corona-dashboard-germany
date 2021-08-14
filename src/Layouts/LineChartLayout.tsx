import { Legend, LineChart, Line } from "recharts";

//------------------------------------- style -------------------------------------
const layout = {
  width: 220,
  height: 180,
  margin: {
    top: 10,
    left: 30,
    bottom: 30,
    right: 30,
  },
};

//------------------------------------ props -------------------------------------------
interface props {
  LineChartData: any;
  DataKey: string;
  StrokeColor: string;
  LegendTitle: string;
  LegendColor: string;
  BackgroundColor: string;
}

//--------------------------------- Component ------------------------------------------
const LineChartLayout: React.FC<props> = ({
  LineChartData,
  DataKey,
  StrokeColor,
  LegendTitle,
  LegendColor,
  BackgroundColor,
}) => {
  //Calculate total count for cases, deaths and recovered
  const renderLegend = () => {
    let total: number = 0;

    if (DataKey === "cases") {
      total = LineChartData?.map((a: any) => a.cases).reduce(function (
        a: number,
        b: number
      ) {
        return a + b;
      });
    } else if (DataKey === "recovered") {
      total = LineChartData?.map((a: any) => a.recovered).reduce(function (
        a: number,
        b: number
      ) {
        return a + b;
      });
    } else if (DataKey === "deaths") {
      total = LineChartData?.map((a: any) => a.deaths).reduce(function (
        a: number,
        b: number
      ) {
        return a + b;
      });
    }

    //Line Chart's Legend
    return (
      <div style={{ color: LegendColor }}>
        <div style={{ fontSize: "large" }}>{LegendTitle}</div>
        <div style={{ fontSize: "25px", fontWeight: "bold" }}>{total}</div>
      </div>
    );
  };

  return (
    <LineChart
      {...layout}
      data={LineChartData}
      style={{ background: BackgroundColor }}
    >
      <Legend verticalAlign="top" align="center" content={renderLegend} />
      <Line
        type="natural"
        dot={false}
        dataKey={DataKey}
        stroke={StrokeColor}
        strokeWidth={2}
      />
    </LineChart>
  );
};

//--------------------------------- Export ------------------------------------------

export default LineChartLayout;
