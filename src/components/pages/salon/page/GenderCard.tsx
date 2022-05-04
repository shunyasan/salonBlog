import { Button } from "@chakra-ui/button";
import { Box, Center, HStack, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { transition } from "@chakra-ui/styled-system";
import { Slide, SlideFade } from "@chakra-ui/transition";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import "../../../../App.css";
import { QueryKey } from "../../../../enums/QueryKey";
import { ManResource } from "../../../../resorces/ManResource";
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
      const param = `${QueryKey.gender}=${data}&`;
      setGenderData(param);
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
        <Box>性別を選択してください</Box>
        <HStack justifyContent={"center"} wrap={"wrap"} my="1.5rem">
          <ImageAndTextBox
            targetValue={selected}
            value={"男性"}
            img={ManResource.menImg}
            onClick={() => selectGender("男性")}
          />
          <ImageAndTextBox
            targetValue={selected}
            value={"女性"}
            img={ManResource.ladyImg}
            onClick={() => selectGender("女性")}
          />
        </HStack>
      </Box>
    </div>
  );
});
