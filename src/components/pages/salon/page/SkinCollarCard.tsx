import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Center, HStack, Text } from "@chakra-ui/layout";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import whiteImg from "../../../../resorces/salon/skin/white.jpg";
import baigeImg from "../../../../resorces/salon/skin/baige.jpg";
import darkImg from "../../../../resorces/salon/skin/dark.jpg";
import "../../../../App.css";

type Props = {
  setSkinCollorData: (data: any) => void;
};

export const SkinCollorCard: VFC<Props> = memo((props) => {
  const [change, setChange] = useState<string>("fade");
  const [selected, setSelected] = useState<string>("");

  const { setSkinCollorData } = props;

  const selectProps = useCallback(
    (data: string) => {
      setSkinCollorData(data);
      setSelected(data);
    },
    [setSkinCollorData]
  );

  return (
    <>
      <div className={change ? change : ""}>
        <Box m={6} textAlign="center">
          <Box>自身の肌の色を選択</Box>
          <Box m={2}>※検索後も変更できます</Box>
          <Center m="16">
            <HStack spacing="10">
              <Box
                w="220px"
                shadow="xl"
                cursor="pointer"
                onClick={() => selectProps("白色")}
                filter={
                  selected === "白色" ? "brightness(50%)" : "brightness(100%)"
                }
              >
                <Image src={whiteImg} />
                <Text p="5">白色</Text>
              </Box>
              <Box
                w="220px"
                shadow="xl"
                cursor="pointer"
                onClick={() => selectProps("薄茶色")}
                filter={
                  selected === "薄茶色" ? "brightness(50%)" : "brightness(100%)"
                }
              >
                <Image src={baigeImg} />
                <Text p="5">薄茶色</Text>
              </Box>
              <Box
                w="220px"
                shadow="xl"
                cursor="pointer"
                onClick={() => selectProps("色黒")}
                filter={
                  selected === "色黒" ? "brightness(50%)" : "brightness(100%)"
                }
              >
                <Image src={darkImg} />
                <Text p="5">色黒</Text>
              </Box>
            </HStack>
          </Center>
          {/* <Box m="14">
						<Button mx="7" onClick={PrevClick}>
							戻る
						</Button>
						<Button mx="7" onClick={NextClick}>
							次へ
						</Button>
					</Box> */}
        </Box>
      </div>
    </>
  );
});
