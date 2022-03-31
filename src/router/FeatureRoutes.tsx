import { AnesthesiaFeature } from "../components/pages/feature/page/AnesthesiaFeature";
import { InstallmentsFeature } from "../components/pages/feature/page/InstallmentsFeature";
import { InteriorFeature } from "../components/pages/feature/page/InteriorFeature";
import { PrivateRoomFeature } from "../components/pages/feature/page/PrivateRoomFeature";
import { SutudentDiscountFeature } from "../components/pages/feature/page/SutudentDiscountFeature";
import { VisitFeeFeature } from "../components/pages/feature/page/VisitFeeFeature";

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
