import { useCallback, useState } from "react";
import { Clinics } from "../components/pages/clinic/Clinics";
import { ClinicDetail } from "../components/pages/clinic/detail/ClinicDetail";

export const ClinicRoutes = () => {
  const [detailTitle, setDetailTitle] = useState<string>();

  const clinicRoutes = [
    {
      path: "/",
      exact: true,
      title: "クリニック一覧 | あなたのための脱毛",
      description:
        "「渋谷・恵比寿・新宿・銀座・六本木・池袋」にあるクリニック一覧です",
      children: <Clinics />,
    },
    {
      path: "/:id/",
      exact: true,
      title: detailTitle + "| あなたのための脱毛",
      description: `${detailTitle}の詳細です`,
      children: (
        <ClinicDetail title={(value: string) => setDetailTitle(value)} />
      ),
    },
  ];
  return { clinicRoutes };
};
