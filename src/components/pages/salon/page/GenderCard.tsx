import { Button } from "@chakra-ui/button";
import { Box, Center, HStack, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { transition } from "@chakra-ui/styled-system";
import { Slide, SlideFade } from "@chakra-ui/transition";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import menImg from "../../../../resorces/salon/men.jpg";
import ladyImg from "../../../../resorces/salon/lady.jpg";
import "../../../../App.css";
import { ImageAndTextBox } from "../../../atoms/box/ImageAndTextBox";

type Props = {
  // onClickNext: () => void;
  setGenderData: (data: string) => void;
  setAnimation: string;
};

export const GenderCard: VFC<Props> = memo((props) => {
  const { setGenderData, setAnimation } = props;
  const [change, setChange] = useState<string>("fade");
  const [selected, setSelected] = useState<string>("");

  const selectGender = useCallback(
    (data: string) => {
      setGenderData(data);
      setSelected(data);
    },
    [setGenderData]
  );

  useEffect(() => {
    setChange(setAnimation);
  }, [setAnimation]);

  return (
    <div className={change}>
      <Box m={"1.5rem"} textAlign="center">
        <Box>性別を選択</Box>
        <Box>「4」以降途中検索可能です</Box>
        <HStack justifyContent={"center"} wrap={"wrap"} my="1.5rem">
          <ImageAndTextBox
            targetValue={selected}
            value={"男性"}
            img={menImg}
            onClick={() => selectGender("男性")}
          />
          <ImageAndTextBox
            targetValue={selected}
            value={"女性"}
            img={ladyImg}
            onClick={() => selectGender("女性")}
          />
          {/* <Box
            w="14rem"
            shadow="xl"
            m={{ md: "2rem", sm: "0.5rem" }}
            cursor="pointer"
            onClick={() => selectGender("男性")}
            filter={
              selected === "男性" ? "brightness(50%)" : "brightness(100%)"
            }
          >
            <Image src={menImg} />
            <Text p={"1rem"} fontSize={{ md: "1rem", sm: "0.8rem" }}>
              男性
            </Text>
          </Box>
          <Box
            w="14rem"
            shadow="xl"
            m={{ md: "2rem", sm: "0.5rem !important" }}
            cursor="pointer"
            onClick={() => selectGender("女性")}
            filter={
              selected === "女性" ? "brightness(50%)" : "brightness(100%)"
            }
          >
            <Image src={ladyImg} />
            <Text p={"1rem"} fontSize={{ md: "1rem", sm: "0.8rem" }}>
              女性
            </Text>
          </Box> */}
        </HStack>
      </Box>
    </div>
  );
});
