import axios from "axios";
import { useCallback } from "react";
import { IncludePartsAndCategoryPriceDto } from "../../type/api/dto/IncludePartsAndCategoryPriceDto";
import { PagenationParameter } from "../../type/api/dto/PagenationParameterDto";
import { PriceDto } from "../../type/api/dto/PriceDto";
import { OrderPlan } from "../../type/app/OrderPlan";
import { getAxios } from "./config/ApiConfig";

export const PriceApi = () => {
  const isExistQueryData = useCallback((data: string | number | null) => {
    return data && data !== "未選択" && data !== "none" ? true : false;
  }, []);

  const createQuery = useCallback(
    (orderPlan: OrderPlan, take?: number, skip?: number) => {
      const gender = `gender=${orderPlan.gender}&`;
      const paySystem = `paySystem=${orderPlan.paySystem}&`;
      const originCategoryId = `originCategoryId=${orderPlan.originParts}&`;
      const aboutCategoryId = `aboutCategoryId=${orderPlan.AboutCategory}&`;
      const partsId = orderPlan.parts ? `partsId=${orderPlan.parts}&` : "";
      const skinCollor = isExistQueryData(orderPlan.skinCollor)
        ? `skinCollor=${orderPlan.skinCollor}&`
        : "";
      const hair = isExistQueryData(orderPlan.hair)
        ? `hair=${orderPlan.hair}&`
        : "";

      const roomType = isExistQueryData(orderPlan.roomType)
        ? `roomType=${orderPlan.roomType}&`
        : "";

      const interior = isExistQueryData(orderPlan.interior)
        ? `interior=${orderPlan.interior}&`
        : "";

      const staff = isExistQueryData(orderPlan.staff)
        ? `staff=${orderPlan.staff}&`
        : "";

      const card = isExistQueryData(orderPlan.card)
        ? `card=${orderPlan.card}&`
        : "";

      const loan = isExistQueryData(orderPlan.loan)
        ? `loan=${orderPlan.loan}&`
        : "";

      const contract = isExistQueryData(orderPlan.contract)
        ? `contract=${orderPlan.contract}&`
        : "";

      const option = isExistQueryData(orderPlan.option)
        ? `option=${orderPlan.option}&`
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
        roomType +
        interior +
        staff +
        card +
        loan +
        contract +
        option +
        pagenation;

      return param;
    },
    [isExistQueryData]
  );

  const getTreatmentPrice = useCallback(
    async (
      orderPlan: OrderPlan,
      take: number,
      skip: number
    ): Promise<IncludePartsAndCategoryPriceDto> => {
      const params = createQuery(orderPlan, take, skip);
      const data: IncludePartsAndCategoryPriceDto = await getAxios(
        "price/order-plan?" + params
      )
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
      const data: number = await getAxios("price/max-count?" + params)
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
      const data: PriceDto[] = await getAxios(
        `price/only-price/pagenation/clinic/${clinicId}?${query}`
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

  const getPriceByAboutIdAndClinicId = useCallback(
    async (clinicId: string, aboutId: string): Promise<PriceDto[]> => {
      const data: PriceDto[] = await getAxios(
        `price/clinic/${clinicId}?aboutId=${aboutId}`
      )
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
        });

      return data;
    },
    []
  );

  return {
    getTreatmentPrice,
    getPriceByClinicId,
    getCountPrice,
    getPriceByAboutIdAndClinicId,
  };
};
