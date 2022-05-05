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
  setQueryData: (data: string) => void;
};

export const YourselfCard: VFC<Props> = memo((props) => {
  const [change, setChange] = useState<string>("fade");
  const [selecteSkin, setSelecteSkin] = useState<string>("薄茶色");
  const [selecteHair, setSelecteHair] = useState<string>("標準");
  const [selectePay, setSelectePay] = useState<string>("");
  const [selected, setSelected] = useState<string>("");

  const { setQueryData } = props;

  const createQuery = useCallback(() => {
    const skin = `${QueryKey.skinCollor}=${selecteSkin}&`;
    const hair = `${QueryKey.hair}=${selecteHair}&`;
    const pay = `${QueryKey.paySystem}=${selectePay}&`;
    setQueryData(skin + hair + pay);
  }, [selecteSkin, selecteHair, selectePay, setQueryData]);

  return (
    <>
      <div className={change ? change : ""}>
        <Box m={6} textAlign="center">
          <Box>
            <Text>自身の肌の色を選択してください</Text>
            <HStack my="1.5rem" wrap={"wrap"} justifyContent={"center"}>
              <ImageAndTextBox
                targetValue={selected}
                value={"白色"}
                img={SkinResource.whiteImg}
                onClick={() => setSelecteSkin("白色")}
              />
              <ImageAndTextBox
                targetValue={selected}
                value={"薄茶色"}
                img={SkinResource.baigeImg}
                onClick={() => setSelecteSkin("薄茶色")}
              />
              <ImageAndTextBox
                targetValue={selected}
                value={"色黒"}
                img={SkinResource.darkImg}
                onClick={() => setSelecteSkin("色黒")}
              />
            </HStack>
          </Box>
          <Box>
            <Box>脱毛をする箇所の毛量を選択してください</Box>
            <HStack justifyContent={"center"} wrap={"wrap"} my="1.5rem">
              <ImageAndTextBox
                targetValue={selected}
                value={"細い（産毛）"}
                img={HairResource.softHair}
                onClick={() => setSelecteHair("産毛")}
                id={"産毛"}
              />
              <ImageAndTextBox
                targetValue={selected}
                value={"標準"}
                img={HairResource.standardHair}
                onClick={() => setSelecteHair("標準")}
              />
              <ImageAndTextBox
                targetValue={selected}
                value={"太い"}
                img={HairResource.hardHair}
                onClick={() => setSelecteHair("太い")}
              />
            </HStack>
          </Box>
          <Box m={6} textAlign="center">
            <Box>どちらの料金を重視するか選択してください</Box>
            <HStack justifyContent={"center"} wrap={"wrap"} my="1.5rem">
              <Box
                w="18rem"
                shadow="0 0 2px 2px #777"
                cursor="pointer"
                py="0.5rem"
                m={{ md: "2rem !important", sm: "1rem !important" }}
                onClick={() => setSelectePay("総額")}
                bg={selected === "総額" ? "#aaa" : ""}
              >
                <Text as={"a"}>施術の</Text>
                <Text as={"a"} fontSize={"2rem"}>
                  総額
                </Text>
                <Text as={"a"}>料金を重視</Text>
              </Box>
              <Box
                w="18rem"
                shadow="0 0 2px 2px #777"
                cursor="pointer"
                py="0.5rem"
                m={{ md: "2rem !important", sm: "1rem !important" }}
                onClick={() => setSelectePay("１回分")}
                bg={selected === "１回分" ? "#aaa" : ""}
              >
                <Text as={"a"}>施術の</Text>
                <Text as={"a"} fontSize={"2rem"}>
                  １回分
                </Text>
                <Text as={"a"}>料金を重視</Text>
              </Box>
            </HStack>
          </Box>
        </Box>
        <Center>
          <Button onClick={createQuery}>次へ</Button>
        </Center>
      </div>
    </>
  );
});
