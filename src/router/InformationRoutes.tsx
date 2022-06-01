import { News } from "../components/pages/news/News";
import { Profile } from "../components/pages/information/Profile";
import { ForClinics } from "../components/pages/information/ForClinics";

export const informationRoutes = [
  {
    path: "/profile",
    exact: false,
    title: "プロフィール | あなたのための脱毛",
    description: "",
    children: <Profile />,
  },
  {
    path: "/for-clinics",
    exact: false,
    title: "クリニック様へ | あなたのための脱毛",
    description: "",
    children: <ForClinics />,
  },
];
