import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { memo, useCallback, useState, VFC } from "react";
import planImg from "../../../resorces/plan-icon.jpg";
import { useHistory } from "react-router-dom";
import { HomeFeatureText } from "../../../type/app/BaseType";
import { ImageBox } from "../../molecules/ImageBox";

export const HomeSearch: VFC = () => {
	const history = useHistory();

	const plan: HomeFeatureText = {
		img: planImg,
		text: "プランを探す",
		description: "カスタマイズ性の広い検索方法だお",
		path: "/salon",
	};
	const clinic: HomeFeatureText = {
		img: planImg,
		text: "クリニックを探す",
		description: "クリニックから選ぶ検索方法だお",
		path: "",
	};
	const clinicList: HomeFeatureText = {
		img: planImg,
		text: "クリニック一覧",
		description: "掲載しているクリニックの一覧",
		path: "",
	};
	const partsList: HomeFeatureText = {
		img: planImg,
		text: "施術部位一覧",
		description: "掲載している施術可能な部位の一覧",
		path: "",
	};
	const datas: HomeFeatureText[] = [plan, clinic, clinicList, partsList];

	return (
		<Flex wrap={"wrap"} w={"90%"} m={"auto"} justifyContent={"space-around"}>
			{datas.map((data, i) => (
				<ImageBox homeFeature={data} width={"17rem"} key={i} />
			))}
		</Flex>
	);
};
