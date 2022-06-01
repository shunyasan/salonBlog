import { AnesthesiaFeature } from "../components/pages/feature/AnesthesiaFeature";
import { InstallmentsFeature } from "../components/pages/feature/InstallmentsFeature";
import { InteriorFeature } from "../components/pages/feature/InteriorFeature";
import { PrivateRoomFeature } from "../components/pages/feature/PrivateRoomFeature";
import { SutudentDiscountFeature } from "../components/pages/feature/SutudentDiscountFeature";
import { VisitFeeFeature } from "../components/pages/feature/VisitFeeFeature";
export const featureRoutes = [
  {
    path: "/interior",
    title: "内装の豪華なクリニック | あなたのための脱毛",
    description:
      "「渋谷・恵比寿・新宿・銀座・六本木・池袋」からおすすめする内装が豪華なクリニックです",
    exact: false,
    children: <InteriorFeature />,
  },
  {
    path: "/visitFee",
    title: "初診料が無料のクリニック | あなたのための脱毛",
    description:
      "「渋谷・恵比寿・新宿・銀座・六本木・池袋」からおすすめする初診料が無料のクリニックです。少しでも安いプランをご希望の方にておすすめです。",
    exact: false,
    children: <VisitFeeFeature />,
  },
  {
    path: "/installments",
    title: "分割払い可能なクリニック | あなたのための脱毛",
    description:
      "「渋谷・恵比寿・新宿・銀座・六本木・池袋」からおすすめする分割払い可能なクリニックです。カード、ローンが利用できます。",
    exact: false,
    children: <InstallmentsFeature />,
  },
  {
    path: "/privateRoom",
    title: "完全個室のあるクリニック | あなたのための脱毛",
    description:
      "「渋谷・恵比寿・新宿・銀座・六本木・池袋」からおすすめする完全個室のあるクリニックです。VIOなどで気にされる方におすすめです。",
    exact: false,
    children: <PrivateRoomFeature />,
  },
  {
    path: "/anesthesia",
    title: "麻酔が無料のクリニック | あなたのための脱毛",
    description:
      "「渋谷・恵比寿・新宿・銀座・六本木・池袋」からおすすめする麻酔が無料のクリニックです。痛いのが苦手な方で少しでも安いプランをご希望の方にておすすめです。",
    exact: false,
    children: <AnesthesiaFeature />,
  },
  {
    path: "/sutudentDiscount",
    title: "学生料金のあるクリニック | あなたのための脱毛",
    description:
      "「渋谷・恵比寿・新宿・銀座・六本木・池袋」からおすすめする学生料金のあるクリニックです。学割などをご希望の方にておすすめです。",
    exact: false,
    children: <SutudentDiscountFeature />,
  },
];
