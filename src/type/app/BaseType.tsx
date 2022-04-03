import { AboutCategory } from "../api/AboutCategory";
import { BaseParts } from "../api/BaseParts";

export type ViewCard = {
  name: string;
  number: number;
};

export type QueryOrderPlan = {
  gender: string | null;
  paySystem: string | null;
  originParts: string | null;
  AboutCategory: string | null;
  parts: string | null;
  skinCollor: string | null;
  hair: string | null;
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
  paySystem: string;
  originParts: string;
  AboutCategory: string;
  parts: string | null;
  skinCollor: string | null;
  hair: string | null;
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
  upperFace: BaseParts[];
  lowerFace: BaseParts[];
  faceSet: BaseParts[];
  arm: BaseParts[];
  leg: BaseParts[];
  limb: BaseParts[];
  frontBody: BaseParts[];
  backBody: BaseParts[];
  bodySet: BaseParts[];
  vio: BaseParts[];
  vioSet: BaseParts[];
  allBody: BaseParts[];
  select: BaseParts[];
  time: BaseParts[];
  range: BaseParts[];
  upperBody: BaseParts[];
  lowerBody: BaseParts[];
};
