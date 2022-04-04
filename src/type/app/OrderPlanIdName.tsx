import { IdAndNameDto } from "../api/dto/IdAndNameDto";

export type OrderPlanIdName = {
  gender: string;
  paySystem: string;
  originParts: IdAndNameDto;
  AboutCategory: IdAndNameDto;
  parts: IdAndNameDto | null;
  skinCollor: string | null;
  hair: string | null;
};
