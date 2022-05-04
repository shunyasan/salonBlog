import { useCallback } from "react";
import { QueryKey } from "../../../enums/QueryKey";
import { OrderPlan } from "../../../type/app/OrderPlan";
import { QueryOrderPlan } from "../../../type/app/QueryOrderPlan";

export const CreateParameterHooks = () => {
  const getQueryOrderPlan = useCallback((url) => {
    const decode = decodeURI(url);
    const query = new URLSearchParams(decode);
    const orderPlanViewCard: QueryOrderPlan = {
      gender: query.get(QueryKey.gender),
      skinCollor: query.get(QueryKey.skinCollor),
      hair: query.get(QueryKey.hair),
      paySystem: query.get(QueryKey.paySystem),
      originParts: query.get(QueryKey.originParts),
      AboutCategory: query.get(QueryKey.aboutCategory),
      parts: query.get(QueryKey.parts),
    };
    return orderPlanViewCard;
  }, []);

  /**
   * 上のメソッドと同じにする予定
   * 型が分かれているが、上の関数からnullを外して対応
   */
  const getQueryOrderPlanInSearch = useCallback((url) => {
    const decode = decodeURI(url);
    const query = new URLSearchParams(decode);
    const orderParams: OrderPlan = {
      gender: query.get(QueryKey.gender) || "女性",
      paySystem: query.get(QueryKey.paySystem) || "総額",
      originParts: query.get(QueryKey.originParts) || "Z000001",
      AboutCategory: query.get(QueryKey.aboutCategory) || "A000001",
      parts: query.get(QueryKey.parts),
      skinCollor: query.get(QueryKey.skinCollor),
      hair: query.get(QueryKey.hair),
    };
    return orderParams;
  }, []);

  return { getQueryOrderPlan, getQueryOrderPlanInSearch };
};
