import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Center, HStack, Text } from "@chakra-ui/layout";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import "../../../../App.css";
import { HairResource } from "../../../../resorces/HairResource";
import { SkinResource } from "../../../../resorces/SkinResource";
import { ImageAndTextBox } from "../../../atoms/box/ImageAndTextBox";

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
          <HStack my="1.5rem" wrap={"wrap"} justifyContent={"center"}>
            <ImageAndTextBox
              targetValue={selected}
              value={"白色"}
              img={SkinResource.whiteImg}
              onClick={() => selectProps("白色")}
            />
            <ImageAndTextBox
              targetValue={selected}
              value={"薄茶色"}
              img={SkinResource.baigeImg}
              onClick={() => selectProps("薄茶色")}
            />
            <ImageAndTextBox
              targetValue={selected}
              value={"色黒"}
              img={SkinResource.darkImg}
              onClick={() => selectProps("色黒")}
            />
            {/* <Box
              w={"14rem"}
              m={{ md: "2rem", sm: "0.5rem" }}
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
              w={"14rem"}
              shadow="xl"
              m={{ md: "2rem", sm: "0.5rem" }}
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
              w={"14rem"}
              shadow="xl"
              m={{ md: "2rem", sm: "0.5rem" }}
              cursor="pointer"
              onClick={() => selectProps("色黒")}
              filter={
                selected === "色黒" ? "brightness(50%)" : "brightness(100%)"
              }
            >
              <Image src={darkImg} />
              <Text p="5">色黒</Text>
            </Box> */}
          </HStack>
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
