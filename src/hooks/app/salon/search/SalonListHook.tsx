import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { QueryKey } from "../../../../enums/QueryKey";
import { Clinic } from "../../../../type/api/Clinic";
import { ClinicOption } from "../../../../type/api/ClinicOption";
import { ClinicNestPriceDto } from "../../../../type/api/dto/ClinicNestPriceDto";
import { IdAndNameDto } from "../../../../type/api/dto/IdAndNameDto";
import { OptionText } from "../../../../type/app/OptionText";
import { OrderPlanIdName } from "../../../../type/app/OrderPlanIdName";
import { AboutCategoryApi } from "../../../api/AboutCategoryApi";
import { BasePartsApi } from "../../../api/BasePartsApi";
import { OriginCategoryApi } from "../../../api/OriginCategoryApi";

export const SalonListHook = () => {
  const history = useHistory();
  const { getOriginCategories } = OriginCategoryApi();
  const { getAboutCategories } = AboutCategoryApi();
  const { getBaseParts } = BasePartsApi();

  const noneValuePush = useCallback((): IdAndNameDto => {
    return { id: "none", name: "指定しない" };
  }, []);

  const getResearchCardData = useCallback(
    async (originId: string, aboutCategoryId?: string, partsId?: string) => {
      const getOriginCategory = await getOriginCategories(originId);
      const getAboutCategory = await getAboutCategories(
        getOriginCategory[0].id,
        aboutCategoryId
      );
      const getParts = await getBaseParts(getAboutCategory[0].id, partsId);

      if (!partsId || partsId === "none") {
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

  const checkNoneValue = useCallback((val: string) => {
    if (!val || val === "なし") {
      return "-";
    }
    return val;
  }, []);

  const newOptionFunc = useCallback(
    (clinic: Clinic | ClinicNestPriceDto) => {
      const irradiation: OptionText = {
        name: "照射漏れ",
        text: checkNoneValue(clinic.clinicOption.irradiationLeakage),
      };
      const anesthesia: OptionText = {
        name: "麻酔",
        text: checkNoneValue(clinic.clinicOption.anesthesia),
      };
      const aftercare: OptionText = {
        name: "アフターケア",
        text: checkNoneValue(clinic.clinicOption.aftercare),
      };
      const shaving: OptionText = {
        name: "剃毛",
        text: checkNoneValue(clinic.clinicOption.shaving),
      };
      const trouble: OptionText = {
        name: "肌トラブル対応",
        text: checkNoneValue(clinic.clinicOption.troubleTreatment),
      };
      const firstVisit: OptionText = {
        name: "初診料",
        text: checkNoneValue(clinic.clinicOption.firstVisitFees),
      };
      const subsequentVisit: OptionText = {
        name: "再診料",
        text: checkNoneValue(clinic.clinicOption.subsequentVisitFees),
      };
      const studentDiscount: OptionText = {
        name: "学割",
        text: checkNoneValue(clinic.clinicOption.studentDiscount),
      };
      const cardPay: OptionText = {
        name: "カード払い",
        text: checkNoneValue(clinic.cardPay),
      };
      const medhicalLoan: OptionText = {
        name: "医療ローン",
        text: checkNoneValue(clinic.medhicalLoan),
      };
      const contractCancel: OptionText = {
        name: "途中解約",
        text: checkNoneValue(clinic.clinicOption.contractCancellation),
      };
      return {
        service: [irradiation, anesthesia, aftercare, shaving, trouble],
        medicalFee: [firstVisit, subsequentVisit, studentDiscount],
        payment: [cardPay, medhicalLoan, contractCancel],
      };
    },
    [checkNoneValue]
  );

  const checkFreeOption = useCallback((option: ClinicOption) => {
    const func: any = {};
    func["irradiationLeakage"] = "照射漏れ";
    func["aftercare"] = "アフターケア";
    func["anesthesia"] = "麻酔";
    func["contractCancellation"] = "中途解約";
    func["firstVisitFees"] = "初診料";
    func["subsequentVisitFees"] = "再診料";
    func["shaving"] = "剃毛";
    func["troubleTreatment"] = "肌トラブル対応";

    const clinicData = Object.entries(option).map(([key, value]) => {
      if (typeof value === "string" && value.includes("無料")) {
        return key;
      } else {
        return null;
      }
    });

    let optionList: string = "";
    for (const data of clinicData) {
      if (data) {
        const checkOption = func[data];
        if (checkOption) {
          optionList += checkOption + "/ ";
        }
      }
    }
    return optionList === "" ? "不明" : optionList;
  }, []);

  // const createParam = useCallback((key: string, value: string) => {
  //   return `${key}=${value}&`;
  // }, []);

  // const checkNoneParameter = useCallback(
  //   (cardName: string, id: string) => {
  //     if (id === "none") {
  //       return "";
  //     } else {
  //       return createParam(cardName, id);
  //     }
  //   },
  //   [createParam]
  // );

  // const createParameter = useCallback(
  //   async (orderData: OrderPlanIdName) => {
  //     let newParams: string = "";
  //     newParams += createParam(QueryKey.gender, orderData.gender.id);
  //     newParams += createParam(QueryKey.paySystem, orderData.paySystem.id);
  //     newParams += createParam(QueryKey.originParts, orderData.originParts.id);
  //     newParams += createParam(
  //       QueryKey.aboutCategory,
  //       orderData.AboutCategory.id
  //     );
  //     newParams += orderData.parts
  //       ? checkNoneParameter(QueryKey.parts, orderData.parts.id)
  //       : "";
  //     newParams += createParam(
  //       QueryKey.skinCollor,
  //       orderData.skinCollor.id || ""
  //     );
  //     newParams += createParam(QueryKey.hair, orderData.hair.id || "");
  //     history.push({
  //       pathname: "/salon/search",
  //       search: `?${newParams}`,
  //     });
  //   },
  //   [history, createParam, checkNoneParameter]
  // );

  return {
    getResearchCardData,
    newOptionFunc,
    checkFreeOption,
    noneValuePush,
  };
};
