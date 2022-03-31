import { AboutCategory, ApiBaseParts } from "../api/ApiType";

export type ViewCard = {
  name: string;
  number: number;
};

export type CardName = {
  first: string;
  second: string;
  third: string;
  fourth: string;
  fifth: string;
  sixth: string;
  seventh: string;
};

export type QueryOrderPlan = {
  gender: string | null;
  skinCollor: string | null;
  hair: string | null;
  paySystem: string | null;
  originParts: string | null;
  AboutCategory: string | null;
  parts: string | null;
};

export type HomeFeatureText = {
  img: string;
  text: string;
  description: string;
  path: string;
};

export type OptionText = {
  name: string;
  text: string;
};

export type OptionServiceText = {
  title: string;
  texts: OptionText[];
};

export type OrderPlan = {
  gender: string;
  skinCollor: string;
  hair: string;
  paySystem: string;
  originParts: string;
  AboutCategory: string;
  parts: string | null;
};

export type AboutCategoryByName = {
  face: AboutCategory[];
  limb: AboutCategory[];
  body: AboutCategory[];
  vio: AboutCategory[];
  allBody: AboutCategory[];
  other: AboutCategory[];
};

export type BasePartsByName = {
  upperFace: ApiBaseParts[];
  lowerFace: ApiBaseParts[];
  faceSet: ApiBaseParts[];
  arm: ApiBaseParts[];
  leg: ApiBaseParts[];
  limb: ApiBaseParts[];
  frontBody: ApiBaseParts[];
  backBody: ApiBaseParts[];
  bodySet: ApiBaseParts[];
  vio: ApiBaseParts[];
  vioSet: ApiBaseParts[];
  allBody: ApiBaseParts[];
  select: ApiBaseParts[];
  time: ApiBaseParts[];
  range: ApiBaseParts[];
  upperBody: ApiBaseParts[];
  lowerBody: ApiBaseParts[];
};
