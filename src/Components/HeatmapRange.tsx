import { useQuery } from "react-query";
import * as api from "../CovidApi";
import "./styles.css";

//--------------------------------- Component ------------------------------------------
const HeatmapRange = () => {
  const {
    isLoading: mapLoading,
    error: mapError,
    data: statesMap,
  } = useQuery("StatesMap", () => api.getStatesMapLegend());

  return (
    <ul className="heatMapLegend">
      {statesMap?.incidentRanges?.map((item: any, index: number) =>
        item?.max ? (
          <li key={index}>
            <span style={{ backgroundColor: item?.color }} />
            {item?.min} - {item?.max}
          </li>
        ) : (
          <li key={index}>
            <span style={{ backgroundColor: item?.color }} />≥{item?.min}
          </li>
        )
      )}
    </ul>
  );
};

//--------------------------------- Export ------------------------------------------

export default HeatmapRange;
