import { useState } from "react";
import { SalonList } from "../components/pages/salon/search/SalonList";
import { SearchSalon } from "../components/pages/salon/SearchSalon";

export const SalonRoutes = () => {
  const [listTitle, setListTitle] = useState<string>();

  const salonRoutes = [
    {
      path: "/",
      exact: true,
      title: "条件を選択 | あなたのための脱毛",
      description:
        "「渋谷・恵比寿・新宿・銀座・六本木・池袋」からおすすめのプランを検索します。安い/痛くないと言った要望や、顔/全身/VIOの中でも、クリニックにごとの施術範囲の違いを指定して検索できます。",
      children: <SearchSalon />,
    },
    {
      path: "/search",
      exact: false,
      description: `【${listTitle}】のプランを検索`,
      title: `【${listTitle}】| あなたのための脱毛`,
      children: <SalonList title={(value: string) => setListTitle(value)} />,
    },
  ];

  return { salonRoutes };
};
