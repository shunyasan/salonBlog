import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Center, HStack, Text } from "@chakra-ui/layout";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import "../../../../App.css";
import { QueryKey } from "../../../../enums/QueryKey";
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
      const param = `${QueryKey.skinCollor}=${data}&`;
      setSkinCollorData(param);
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
          </HStack>
        </Box>
      </div>
    </>
  );
});
