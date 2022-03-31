import axios from "axios";
import { useCallback } from "react";
import {
  LocalConditionData,
  OrderPlanIdName,
  ViewDataIdName,
  ViewDataIdNameAndTitle,
} from "../../../type/app/ViewTypeFromApi";
import { AboutCategoryApi } from "../../api/AboutCategoryApi";
import { BasePartsApi } from "../../api/BasePartsApi";
import { OriginCategoryApi } from "../../api/OriginCategoryApi";

export const SalonListHook = () => {
  const { getOriginCategories } = OriginCategoryApi();
  const { getAboutCategories } = AboutCategoryApi();
  const { getBaseParts } = BasePartsApi();

  const noneValuePush = useCallback((): ViewDataIdName => {
    return { id: "none", name: "指定しない" };
  }, []);

  const getResearchCardData = useCallback(
    async (orderParams: OrderPlanIdName) => {
      const getOriginCategory = await getOriginCategories(
        orderParams.originParts.id
      );
      const getAboutCategory = await getAboutCategories(
        getOriginCategory[0].id,
        orderParams.AboutCategory.id
      );
      const getParts = orderParams.parts
        ? await getBaseParts(getAboutCategory[0].id, orderParams.parts.id)
        : await getBaseParts(getAboutCategory[0].id);

      if (orderParams.parts?.id === "none") {
        getParts.unshift(noneValuePush());
      } else {
        getParts.push(noneValuePush());
      }

      return {
        originCategory: getOriginCategory,
        aboutCategory: getAboutCategory,
        parts: getParts,
      };
    },
    [noneValuePush, getOriginCategories, getAboutCategories, getBaseParts]
  );

  const createResearchPartsData = useCallback(
    async (orderParams: OrderPlanIdName) => {
      const data = await getResearchCardData(orderParams);
      const createdData: ViewDataIdNameAndTitle[] = [
        {
          title: "広域カテゴリ",
          value: data.originCategory,
        },
        {
          title: "詳細カテゴリ",
          value: data.aboutCategory,
        },
        {
          title: "部位",
          value: data.parts,
        },
      ];
      return createdData;
    },
    [getResearchCardData]
  );

  const createLocalConditionData = useCallback(
    (orderParams: OrderPlanIdName) => {
      const localData: LocalConditionData[] = [
        {
          title: "性別",
          orderData: orderParams.gender,
          texts: ["女性", "男性"],
        },
        {
          title: "肌色",
          orderData: orderParams.skinCollor,
          texts: ["白色", "薄茶色", "色黒"],
        },
        {
          title: "毛量",
          orderData: orderParams.hair,
          texts: ["産毛", "標準", "太い"],
        },
        {
          title: "料金体系",
          orderData: orderParams.paySystem,
          texts: ["総額", "１回分"],
        },
      ];
      return localData;
    },
    []
  );

  const createConditionData = useCallback(
    async (orderParams: OrderPlanIdName) => {
      const partsData = await createResearchPartsData(orderParams);
      const localData = createLocalConditionData(orderParams);
      return { parts: partsData, local: localData };
    },
    [createResearchPartsData, createLocalConditionData]
  );

  return { createConditionData };
};
