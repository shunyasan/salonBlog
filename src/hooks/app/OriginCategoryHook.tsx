/* eslint-disable array-callback-return */
import { useCallback } from "react";
import { OriginCategiryId } from "../../enums/OriginCategiryIdEnum";

export const OriginCategoryHook = () => {
  const boxData = [
    {
      name: "顔",
      originId: OriginCategiryId.face,
    },
    {
      name: "四肢",
      originId: OriginCategiryId.limb,
    },
    {
      name: "体幹",
      originId: OriginCategiryId.body,
    },
    {
      name: "VIO",
      originId: OriginCategiryId.vio,
    },
    {
      name: "全身",
      originId: OriginCategiryId.allBody,
    },
    {
      name: "その他",
      originId: OriginCategiryId.other,
    },
  ];

  const checkAboutCategoryKey = useCallback((originId: string) => {
    const func: any = {};
    func[OriginCategiryId.face] = "face";
    func[OriginCategiryId.limb] = "limb";
    func[OriginCategiryId.body] = "body";
    func[OriginCategiryId.vio] = "vio";
    func[OriginCategiryId.allBody] = "allBody";
    func[OriginCategiryId.other] = "other";
    const dataKey: OriginCategiryId = func[originId];
    return dataKey;
  }, []);

  return { checkAboutCategoryKey, boxData };
};
