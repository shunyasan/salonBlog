import { useCallback } from "react";
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

  return { getQueryOrderPlan };
};
