import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Center, HStack, Text, Wrap, WrapItem } from "@chakra-ui/layout";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import "../../../../App.css";
import { AboutCategoryApi } from "../../../../hooks/api/AboutCategoryApi";
import { AboutCategory } from "../../../../type/api/ApiType";
import { QueryOrderPlan } from "../../../../type/app/BaseType";

type Props = {
  setAboutPartsSelectData: (data: any) => void;
  orderPlan: QueryOrderPlan;
};

export const AboutPartsSelectCard: VFC<Props> = memo((props) => {
  const { setAboutPartsSelectData, orderPlan } = props;
  const [change, setChange] = useState<string>("fade");
  const [selected, setSelected] = useState<string>("");
  const [aboutParts, setAboutParts] = useState<AboutCategory[]>([]);

  const { getAboutCategoryByOriginId } = AboutCategoryApi();

  const selectAboutPartsSelect = useCallback(
    (aboutParts: string) => {
      setAboutPartsSelectData(aboutParts);
      setSelected(aboutParts);
    },
    [setAboutPartsSelectData]
  );

  const getAboutParts = useCallback(async () => {
    if (orderPlan.originParts) {
      const res = await getAboutCategoryByOriginId(orderPlan.originParts);
      setAboutParts(res);
    }
  }, [getAboutCategoryByOriginId, orderPlan]);

  useEffect(() => {
    getAboutParts();
  }, [getAboutParts]);

  return (
    aboutParts && (
      <div className={change}>
        <Box m={6} textAlign="center">
          <Box>詳細の部位を選択</Box>
          <Wrap my={4} spacing="10" justify="center">
            {aboutParts?.map((data) => (
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
