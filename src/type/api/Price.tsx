import { Clinic } from "./Clinic";
import { Parts } from "./Parts";

export type Price = {
  id: string;
  name: string;
  gender: number;
  times: number;
  price: number;
  oncePrice: number;
  description: string;
  partsId: string;
  clinicId: string;
  parts?: Parts;
  clinic?: Clinic;
};
