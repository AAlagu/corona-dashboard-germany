import axios from "axios";

const covidApi = axios.create({
  baseURL: "https://api.corona-zahlen.org",
});

export const getGermanyCases = (days: number) =>
  covidApi.get(`/germany/history/cases/${days}`).then((res) => res.data);

export const getGermanyRecovered = (days: number) =>
  covidApi.get(`/germany/history/recovered/${days}`).then((res) => res.data);

export const getGermanyDeaths = (days: number) =>
  covidApi.get(`/germany/history/deaths/${days}`).then((res) => res.data);

export const getAllStatesCases = (days: number) =>
  covidApi.get(`/states/history/cases/${days}`).then((res) => res.data);

export const getAllStatesDeaths = (days: number) =>
  covidApi.get(`/states/history/deaths/${days}`).then((res) => res.data);

export const getAllStatesRecovered = (days: number) =>
  covidApi.get(`/states/history/recovered/${days}`).then((res) => res.data);

export const getStatesMapLegend = () =>
  covidApi.get(`/map/states/legend`).then((res) => res.data);
