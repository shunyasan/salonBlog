import { useCallback } from "react";
import { OrderPlan } from "../../../type/api/FirebaseType";

export const HairCountViewData = () => {
	// const selectFunc = useCallback(
	// 	async(value: string, orderPlan: OrderPlan) => {
	//     const countFunc: any = {};
	//     countFunc["産毛"] = softHairCountViewData;
	//     countFunc["標準"] = standartHairViewData;
	//     countFunc["太い"] = thickHairCountViewData;

	// 		const func = countFunc[value];
	// 		if (func) {
	// 			return await countFunc[value](orderPlan);
	// 		}
	// 		return null;
	// 	},
	// 	[softHairCountViewData, standartHairViewData, thickHairCountViewData]
	// );

	const softHairCountViewData = useCallback(async (orderPlan: OrderPlan) => {
		return 5000;
	}, []);

	const standartHairViewData = useCallback(async (orderPlan: OrderPlan) => {
		return 4000;
	}, []);

	const thickHairCountViewData = useCallback(async (orderPlan: OrderPlan) => {
		return 3000;
	}, []);

	return {
		softHairCountViewData,
		standartHairViewData,
		thickHairCountViewData,
	};
};
