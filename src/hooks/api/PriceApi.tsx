import axios from "axios";
import { useCallback } from "react";
import {
  ApiIncludePartsAndCategoryPriceDto,
  ApiOnlyPrice,
  ApiPrice,
  PagenationParameter,
} from "../../type/api/ApiType";
import { OrderPlan } from "../../type/app/BaseType";
import { baseURL } from "./config/ApiConfig";

export const PriceApi = () => {
  const createQuery = useCallback(
    (orderPlan: OrderPlan, take?: number, skip?: number) => {
      const gender = `gender=${orderPlan.gender}&`;
      const paySystem = `paySystem=${orderPlan.paySystem}&`;
      const originCategoryId = `originCategoryId=${orderPlan.originParts}&`;
      const aboutCategoryId = `aboutCategoryId=${orderPlan.AboutCategory}&`;
      const partsId = orderPlan.parts ? `partsId=${orderPlan.parts}&` : "";
      const skinCollor = orderPlan.skinCollor
        ? `skinCollor=${orderPlan.skinCollor}&`
        : "";
      const hair = orderPlan.hair ? `hair=${orderPlan.hair}&` : "";
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
    ): Promise<ApiIncludePartsAndCategoryPriceDto> => {
      const params = createQuery(orderPlan, take, skip);
      const originData = await axios
        .get(baseURL + "price/order-plan?" + params)
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
          return [];
        });

      return originData;
    },
    [createQuery]
  );

  const getCountPrice = useCallback(
    async (orderPlan: OrderPlan): Promise<number> => {
      const params = createQuery(orderPlan);
      const originData: number = await axios
        .get(baseURL + "price/max-count?" + params)
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
          return null;
        });

      return originData;
    },
    [createQuery]
  );

  const getPriceByClinicId = useCallback(
    async (
      clinicId: string,
      pagenation?: PagenationParameter
    ): Promise<ApiOnlyPrice[]> => {
      let query = "";
      if (pagenation) {
        query = `take=${pagenation.take}&skip=${pagenation.skip}`;
      }
      const data: ApiPrice[] = await axios
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
