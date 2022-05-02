import { useCallback } from "react";
import { Clinic } from "../../../type/api/Clinic";
import { ClinicOption } from "../../../type/api/ClinicOption";
import { TitleValue } from "../../../type/app/TitleValue";

export const ClinicDetailHooks = () => {
  const ClinicDetailTab = useCallback(() => {
    const tab: TitleValue[] = [
      {
        title: "クリニック概要",
        value: "",
      },
      {
        title: "オプションサービス",
        value: "option",
      },
      {
        title: "プラン詳細",
        value: "plan",
      },
    ];
    return tab;
  }, []);

  const checkNoneValue = useCallback((val: string) => {
    if (!val || val === "なし") {
      return "-";
    }
    return val;
  }, []);

  const ClinicOptionTitleValue = useCallback(
    (clinicOption: ClinicOption): TitleValue[] => {
      const datas: TitleValue[] = [
        { title: "初診料", value: checkNoneValue(clinicOption.firstVisitFees) },
        {
          title: "再診料",
          value: checkNoneValue(clinicOption.subsequentVisitFees),
        },
        {
          title: "照射漏れ",
          value: checkNoneValue(clinicOption.irradiationLeakage),
        },
        {
          title: "アフターケア",
          value: checkNoneValue(clinicOption.aftercare),
        },
        { title: "麻酔", value: checkNoneValue(clinicOption.anesthesia) },
        { title: "剃毛", value: checkNoneValue(clinicOption.shaving) },
        {
          title: "トラブル対応",
          value: checkNoneValue(clinicOption.troubleTreatment),
        },
      ];
      return datas;
    },
    [checkNoneValue]
  );

  const ClinicPaymentTitleValue = useCallback(
    (clinic: Clinic) => {
      const datas: TitleValue[] = [
        {
          title: "学割",
          value: checkNoneValue(clinic.clinicOption.studentDiscount),
        },
        { title: "カード払い", value: checkNoneValue(clinic.cardPay) },
        { title: "医療ローン", value: checkNoneValue(clinic.medhicalLoan) },
        {
          title: "途中解約",
          value: checkNoneValue(clinic.clinicOption.contractCancellation),
        },
      ];

      return datas;
    },
    [checkNoneValue]
  );

  const ClinicOtherTitleValue = useCallback((clinic: Clinic) => {
    const datas: TitleValue[] = [
      { title: "住所", value: clinic.address },
      {
        title: "最寄駅",
        value: clinic.nearestStation,
      },
      // {
      //   title: "URL",
      //   value: clinic.url,
      // },
      {
        title: "電話番号",
        value: clinic.tel,
      },
    ];
    return datas;
  }, []);

  return {
    ClinicDetailTab,
    ClinicOptionTitleValue,
    ClinicPaymentTitleValue,
    ClinicOtherTitleValue,
  };
};
