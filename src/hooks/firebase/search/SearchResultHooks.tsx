import { useCallback } from "react";
import { OrderPlan } from "../../../type/api/FirebaseType";
import { AboutPartsFirestore } from "../salon/AboutPartsFirestore";
import { OriginPartsFirestore } from "../salon/OriginPartsFirestore";
import { PartsCardFirestore } from "../salon/PartsCardFirestore";
import { ChangeFormatForView } from "../salon/changeFormat/ChangeFormatForView";
import {
	OrderPlanIdName,
	ViewDataIdName,
	ViewDataIdNameAndTitle,
} from "../../../type/api/ViewTypeFromFirebase";

export const SearchResultHooks = () => {
	const { getOriginCategoryOrderByTargetId } = OriginPartsFirestore();
	const { getAboutPartsCategoryOrderByTargetId, getPartsCategoryById } =
		AboutPartsFirestore();
	const { getPartsOrderByTargetId, getParts } = PartsCardFirestore();
	const { changeFormatViewDataIdNameArray } = ChangeFormatForView();

	const noneValuePush = useCallback((): ViewDataIdName => {
		return { id: "none", name: "指定しない" };
	}, []);

	const getSortOrFindAboutParts = useCallback(
		async (originPartsId: string, aboutPartsId: string) => {
			const data = await getAboutPartsCategoryOrderByTargetId(
				originPartsId,
				aboutPartsId
			);
			return data;
		},
		[getAboutPartsCategoryOrderByTargetId]
	);

	const getSortOrFindParts = useCallback(
		async (orderParams: OrderPlanIdName, partsId: string) => {
			if (orderParams.aboutParts && orderParams.parts) {
				if (orderParams.parts.id !== "none") {
					const data = await getPartsOrderByTargetId(
						orderParams.aboutParts.id,
						orderParams.parts.id
					);
					data.push(noneValuePush());
					return data;
				}
			}
			const parts = await getParts(partsId);
			const data = await changeFormatViewDataIdNameArray(parts);
			data.unshift(noneValuePush());
			return data;
		},
		[
			getParts,
			getPartsOrderByTargetId,
			changeFormatViewDataIdNameArray,
			noneValuePush,
		]
	);

	const createResearchPartsData = useCallback(
		async (orderParams: OrderPlanIdName) => {
			const origin = await getOriginCategoryOrderByTargetId(
				orderParams.originParts?.id
			);
			const aboutParts = await getSortOrFindAboutParts(
				orderParams.originParts.id,
				orderParams.aboutParts.id
			);
			const parts = await getSortOrFindParts(orderParams, aboutParts[0].id);
			const createdData: ViewDataIdNameAndTitle[] = [
				{
					title: "広域カテゴリ",
					value: origin,
				},
				{
					title: "詳細カテゴリ",
					value: aboutParts,
				},
				{
					title: "部位",
					value: parts,
				},
			];
			return createdData;
		},
		[
			getOriginCategoryOrderByTargetId,
			getSortOrFindAboutParts,
			getSortOrFindParts,
		]
	);

	return { createResearchPartsData };
};
