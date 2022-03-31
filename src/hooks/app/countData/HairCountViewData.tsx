import { useCallback } from "react";
import { OrderPlan } from "../../../type/api/FirebaseType";
import { OriginPartsCountViewData } from "./OriginPartsCountViewData";

export const HairCountViewData = () => {
	const {
		faceCountViewData,
		limbsCountViewData,
		aroundBodyCountViewData,
		vioCountViewData,
		allBodyCountViewData,
		otherPartsCountViewData,
	} = OriginPartsCountViewData();

	const selectFunc = useCallback(
		async (value: string, orderPlan: OrderPlan) => {
			const countFunc: any = {};
			countFunc["Z000001"] = faceCountViewData;
			countFunc["Z000002"] = limbsCountViewData;
			countFunc["Z000003"] = aroundBodyCountViewData;
			countFunc["Z000004"] = vioCountViewData;
			countFunc["Z000005"] = allBodyCountViewData;
			countFunc["Z000006"] = otherPartsCountViewData;

			const func = countFunc[value];
			if (func) {
				return await countFunc[value](orderPlan);
			}
			return null;
		},
		[
			faceCountViewData,
			limbsCountViewData,
			aroundBodyCountViewData,
			vioCountViewData,
			allBodyCountViewData,
			otherPartsCountViewData,
		]
	);

	const softHairCountViewData = useCallback(
		async (orderPlan: OrderPlan) => {
			const checkFunc = await selectFunc(orderPlan.originParts, orderPlan);
			return checkFunc || 3000;
		},
		[selectFunc]
	);

	const standartHairViewData = useCallback(
		async (orderPlan: OrderPlan) => {
			const checkFunc = await selectFunc(orderPlan.originParts, orderPlan);
			return checkFunc || 3000;
		},
		[selectFunc]
	);

	const thickHairCountViewData = useCallback(
		async (orderPlan: OrderPlan) => {
			const checkFunc = await selectFunc(orderPlan.originParts, orderPlan);
			return checkFunc || 3000;
		},
		[selectFunc]
	);

	return {
		softHairCountViewData,
		standartHairViewData,
		thickHairCountViewData,
	};
};
