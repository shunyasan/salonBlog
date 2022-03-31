import { memo, VFC } from "react";
import { FeatureSearch } from "../FeatureSearch.tsx";

export const VisitFeeFeature: VFC = memo(() => {
	return <FeatureSearch title="初診料が無料" />;
});
