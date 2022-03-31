export type AboutCategory = {
  id: string;
  name: string;
  set: boolean;
  originId: string;
  imgUrlMen: string;
  imgUrlLady: string;
  tableName: string;
  origin?: string;
  baseParts?: ApiParts[];
};

export type ApiParts = {
  id: string;
  name: string;
  places: number;
};

export type ApiBaseParts = {
  id: string;
  name: string;
  description: string;
  aboutCategoryId: string;
};

export type OriginCategory = {
  id: string;
  name: string;
  imgUrlMen: string;
  imgUrlLady: string;
  aboutCategory?: AboutCategory[];
};

export type PartsIdNameDto = {
  id: string;
  name: string;
};

export type IdAndNameDto = {
  id: string;
  name: string;
};

export type ApiOrderPlan = {
  gender: string;
  skinCollor: string;
  hair: string;
  paySystem: string;
  originCategoryId: string;
  aboutCategoryId: string;
  partsId: string | null;
};

export type ApiIncludePartsAndCategoryPriceDto = {
  originCategory: PartsIdNameDto;
  aboutCategory: PartsIdNameDto;
  baseParts: PartsIdNameDto;
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
  parts: ApiParts;
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

export type ApiCliniArea = {
  id: string;
  area: string;
};

export type ApiClinicGroup = {
  id: string;
  exampleClinic: string;
  groupName: string;
};

////
