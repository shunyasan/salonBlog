import { useCallback } from "react";
import { FeatureDto } from "../../../type/api/dto/FeatureDto";
import { FeatureViewData } from "../../../type/app/FeatureViewData";

export const HomeHook = () => {
  const getFeatureString = useCallback((data: FeatureDto) => {
    const interior: FeatureViewData = {
      datas: data.interior,
      title: "内装が豪華なクリニック",
      description:
        "施術による不安や緊張を緩和できるほど、豪華な内装のクリニック",
      path: "/feature/interior",
    };
    const visitFee: FeatureViewData = {
      datas: data.visitFee,
      title: "初診・再診料無料のクリニック",
      description: "施術以外の費用がなく、安心料金のクリニック",
      path: "/feature/visitFee",
    };
    const installments: FeatureViewData = {
      datas: data.installments,
      title: "分割払い可能なクリニック",
      description:
        "一括による出費を抑えることができるため、選択可能なプランの多いクリニック",
      path: "/feature/installments",
    };
    const privateRoom: FeatureViewData = {
      datas: data.privateRoom,
      title: "完全個室のクリニック",
      description:
        "完全なプライベート空間で、一段と落ち着いた施術を受けることができるクリニック",
      path: "/feature/privateRoom",
    };
    const anesthesia: FeatureViewData = {
      datas: data.anesthesia,
      title: "麻酔無料のクリニック",
      description: "痛みが心配な人でも、費用を気にせず施術できるクリニック",
      path: "/feature/anesthesia",
    };
    const sutudentDiscount: FeatureViewData = {
      datas: data.sutudentDiscount,
      title: "学生料金（学割）のあるクリニック",
      description: "学生に対してお得に施術を提供しているクリニック",
      path: "/feature/sutudentDiscount",
    };

    const feature = [
      anesthesia,
      installments,
      interior,
      privateRoom,
      sutudentDiscount,
      visitFee,
    ];
    return feature;
  }, []);

  return { getFeatureString };
};
