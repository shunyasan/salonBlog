import axios from "axios";
import { useCallback } from "react";
import { IncludePartsAndCategoryPriceDto } from "../../type/api/dto/IncludePartsAndCategoryPriceDto";
import { PagenationParameter } from "../../type/api/dto/PagenationParameterDto";
import { PriceDto } from "../../type/api/dto/PriceDto";
import { OrderPlan } from "../../type/app/OrderPlan";
import { baseURL } from "./config/ApiConfig";

export const PriceApi = () => {
  const createQuery = useCallback(
    (orderPlan: OrderPlan, take?: number, skip?: number) => {
      const gender = `gender=${orderPlan.gender}&`;
      const paySystem = `paySystem=${orderPlan.paySystem}&`;
      const originCategoryId = `originCategoryId=${orderPlan.originParts}&`;
      const aboutCategoryId = `aboutCategoryId=${orderPlan.AboutCategory}&`;
      const partsId = orderPlan.parts ? `partsId=${orderPlan.parts}&` : "";
      const skinCollor =
        orderPlan.skinCollor && orderPlan.skinCollor !== "未選択"
          ? `skinCollor=${orderPlan.skinCollor}&`
          : "";
      const hair =
        orderPlan.hair && orderPlan.hair !== "未選択"
          ? `hair=${orderPlan.hair}&`
          : "";
      const pagenation = `take=${take}&skip=${skip}`;

      const param =
        gender +
        paySystem +
        originCategoryId +
        aboutCategoryId +
        partsId +
        skinCollor +
        hair +
        pagenation;

      return param;
    },
    []
  );

  const getTreatmentPrice = useCallback(
    async (
      orderPlan: OrderPlan,
      take: number,
      skip: number
    ): Promise<IncludePartsAndCategoryPriceDto> => {
      const params = createQuery(orderPlan, take, skip);
      const data: IncludePartsAndCategoryPriceDto = await axios
        .get(baseURL + "price/order-plan?" + params)
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
          return [];
        });

      return data;
    },
    [createQuery]
  );

  const getCountPrice = useCallback(
    async (orderPlan: OrderPlan): Promise<number> => {
      const params = createQuery(orderPlan);
      const data: number = await axios
        .get(baseURL + "price/max-count?" + params)
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
          return null;
        });

      return data;
    },
    [createQuery]
  );

  const getPriceByClinicId = useCallback(
    async (
      clinicId: string,
      pagenation?: PagenationParameter
    ): Promise<PriceDto[]> => {
      let query = "";
      if (pagenation) {
        query = `take=${pagenation.take}&skip=${pagenation.skip}`;
      }
      const data: PriceDto[] = await axios
        .get(
          baseURL + `price/only-price/pagenation/clinic/${clinicId}?${query}`
        )
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
          return [];
        });

      console.log("kita");
      return data;
    },
    []
  );

  return { getTreatmentPrice, getPriceByClinicId, getCountPrice };
};
