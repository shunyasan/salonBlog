import { News } from "../components/pages/news/News";
import { Profile } from "../components/pages/information/Profile";
import { ForClinics } from "../components/pages/information/ForClinics";

export const informationRoutes = [
  {
    path: "/profile",
    exact: false,
    children: <Profile />,
  },
  {
    path: "/for-clinics",
    exact: false,
    children: <ForClinics />,
  },
];
