import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Center, HStack, Text, Wrap, WrapItem } from "@chakra-ui/layout";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import "../../../../App.css";
import { OriginCategoryApi } from "../../../../hooks/api/OriginCategoryApi";
import { OriginCategory } from "../../../../type/api/OriginCategory";
import { QueryOrderPlan } from "../../../../type/app/QueryOrderPlan";
import { ImageAndTextBox } from "../../../atoms/box/ImageAndTextBox";
import { NarrowImageAndTextBox } from "../../../atoms/box/NarrowImageAndTextBox";

type Props = {
  setOriginPartsSelectData: (data: any) => void;
  orderPlan: QueryOrderPlan;
};

export const OriginPartsSelectCard: VFC<Props> = memo((props) => {
  const { setOriginPartsSelectData, orderPlan } = props;
  const [change, setChange] = useState<string>("fade");
  const [selected, setSelected] = useState<string>("");
  const [originParts, setOriginParts] = useState<OriginCategory[]>([]);

  const { getAllOriginCategory } = OriginCategoryApi();

  const selectAboutPartsSelect = useCallback(
    (aboutCategory: string) => {
      setOriginPartsSelectData(aboutCategory);
      setSelected(aboutCategory);
    },
    [setOriginPartsSelectData]
  );

  const getOriginParts = useCallback(async () => {
    const originCategory = await getAllOriginCategory();
    setOriginParts(originCategory);
  }, [getAllOriginCategory]);

  useEffect(() => {
    getOriginParts();
  }, [getOriginParts]);

  return (
    originParts && (
      <div className={change}>
        <Box m={6} textAlign="center">
          <Box>大まかな部位を選択</Box>
          <HStack justifyContent={"center"} wrap={"wrap"} my="1.5rem">
            {originParts.map((data) => (
              <>
                <NarrowImageAndTextBox
                  key={data.id}
                  targetValue={selected}
                  value={data.name}
                  img={
                    orderPlan.gender === "男性"
                      ? data.imgUrlMen
                      : data.imgUrlLady
                  }
                  id={data.id}
                  onClick={() => selectAboutPartsSelect(data.id)}
                />
                {/* <WrapItem
                  key={data.id}
                  w={{}}
                  shadow="xl"
                  cursor="pointer"
                  onClick={() => selectAboutPartsSelect(data.id)}
                  filter={
                    selected === data.id
                      ? "brightness(50%)"
                      : "brightness(100%)"
                  }
                >
                  <Box>
                    <Image
                      src={
                        orderPlan.gender === "男性"
                          ? data.imgUrlMen
                          : data.imgUrlLady
                      }
                    />
                    <Text p="5">{data.name}</Text>
                  </Box>
                </WrapItem> */}
              </>
            ))}
          </HStack>
        </Box>
      </div>
    )
  );
});
