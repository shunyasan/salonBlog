import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Center, HStack, Text, Wrap, WrapItem } from "@chakra-ui/layout";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import "../../../../App.css";
import { OriginCategoryApi } from "../../../../hooks/api/OriginCategoryApi";
import { OriginCategory } from "../../../../type/api/OriginCategory";
import { QueryOrderPlan } from "../../../../type/app/BaseType";

type Props = {
  setOriginPartsSelectData: (data: any) => void;
  orderPlan: QueryOrderPlan;
};

export const OriginPartsSelectCard: VFC<Props> = memo((props) => {
  const { setOriginPartsSelectData, orderPlan } = props;
  const [change, setChange] = useState<string>("fade");
  const [selected, setSelected] = useState<string>("");
  const [originParts, setOriginParts] = useState<OriginCategory[] | null>([]);

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
    console.log(originCategory);
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
          <Wrap my={4} spacing="10" justify="center">
            {originParts.map((data) => (
              <WrapItem
                key={data.id}
                w="220px"
                shadow="xl"
                cursor="pointer"
                onClick={() => selectAboutPartsSelect(data.id)}
                filter={
                  selected === data.id ? "brightness(50%)" : "brightness(100%)"
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
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      </div>
    )
  );
});
