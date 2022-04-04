import { Price } from "../Price";
import { IdAndNameDto } from "./IdAndNameDto";

export type IncludePartsAndCategoryPriceDto = {
  originCategory: IdAndNameDto;
  aboutCategory: IdAndNameDto;
  baseParts: IdAndNameDto;
  prices: Price[];
};
