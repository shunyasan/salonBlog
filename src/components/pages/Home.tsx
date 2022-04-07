import { Button } from "@chakra-ui/button";
import { Box, Center, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { memo, useCallback, useEffect, VFC } from "react";
import { useHistory } from "react-router";
import testImg from "../../resorces/top-image.jpg";
import textImg from "../../resorces/22223019_l.jpg";
import clinicImg from "../../resorces/clinic.jpg";
import { BaseButton } from "../atoms/button/BaseButton";
import { HomeFeaturesBoxList } from "../organisms/boxList/HomeFeaturesBoxList";
import { HomeSearchBoxList } from "../organisms/boxList/HomeSearchBoxList";

export const Home: VFC = memo(() => {
  const history = useHistory();

  return (
    <Box>
      <Flex pos="relative">
        <Box
          pos="absolute"
          top="20%"
          left="15%"
          fontSize="40px"
          fontWeight="bold"
          color={"#fff"}
        >
          <Text>あなたの脱毛</Text>
          <BaseButton
            text={"プランを探す"}
            path={"/salon"}
            size={"lg"}
            base={"gold"}
          />
        </Box>
        <Image src={testImg} maxW="100%" boxShadow="2xl" />
      </Flex>
      <Box>
        <Box w={"80%"} mt={"4rem"} mx={"auto"}>
          <Flex wrap={"wrap"} justifyContent={"center"}>
            <Box w="22rem">
              <Image src={textImg} />
            </Box>
            <Box w="22rem" p={"1rem"}>
              <Text>プランの詳細を施術前に知ることができる</Text>
              <Text>
                東京都の脱毛激戦である新宿区・渋谷区・中央区・港区・豊島区のほぼ全てのクリニックから脱毛プランを集計しました。
              </Text>
              <Text>
                初めて脱毛する方から経験されたことのある方まで、最適なプランのご提案に協力します
              </Text>
              <Text textAlign={"center"}></Text>
            </Box>
          </Flex>
          {/* <Box textAlign={"center"} mt={"2rem"}>
						<BaseButton
							text={"プランを探す"}
							path={"/salon"}
							size={"lg"}
							base={"gold"}
						/>
					</Box> */}
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
        <HomeFeaturesBoxList />
      </Box>
    </Box>
  );
});
