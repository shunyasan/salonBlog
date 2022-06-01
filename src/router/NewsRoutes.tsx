import { News } from "../components/pages/news/News";

export const newsRoutes = [
  {
    path: "/",
    exact: true,
    title: "NEWS | あなたのための脱毛",
    description: "",
    children: <News />,
  },
];
