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

  const btnClick = (btn_Name: any): any => {
    const btn = document.querySelector<HTMLElement>(btn_Name)!;
    if (btn) {
      btn.style.background = "#8c8c8c";
      btn.style.borderColor = "#8c8c8c";
      btn.style.color = "white";
    }
  };

  const btnUnClick = (btn_Name: any) => {
    const btn = document.querySelector<HTMLElement>(btn_Name)!;
    if (btn) {
      btn.style.background = "#d9d9d9";
      btn.style.borderColor = "#d9d9d9";
      btn.style.color = "black";
    }
  };

  const oneWeek = () => {
    setDaysAndInterval(week, 1);
    btnClick(".one");
    btnUnClick(".two");
    btnUnClick(".three");
    btnUnClick(".four");
  };

  const twoWeeks = () => {
    setDaysAndInterval(2 * week, 3);
    btnClick(".two");
    btnUnClick(".one");
    btnUnClick(".three");
    btnUnClick(".four");
  };

  const threeWeeks = () => {
    setDaysAndInterval(3 * week, 5);
    btnClick(".three");
    btnUnClick(".one");
    btnUnClick(".two");
    btnUnClick(".four");
  };

  const fourWeeks = () => {
    setDaysAndInterval(4 * week, 7);
    btnClick(".four");
    btnUnClick(".one");
    btnUnClick(".two");
    btnUnClick(".three");
  };

  return (
    <div>
      <Space size="middle">
        <Button className="one" type="primary" onClick={oneWeek}>
          1 week
        </Button>

        <Button className="two" type="primary" onClick={twoWeeks}>
          2 weeks
        </Button>

        <Button className="three" type="primary" onClick={threeWeeks}>
          3 weeks
        </Button>

        <Button className="four" type="primary" onClick={fourWeeks}>
          4 weeks
        </Button>
      </Space>
    </div>
  );
};

//--------------------------------- Export ------------------------------------------

export default TimeFrameSelection;
