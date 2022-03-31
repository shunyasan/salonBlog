/* eslint-disable array-callback-return */
import { useCallback } from "react";
import { ApiClinic, ApiClinicOption, ApiPrice } from "../../type/api/ApiType";
import { OptionText } from "../../type/app/BaseType";

export const ClinicOptionHook = () => {
  const newOptionFunc = useCallback((clinic: ApiClinic) => {
    const irradiation: OptionText = {
      name: "照射漏れ",
      text: clinic.clinicOption.irradiationLeakage,
    };
    const anesthesia: OptionText = {
      name: "麻酔",
      text: clinic.clinicOption.anesthesia,
    };
    const aftercare: OptionText = {
      name: "アフターケア",
      text: clinic.clinicOption.aftercare,
    };
    const shaving: OptionText = {
      name: "剃毛",
      text: clinic.clinicOption.shaving,
    };
    const trouble: OptionText = {
      name: "肌トラブル対応",
      text: clinic.clinicOption.troubleTreatment,
    };
    const firstVisit: OptionText = {
      name: "初診料",
      text: clinic.clinicOption.firstVisitFees,
    };
    const subsequentVisit: OptionText = {
      name: "再診料",
      text: clinic.clinicOption.subsequentVisitFees,
    };
    const studentDiscount: OptionText = {
      name: "学割",
      text: clinic.clinicOption.studentDiscount,
    };
    const cardPay: OptionText = {
      name: "カード払い",
      text: clinic.cardPay,
    };
    const medhicalLoan: OptionText = {
      name: "医療ローン",
      text: clinic.medhicalLoan,
    };
    const contractCancel: OptionText = {
      name: "途中解約",
      text: clinic.clinicOption.contractCancellation,
    };
    return {
      service: [irradiation, anesthesia, aftercare, shaving, trouble],
      medicalFee: [firstVisit, subsequentVisit, studentDiscount],
      payment: [cardPay, medhicalLoan, contractCancel],
    };
  }, []);

  const checkFreeOption = useCallback((option: ApiClinicOption) => {
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

  return { newOptionFunc, checkFreeOption };
};
