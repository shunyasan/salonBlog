import { News } from "../components/pages/news/News";

export const newsRoutes = [
  {
    path: "/",
    exact: true,
    children: <News />,
  },
];
