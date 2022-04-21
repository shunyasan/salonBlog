import { useCallback } from "react";
import { TopResource } from "../../../resorces/TopResource";
import { QueryOrderPlan } from "../../../type/app/QueryOrderPlan";

export const SearchSalonHooks = () => {
  const getQueryOrderPlan = useCallback((url: string) => {
    const decode = decodeURI(url);
    const query = new URLSearchParams(decode);
    const orderPlanViewCard: QueryOrderPlan = {
      gender: query.get("gender"),
      skinCollor: query.get("skinCollor"),
      hair: query.get("hair"),
      paySystem: query.get("paySystem"),
      originParts: query.get("originParts"),
      AboutCategory: query.get("AboutCategory"),
      parts: query.get("parts"),
    };

    return orderPlanViewCard;
  }, []);

  const getRandomImg = useCallback(() => {
    const img = [
      TopResource.clinicImg1,
      TopResource.clinicImg2,
      TopResource.clinicImg3,
      TopResource.clinicImg4,
      TopResource.clinicImg5,
      TopResource.clinicImg6,
      TopResource.clinicImg7,
      TopResource.clinicImg8,
      TopResource.clinicImg9,
      TopResource.clinicImg10,
    ];
    const randomNum = Math.floor(Math.random() * 10);
    return img[randomNum];
  }, []);

  return { getQueryOrderPlan, getRandomImg };
};
