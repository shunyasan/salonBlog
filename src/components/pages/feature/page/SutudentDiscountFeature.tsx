import { memo, VFC } from "react";
import { FeatureSearch } from "../FeatureSearch.tsx";

export const SutudentDiscountFeature: VFC = memo(() => {
	return <FeatureSearch title="学生の料金" />;
});
