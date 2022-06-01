import { TreatmentParts } from "../components/pages/treatment-parts/TreatmentParts";

export const treatmentPartsRoutes = [
  {
    path: "/",
    exact: true,
    title: "施術可能部位の一覧 | あなたのための脱毛",
    description:
      "「渋谷・恵比寿・新宿・銀座・六本木・池袋」大手から優良小規模で脱毛可能な部位です。おすすめの部位から意外な部位まで掲載しています。",
    children: <TreatmentParts />,
  },
];
