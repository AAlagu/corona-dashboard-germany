import { Select } from "antd";
import { useEffect, useState } from "react";
import StateDetails from "./StateDetails";
import "./styles.css";

const { Option } = Select;

//------------------------------------ props -----------------------------------------
interface props {
  selectedTblState: string;
  onChange: (state: string) => void;
}

//------------------------------------- style ------------------------------------------
const selectionStyle = {
  width: 300,
  fontWeight: "bold",
} as React.CSSProperties;

//--------------------------------- Component ------------------------------------------
const StateSelection: React.FC<props> = ({ selectedTblState, onChange }) => {
  //Intial state
  const [stateName, setStateName] = useState<string>("Schleswig-Holstein");

  useEffect(() => {
    StateDetails.map((item) => {
      if (item.id === selectedTblState) {
        setStateName(item.name);
      }
    });
  }, [selectedTblState]);

  return (
    <Select
      style={selectionStyle}
      value={stateName}
      onChange={(e) => onChange(e)}
    >
      {StateDetails.map((state) => (
        <Option key={state.id} value={state.id} label={state.name}>
          {state.name}
        </Option>
      ))}
    </Select>
  );
};

//--------------------------------- Export ------------------------------------------

export default StateSelection;
