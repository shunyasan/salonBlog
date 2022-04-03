import { Price } from "../Price";
import { IdAndNameDto } from "./IdAndNameDto";

export type ApiIncludePartsAndCategoryPriceDto = {
  originCategory: IdAndNameDto;
  aboutCategory: IdAndNameDto;
  baseParts: IdAndNameDto;
  prices: Price[];
};
