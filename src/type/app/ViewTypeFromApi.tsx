import { type } from "os";

export type OpeningHours = {
  start_hours: string;
  end_hours: string;
  mon: boolean;
  thu: boolean;
  wed: boolean;
  thi: boolean;
  fri: boolean;
  sat: boolean;
  sun: boolean;
  hol: boolean;
  description: string;
};

export type ViewDataIdName = {
  id: string;
  name: string;
};

export type orderPlanParts = {
  origin: string;
  AboutCategory: string;
  parts: string;
};

export type ViewDataIdNameAndTitle = {
  title: string;
  value: ViewDataIdName[];
};

export type ConditionData = {
  title: string;
  value: string;
};

export type LocalConditionData = {
  title: string;
  orderData: string;
  texts: string[];
};

export type PlanResaerch = {
  local: LocalConditionData[];
  parts: ViewDataIdNameAndTitle[];
};

export type OrderPlanIdName = {
  gender: string;
  paySystem: string;
  originParts: ViewDataIdName;
  AboutCategory: ViewDataIdName;
  parts: ViewDataIdName | null;
  skinCollor: string | null;
  hair: string | null;
};

export type SortPlanData = {
  paySystem: string;
};
