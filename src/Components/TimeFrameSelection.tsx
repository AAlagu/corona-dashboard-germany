import { Button, Space } from "antd";
import React from "react";
import "antd/dist/antd.css";
import "./styles.css";

//------------------------------------ props ------------------------------------------
interface props {
  onChange: (days: number, interval: number) => void;
}

//--------------------------------- Component ------------------------------------------
const TimeFrameSelection: React.FC<props> = ({ onChange }) => {
  const week: number = 7;

  const setDaysAndInterval = (
    selectedDays: number,
    selectedInterval: number
  ) => {
    onChange(selectedDays, selectedInterval);
  };

  const oneWeek = () => {
    setDaysAndInterval(week, 1);
  };

  const twoWeeks = () => {
    setDaysAndInterval(2 * week, 3);
  };

  const threeWeeks = () => {
    setDaysAndInterval(3 * week, 5);
  };

  const fourWeeks = () => {
    setDaysAndInterval(4 * week, 7);
  };
  return (
    <div>
      <Space size="middle">
        <Button type="primary" onClick={oneWeek}>
          1 week
        </Button>

        <Button type="primary" onClick={twoWeeks}>
          2 weeks
        </Button>

        <Button type="primary" onClick={threeWeeks}>
          3 weeks
        </Button>

        <Button type="primary" onClick={fourWeeks} autoFocus>
          4 weeks
        </Button>
      </Space>
    </div>
  );
};

//--------------------------------- Export ------------------------------------------

export default TimeFrameSelection;
