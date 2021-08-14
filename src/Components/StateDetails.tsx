//------------------------------------- interface -------------------------------------
interface IState {
  id: string;
  name: string;
}

const StateDetails: IState[] = [
  { id: "SH", name: "Schleswig-Holstein" },
  { id: "HH", name: "Hamburg" },
  { id: "NI", name: "Niedersachsen" },
  { id: "HB", name: "Bremen" },
  { id: "NW", name: "Nordrhein-Westfalen" },
  { id: "HE", name: "Hessen" },
  { id: "RP", name: "Rheinland-Pfalz" },
  { id: "BW", name: "Baden-Württemberg" },
  { id: "BY", name: "Bayern" },
  { id: "SL", name: "Saarland" },
  { id: "BE", name: "Berlin" },
  { id: "BB", name: "Brandenburg" },
  { id: "MV", name: "Mecklenburg-Vorpommern" },
  { id: "SN", name: "Sachsen" },
  { id: "ST", name: "Sachsen-Anhalt" },
  { id: "TH", name: "Thüringen" },
];

//--------------------------------- Export ------------------------------------------

export default StateDetails;
