import { Clinics } from "../components/pages/clinic/Clinics";
import { ClinicDetail } from "../components/pages/clinic/detail/ClinicDetail";

export const clinicRoutes = [
  {
    path: "/",
    exact: true,
    children: <Clinics />,
  },
  {
    path: "/:id/",
    exact: true,
    children: <ClinicDetail />,
  },

  // {
  //   path: "/:id/option",
  //   exact: true,
  //   children: <ClinicDetail selectTab="option" />,
  // },
  // {
  //   path: "/:id/plan",
  //   exact: true,
  //   children: <ClinicDetail selectTab="plan" />,
  // },
];
