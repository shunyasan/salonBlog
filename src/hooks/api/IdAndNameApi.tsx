import axios from "axios";
import { useCallback } from "react";
import { IdAndNameDto } from "../../type/api/dto/IdAndNameDto";
import { IncludePartsAndCategoryPriceDto } from "../../type/api/dto/IncludePartsAndCategoryPriceDto";
import { PagenationParameter } from "../../type/api/dto/PagenationParameterDto";
import { PriceDto } from "../../type/api/dto/PriceDto";
import { OrderPlan } from "../../type/app/OrderPlan";
import { getAxios } from "./config/ApiConfig";

export const IdAndNameApi = () => {
  const getAllOriginCategoryIdAndName = useCallback(async (): Promise<
    IdAndNameDto[]
  > => {
    const data: IdAndNameDto[] = await getAxios(`id-and-name/origin-category`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });

    return data;
  }, []);

  return { getAllOriginCategoryIdAndName };
};
