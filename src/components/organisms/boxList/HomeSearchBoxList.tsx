import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { VFC } from "react";
import { useHistory } from "react-router-dom";
import { ImageBox } from "../../molecules/box/ImageBox";
import { HomeFeatureText } from "../../../type/app/HomeFeatureText";
import { TopResource } from "../../../resorces/TopResource";

export const HomeSearchBoxList: VFC = () => {
  const history = useHistory();

  const plan: HomeFeatureText = {
    img: TopResource.planImg,
    text: "プランを探す",
    description:
      "自身の特徴や施術に求めることを選択し、あなたのための脱毛プランを検索します",
    path: "/salon",
  };
  // const clinic: HomeFeatureText = {
  //   img: planImg,
  //   text: "クリニックを探す",
  //   description: "クリニックから選ぶ検索方法だお",
  //   path: "",
  // };
  const partsList: HomeFeatureText = {
    img: TopResource.partsImg,
    text: "施術部位一覧",
    description:
      "各クリニックを分析して、全クリニック共通の表記にした施術可能な部位一覧",
    path: "/treatment-parts",
  };
  const clinicList: HomeFeatureText = {
    img: TopResource.clinicImg,
    text: "クリニック一覧",
    description: "東京都の中でも、激戦区である主要５区ほぼ全てのクリニック一覧",
    path: "/clinic",
  };
  const datas: HomeFeatureText[] = [plan, partsList, clinicList];

  return (
    <Flex wrap={"wrap"} w={"90%"} m={"auto"} justifyContent={"space-evenly"}>
      {datas.map((data, i) => (
        <ImageBox
          homeFeature={data}
          width={{ md: "19rem", sm: "17rem" }}
          height={{ md: "2rem", sm: "inherit" }}
          key={i}
        />
      ))}
    </Flex>
  );
};
