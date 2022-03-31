import { memo, VFC } from "react";
import { FeatureSearch } from "../FeatureSearch.tsx";

export const PrivateRoomFeature: VFC = memo(() => {
	return <FeatureSearch title="個室が良い" />;
});
