import axios from "axios";
import { useCallback } from "react";
import {
  ApiIncludePartsAndCategoryPriceDto,
  ApiOnlyPrice,
  ApiPrice,
} from "../../type/api/ApiType";
import { OrderPlan } from "../../type/app/BaseType";
import { baseURL } from "./config/ApiConfig";

export const PriceApi = () => {
  const createQuery = useCallback((orderPlan: OrderPlan) => {
    const gender = `gender=${orderPlan.gender}&`;
    const skinCollor = `skinCollor=${orderPlan.skinCollor}&`;
    const hair = `hair=${orderPlan.hair}&`;
    const paySystem = `paySystem=${orderPlan.paySystem}&`;
    const originCategoryId = `originCategoryId=${orderPlan.originParts}&`;
    const aboutCategoryId = `aboutCategoryId=${orderPlan.AboutCategory}&`;
    const partsId = orderPlan.parts && `partsId=${orderPlan.parts}&`;

    const param =
      gender +
      skinCollor +
      hair +
      paySystem +
      originCategoryId +
      aboutCategoryId +
      partsId;

    return param;
  }, []);

  const getTreatmentPrice = useCallback(
    async (
      orderPlan: OrderPlan
    ): Promise<ApiIncludePartsAndCategoryPriceDto> => {
      const params = createQuery(orderPlan);
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

  const getPriceByClinicId = useCallback(
    async (clinicId: string): Promise<ApiOnlyPrice[]> => {
      const data: ApiPrice[] = await axios
        .get(baseURL + `price/only-price/clinic/${clinicId}`)
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

  return { getTreatmentPrice, getPriceByClinicId };
};
