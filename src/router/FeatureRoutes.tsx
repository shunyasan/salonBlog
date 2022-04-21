import { AnesthesiaFeature } from "../components/pages/feature/AnesthesiaFeature";
import { InstallmentsFeature } from "../components/pages/feature/InstallmentsFeature";
import { InteriorFeature } from "../components/pages/feature/InteriorFeature";
import { PrivateRoomFeature } from "../components/pages/feature/PrivateRoomFeature";
import { SutudentDiscountFeature } from "../components/pages/feature/SutudentDiscountFeature";
import { VisitFeeFeature } from "../components/pages/feature/VisitFeeFeature";

export const featureRoutes = [
  {
    path: "/interior",
    exact: false,
    children: <InteriorFeature />,
  },
  {
    path: "/visitFee",
    exact: false,
    children: <VisitFeeFeature />,
  },
  {
    path: "/installments",
    exact: false,
    children: <InstallmentsFeature />,
  },
  {
    path: "/privateRoom",
    exact: false,
    children: <PrivateRoomFeature />,
  },
  {
    path: "/anesthesia",
    exact: false,
    children: <AnesthesiaFeature />,
  },
  {
    path: "/sutudentDiscount",
    exact: false,
    children: <SutudentDiscountFeature />,
  },
];
