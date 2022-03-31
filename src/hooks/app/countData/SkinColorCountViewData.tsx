import { useCallback } from "react";
import { OrderPlan } from "../../../type/api/FirebaseType";
import { HairCountViewData } from "./HairCountViewData";

export const SkinColorCountViewData = () => {
	const {
		softHairCountViewData,
		standartHairViewData,
		thickHairCountViewData,
	} = HairCountViewData();

	const selectFunc = useCallback(
		async (value: string, orderPlan: OrderPlan) => {
			const countFunc: any = {};
			countFunc["産毛"] = softHairCountViewData;
			countFunc["標準"] = standartHairViewData;
			countFunc["太い"] = thickHairCountViewData;

			const func = countFunc[value];
			if (func) {
				return await countFunc[value](orderPlan);
			}
			return null;
		},
		[softHairCountViewData, standartHairViewData, thickHairCountViewData]
	);

	const fairSkinCountViewData = useCallback(
		async (orderPlan: OrderPlan) => {
			const checkFunc = await selectFunc(orderPlan.hair, orderPlan);
			return checkFunc || 3000;
		},
		[selectFunc]
	);

	const baigeSkinViewData = useCallback(
		async (orderPlan: OrderPlan) => {
			const checkFunc = await selectFunc(orderPlan.hair, orderPlan);
			return checkFunc || 4000;
		},
		[selectFunc]
	);

	const darkSkinCountViewData = useCallback(
		async (orderPlan: OrderPlan) => {
			const checkFunc = await selectFunc(orderPlan.hair, orderPlan);
			return checkFunc || 5000;
		},
		[selectFunc]
	);

	return { fairSkinCountViewData, baigeSkinViewData, darkSkinCountViewData };
};
