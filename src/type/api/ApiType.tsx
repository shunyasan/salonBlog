import { IdAndNameDto } from "./dto/IdAndNameDto";
import { Parts } from "./Parts";

export type ApiIncludePartsAndCategoryPriceDto = {
  originCategory: IdAndNameDto;
  aboutCategory: IdAndNameDto;
  baseParts: IdAndNameDto;
  prices: ApiPrice[];
};

export type ApiPrice = {
  id: string;
  name: string;
  gender: number;
  times: number;
  price: number;
  oncePrice: number;
  description: string;
  clinicId: string;
  clinic: ApiClinic;
  partsId: string;
  parts: Parts;
};

export type ApiOnlyPrice = {
  id: string;
  name: string;
  gender: number;
  times: number;
  price: number;
  oncePrice: number;
  description: string;
};

export type ApiClinic = {
  id: string;
  interior: string;
  address: string;
  cardPay: string;
  medhicalLoan: string;
  name: string;
  nearestStation: string;
  reserve: string;
  review: number;
  roomType: string;
  staffGender: number;
  tax: string;
  tel: string;
  url: string;
  areaId: string;
  clinicOption: ApiClinicOption;
  clinicOpeningHours: ApiClinicOpeningHours[];
};

export type ClinicNestPrice = {
  id: string;
  interior: string;
  address: string;
  cardPay: string;
  medhicalLoan: string;
  name: string;
  nearestStation: string;
  reserve: string;
  review: number;
  roomType: string;
  staffGender: number;
  tax: string;
  tel: string;
  url: string;
  areaId: string;
  clinicOption: ApiClinicOption;
  clinicOpeningHours: ApiClinicOpeningHours[];
  onlyPrices: ApiOnlyPrice[];
};

export type ApiClinicOption = {
  id: string;
  irradiationLeakage: string;
  aftercare: string;
  anesthesia: string;
  campaign: string;
  contractCancellation: string;
  firstVisitFees: string;
  subsequentVisitFees: string;
  shaving: string;
  studentDiscount: string;
  troubleTreatment: string;
};

export type ApiClinicOpeningHours = {
  id: string;
  startHours: string;
  endHours: string;
  description: string;
  mon: boolean;
  thu: boolean;
  wed: boolean;
  thir: boolean;
  fri: boolean;
  sat: boolean;
  sun: boolean;
  hol: boolean;
  clinicId: string;
};

export type ApiMachine = {
  id: string;
  machineName: string;
  machineHrId: string;
  machineShrId: string;
};

export type ApiClinicArea = {
  id: string;
  area: string;
  description: string;
  registrationNumber: number;
};

export type ApiClinicGroup = {
  id: string;
  exampleClinic: string;
  groupName: string;
};

export type PagenationParameter = {
  take: number;
  skip: number;
};

////
