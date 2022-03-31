import { useCallback } from "react";
import { AbobutCategiryId } from "../../enums/AbobutCategiryIdEnum";

export const AboutCategoryHook = () => {
  const checkBasePartsKey = useCallback((aboutCategoryId: string) => {
    const func: any = {};
    func[AbobutCategiryId.upperFace] = "upperFace";
    func[AbobutCategiryId.lowerFace] = "lowerFace";
    func[AbobutCategiryId.faceSet] = "faceSet";
    func[AbobutCategiryId.arm] = "arm";
    func[AbobutCategiryId.leg] = "leg";
    func[AbobutCategiryId.limb] = "limb";
    func[AbobutCategiryId.frontBody] = "frontBody";
    func[AbobutCategiryId.backBody] = "backBody";
    func[AbobutCategiryId.bodySet] = "bodySet";
    func[AbobutCategiryId.vio] = "vio";
    func[AbobutCategiryId.vioSet] = "vioSet";
    func[AbobutCategiryId.allBody] = "allBody";
    func[AbobutCategiryId.select] = "select";
    func[AbobutCategiryId.time] = "time";
    func[AbobutCategiryId.range] = "range";
    func[AbobutCategiryId.upperBody] = "upperBody";
    func[AbobutCategiryId.lowerBody] = "lowerBody";
    const dataKey = func[aboutCategoryId];
    return dataKey;
  }, []);

  return { checkBasePartsKey };
};
