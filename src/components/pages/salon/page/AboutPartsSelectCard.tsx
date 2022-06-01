import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Center, HStack, Text, Wrap, WrapItem } from "@chakra-ui/layout";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import "../../../../App.css";
import { QueryKey } from "../../../../enums/QueryKey";
import { AboutCategoryApi } from "../../../../hooks/api/AboutCategoryApi";
import { AboutCategory } from "../../../../type/api/AboutCategory";
import { QueryOrderPlan } from "../../../../type/app/QueryOrderPlan";
import { NarrowImageAndTextBox } from "../../../atoms/box/NarrowImageAndTextBox";

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
    (data: string) => {
      const param = `${QueryKey.aboutCategory}=${data}&`;
      setAboutPartsSelectData(param);
      setSelected(data);
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
          <Box>脱毛したい部位カテゴリを選択してください</Box>
          <HStack justifyContent={"center"} wrap={"wrap"} my="1.5rem">
            {/* <Wrap my={4} spacing="1rem" justify="center"> */}
            {aboutParts?.map((data) => (
              <NarrowImageAndTextBox
                key={data.id}
                targetValue={selected}
                value={data.name}
                img={
                  orderPlan.gender === "男性" ? data.imgUrlMen : data.imgUrlLady
                }
                id={data.id}
                onClick={() => selectAboutPartsSelect(data.id)}
              />
            ))}
          </HStack>
        </Box>
      </div>
    )
  );
});
