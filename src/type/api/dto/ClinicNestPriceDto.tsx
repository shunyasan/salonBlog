import { ClinicOpeningHours } from "../ClinicOpeningHours";
import { ClinicOption } from "../ClinicOption";
import { PriceDto } from "./PriceDto";

export type ClinicNestPriceDto = {
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
  clinicOption: ClinicOption;
  clinicOpeningHours: ClinicOpeningHours[];
  prices: PriceDto[];
};
