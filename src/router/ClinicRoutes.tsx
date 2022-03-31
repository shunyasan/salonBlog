import { Clinics } from "../components/pages/clinic/Clinics";

export const clinicRoutes = [
  {
    path: "/",
    exact: true,
    children: <Clinics />,
  },
];
