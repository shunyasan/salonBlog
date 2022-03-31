import { useCallback } from "react";
import { OrderPlan } from "../../../type/api/FirebaseType";

export const OriginPartsCountViewData = () => {
	// const selectFunc = useCallback(
	// 	async(value: string, orderPlan: OrderPlan) => {
	//     const countFunc: any = {};
	//     countFunc["A000001"] = faceUpperCountViewData;
	//     countFunc["A000002"] = faceLowerCountViewData;
	//     countFunc["A000003"] = faceSetCountViewData;
	//     countFunc["A000004"] = thickHairCountViewData;
	//     countFunc["A000005"] = thickHairCountViewData;
	//     countFunc["A000006"] = thickHairCountViewData;
	//     countFunc["A000007"] = thickHairCountViewData;
	//     countFunc["A000008"] = thickHairCountViewData;
	//     countFunc["A000009"] = thickHairCountViewData;
	//     countFunc["A000010"] = thickHairCountViewData;
	//     countFunc["A000011"] = thickHairCountViewData;
	//     countFunc["A000012"] = thickHairCountViewData;
	//     countFunc["A000013"] = thickHairCountViewData;
	//     countFunc["A000014"] = thickHairCountViewData;
	//     countFunc["A000015"] = thickHairCountViewData;
	//     countFunc["A000016"] = thickHairCountViewData;
	//     countFunc["A000017"] = thickHairCountViewData;

	// 		const func = countFunc[value];
	// 		if (func) {
	// 			return await countFunc[value](orderPlan);
	// 		}
	// 		return null;
	// 	},
	// 	[softHairCountViewData, standartHairViewData, thickHairCountViewData]
	// );

	const faceCountViewData = useCallback(async (orderPlan: OrderPlan) => {
		return 1;
	}, []);

	const limbsCountViewData = useCallback(async (orderPlan: OrderPlan) => {
		return 2;
	}, []);

	const aroundBodyCountViewData = useCallback(async (orderPlan: OrderPlan) => {
		return 3;
	}, []);

	const vioCountViewData = useCallback(async (orderPlan: OrderPlan) => {
		return 4;
	}, []);

	const allBodyCountViewData = useCallback(async (orderPlan: OrderPlan) => {
		return 5;
	}, []);

	const otherPartsCountViewData = useCallback(async (orderPlan: OrderPlan) => {
		return 6;
	}, []);

	return {
		faceCountViewData,
		limbsCountViewData,
		aroundBodyCountViewData,
		vioCountViewData,
		allBodyCountViewData,
		otherPartsCountViewData,
	};
};
