import { SalonList } from "../components/pages/salon/search/SalonList";
import { SearchSalon } from "../components/pages/salon/SearchSalon";

export const salonRoutes = [
  {
    path: "/",
    exact: true,
    children: <SearchSalon />,
  },
  {
    path: "/search",
    exact: false,
    children: <SalonList />,
  },
];