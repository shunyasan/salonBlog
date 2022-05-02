import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { AbobutCategiryId } from "../../../enums/AbobutCategiryIdEnum";
import { OriginCategiryId } from "../../../enums/OriginCategiryIdEnum";
import { CardName } from "../../../enums/SerchSalonCardName";
import { IdAndNameDto } from "../../../type/api/dto/IdAndNameDto";

export const TreatmentPartsHook = () => {
  const history = useHistory();

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

  const searchForPlan = useCallback(
    (
      gender: string,
      originId: string,
      aboutCategoryId: string,
      partsId?: string
    ) => {
      const genderParam = `${CardName.first}=${gender}&`;
      const originCategory = `${CardName.third}=${originId}&`;
      const aboutCategory = `${CardName.fourth}=${aboutCategoryId}&`;
      const parts = partsId ? `${CardName.fifth}=${partsId}&` : "";
      history.push({
        pathname: "/salon/search",
        search: genderParam + originCategory + aboutCategory + parts,
      });
    },
    [history]
  );

  return { checkBasePartsKey, checkAboutCategoryKey, searchForPlan };
};
