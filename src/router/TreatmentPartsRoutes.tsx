import { TreatmentParts } from "../components/pages/treatment-parts/TreatmentParts";

export const treatmentPartsRoutes = [
  {
    path: "/",
    exact: true,
    children: <TreatmentParts />,
  },
];
