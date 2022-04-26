import { Button } from "@chakra-ui/button";
import { Box, Center, Flex, Text } from "@chakra-ui/layout";
import { Image, Stack } from "@chakra-ui/react";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { useHistory } from "react-router";

import { BaseButton } from "../atoms/button/BaseButton";
import { HomeFeaturesBoxList } from "../organisms/boxList/HomeFeaturesBoxList";
import { HomeSearchBoxList } from "../organisms/boxList/HomeSearchBoxList";
import { FeatureBoxList } from "../organisms/boxList/FeatureBoxList";
import { FeatureApi } from "../../hooks/api/FeatureApi";
import { FeatureDto } from "../../type/api/dto/FeatureDto";
import { HomeHook } from "../../hooks/app/top/HomeHook";
import { FeatureViewData } from "../../type/app/FeatureViewData";
import { TopResource } from "../../resorces/TopResource";

export const Home: VFC = memo(() => {
  const { getAllFeature } = FeatureApi();
  const { getFeatureString } = HomeHook();
  const history = useHistory();

  const [featureData, setFeatureData] = useState<FeatureViewData[]>([]);

  const getAllFeatureFunc = useCallback(async () => {
    const data = await getAllFeature();
    const featureData = getFeatureString(data);
    setFeatureData(featureData);
  }, [getAllFeature, getFeatureString]);

  const pushLink = useCallback(
    (path: string) => {
      history.push(path);
    },
    [history]
  );

  useEffect(() => {
    getAllFeatureFunc();
  }, [getAllFeatureFunc]);

  return (
    <Box>
      <Flex pos="relative">
        <Box
          pos="absolute"
          top={{ md: "25%", sm: "15%" }}
          left={{ md: "10%", sm: "5%" }}
          fontSize={{ md: "1.5rem", sm: "1rem" }}
          fontWeight="bold"
          color={"#fff"}
        >
          <Stack
            spacing={"5px"}
            w={{ md: "100%", sm: "80%" }}
            // bg={"rgba(170,170,170,0.5)"}
            textShadow={"1px 1px 2px #000"}
          >
            <Text>東京都の激戦5区からほぼ全てのクリニックを分析。</Text>
            <Text>決して安くはない経験だからこそ、</Text>
            <Text>あなたのための正しい脱毛を。</Text>
          </Stack>
          {/* <Box mt={"5px"}>
            <BaseButton
              text={"プランを探す"}
              path={"/salon"}
              size={"lg"}
              base={"gold"}
            />
          </Box> */}
        </Box>
        <Image
          src={TopResource.topImg}
          w={{ md: "100%", sm: "90rem" }}
          h={{ md: "100%", sm: "18rem" }}
          objectFit={"cover"}
          boxShadow="2xl"
        />
      </Flex>
      <Box>
        <Box w={"80%"} mt={"4rem"} mx={"auto"}>
          <Flex wrap={"wrap"} justifyContent={"center"} alignItems={"center"}>
            {/* <Box w="22rem">
              <Image src={textImg} />
            </Box> */}
            <Stack
              p={{ md: "1rem", sm: "1rem 0" }}
              spacing={"1rem"}
              fontSize={"0.9rem"}
            >
              {/* <Text fontSize={"1.2rem"} fontWeight={"bold"}>
                「こんなはずじゃなかった」
              </Text> */}
              <Text>度々生じてしまうトラブルやアンマッチ。</Text>
              {/* <Text>
                カウンセリングの度に強引さを感じてしまう営業や、どう決めれば良いのかわからない脱毛プラン。
              </Text>
              <Text>
                そんな悩みを解消するべく、東京都の脱毛激戦である新宿区・渋谷区・中央区・港区・豊島区のほぼ全てのクリニック
                から脱毛プランの詳細を集計しました。
              </Text> */}
              {/* <Text>
                初めて脱毛する方から経験されたことのある方まで、最適なプランのご紹介にご協力致します。
              </Text> */}
              <Text>
                決して安くはない経験だからこそ、あなたのための正しい脱毛を。
              </Text>
              <Text textAlign={"center"}></Text>
            </Stack>
          </Flex>
        </Box>
        <Box mt={"4rem"} borderBottom={"1px"}></Box>
        <Box display={"inline-block"} ml={"3rem"}>
          <Box w={"100%"} borderTop={"4px"} borderColor={"#000"}></Box>
          <Text fontSize={"1.5rem"} display={"inline-block"}>
            検索
          </Text>
        </Box>
        <HomeSearchBoxList />
        <Box mt={"4rem"} borderBottom={"1px"}></Box>
        <Box display={"inline-block"} ml={"3rem"}>
          <Box w={"100%"} borderTop={"4px"} borderColor={"#000"}></Box>
          <Text fontSize={"1.5rem"} display={"inline-block"}>
            NEWS
          </Text>
        </Box>
        <Box w="80%" m={"auto"}>
          <Box>リリースしました</Box>
        </Box>
        <Box mt={"4rem"} borderBottom={"1px"}></Box>
        <Box display={"inline-block"} ml={"3rem"}>
          <Box w={"100%"} borderTop={"4px"} borderColor={"#000"}></Box>
          <Text fontSize={"1.5rem"} display={"inline-block"}>
            特集
          </Text>
        </Box>
        <Box w={"80%"} mx={"auto"}>
          {featureData.map((feature, i) => (
            <Box key={i}>
              <Text fontSize={"1.2rem"} fontWeight={"bold"} m={"0.5rem"}>
                {feature.title}
              </Text>
              <FeatureBoxList
                clinics={feature.datas}
                onClick={() => pushLink(feature.path)}
                itemWidth={"15rem"}
              />
            </Box>
          ))}
          {/* <HomeFeaturesBoxList /> */}
        </Box>
      </Box>
    </Box>
  );
});
