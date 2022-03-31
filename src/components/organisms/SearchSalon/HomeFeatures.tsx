import { Box, Flex, Image } from "@chakra-ui/react";
import { memo, useCallback, useState, VFC } from "react";
import clinicImg from "../../../resorces/clinic.jpg";
import { useHistory } from "react-router-dom";
import { HomeFeatureText } from "../../../type/app/BaseType";
import { ImageBox } from "../../molecules/ImageBox";

export const HomeFeatures: VFC = () => {
	const history = useHistory();

	const interior: HomeFeatureText = {
		img: clinicImg,
		text: "内装が豪華なクリニック",
		description: "内装が豪華なクリニックを紹介するお",
		path: "/feature/interior",
	};
	const visitFee: HomeFeatureText = {
		img: clinicImg,
		text: "初診・再診料無料のクリニック",
		description: "初診・再診料無料なクリニックを紹介するお",
		path: "/feature/visitFee",
	};
	const installments: HomeFeatureText = {
		img: clinicImg,
		text: "分割払い可能なクリニック",
		description: "分割払い可能なクリニックを紹介するお",
		path: "/feature/installments",
	};
	const privateRoom: HomeFeatureText = {
		img: clinicImg,
		text: "完全個室のクリニック",
		description: "完全個室なクリニックを紹介するお",
		path: "/feature/privateRoom",
	};
	const anesthesia: HomeFeatureText = {
		img: clinicImg,
		text: "麻酔無料のクリニック",
		description: "麻酔無料なクリニックを紹介するお",
		path: "/feature/anesthesia",
	};
	const sutudentDiscount: HomeFeatureText = {
		img: clinicImg,
		text: "学生料金（学割）のあるクリニック",
		description: "学生料金のあるクリニックを紹介するお",
		path: "/feature/sutudentDiscount",
	};

	const datas: HomeFeatureText[] = [
		interior,
		visitFee,
		installments,
		privateRoom,
		anesthesia,
		sutudentDiscount,
	];

	return (
		<Flex wrap={"wrap"} w={"80%"} m={"auto"} justifyContent={"center"}>
			{datas.map((data, i) => (
				<ImageBox homeFeature={data} key={i} />
			))}
		</Flex>
	);
};
