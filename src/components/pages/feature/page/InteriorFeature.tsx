import { memo, VFC } from "react";
import { FeatureSearch } from "../FeatureSearch.tsx";

export const InteriorFeature: VFC = memo(() => {
	return <FeatureSearch title="内装が良い" />;
});
