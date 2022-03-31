import { useCallback } from "react";
import { OrderPlan } from "../../../type/api/FirebaseType";
import { QueryOrderPlan } from "../../../type/app/BaseType";
import { SkinColorCountViewData } from "./SkinColorCountViewData";

export const GenderCountViewData = () => {
	const { fairSkinCountViewData, baigeSkinViewData, darkSkinCountViewData } =
		SkinColorCountViewData();

	const selectFunc = useCallback(
		async (value: string, orderPlan: OrderPlan) => {
			const countFunc: any = {};
			countFunc["白色"] = fairSkinCountViewData;
			countFunc["薄茶色"] = baigeSkinViewData;
			countFunc["色黒"] = darkSkinCountViewData;

			const func = countFunc[value];
			if (func) {
				return await countFunc[value](orderPlan);
			}
			return null;
		},
		[fairSkinCountViewData, baigeSkinViewData, darkSkinCountViewData]
	);

	const ladyCountViewData = useCallback(
		async (orderPlan: OrderPlan) => {
			const checkFunc = await selectFunc(orderPlan.skinCollor, orderPlan);
			return checkFunc || 100;
		},
		[selectFunc]
	);

	const menCountViewData = useCallback(
		async (orderPlan: OrderPlan) => {
			const checkFunc = await selectFunc(orderPlan.skinCollor, orderPlan);
			return checkFunc || 200;
		},
		[selectFunc]
	);

	const findCountViewData = useCallback(
		(queryOrderPlan: QueryOrderPlan) => {
			const countData: any = {};
			countData["男性"] = menCountViewData;
			countData["女性"] = ladyCountViewData;

			const func = queryOrderPlan.gender && countData[queryOrderPlan.gender];
			if (func) {
				return func(queryOrderPlan);
			}
		},
		[ladyCountViewData, menCountViewData]
	);

	return { findCountViewData };
};
