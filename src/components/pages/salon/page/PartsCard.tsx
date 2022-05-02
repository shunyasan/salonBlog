import { Box, Stack, Text } from "@chakra-ui/layout";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { PartsButton } from "../../../atoms/button/PartsButton";
import { Image } from "@chakra-ui/react";
import { AboutCategoryApi } from "../../../../hooks/api/AboutCategoryApi";
import { BasePartsApi } from "../../../../hooks/api/BasePartsApi";
import { AboutCategory } from "../../../../type/api/AboutCategory";
import { IdAndNameDto } from "../../../../type/api/dto/IdAndNameDto";
import { QueryOrderPlan } from "../../../../type/app/QueryOrderPlan";

type Props = {
  setPartsData: (data: any) => void;
  orderPlan: QueryOrderPlan;
};

export const PartsCard: VFC<Props> = memo((props) => {
  const { getAboutCategoryById } = AboutCategoryApi();
  const { getAllBasePartsIdAndName } = BasePartsApi();

  const [change, setChange] = useState<string>("fade");
  const [selected, setSelected] = useState<string>("");
  const [parts, setParts] = useState<IdAndNameDto[]>([]);
  const [AboutCategory, setAboutParts] = useState<AboutCategory>();

  //Partsリストの表示(state)
  const [partsList, setPartsList] = useState<string[]>([]);

  const { setPartsData, orderPlan } = props;

  const selectParts = useCallback(
    (data) => {
      setSelected(data);
      setPartsData(data);
    },
    [setPartsData]
  );

  const getAboutPartsById = useCallback(async () => {
    if (orderPlan.AboutCategory) {
      const res = await getAboutCategoryById(orderPlan.AboutCategory);
      if (res) {
        setAboutParts(res);
      }
    }
  }, [getAboutCategoryById, orderPlan]);

  const getPartsById = useCallback(async () => {
    if (orderPlan.AboutCategory) {
      const res: IdAndNameDto[] = await getAllBasePartsIdAndName(
        orderPlan.AboutCategory
      );
      setParts(res);
    }
  }, [getAllBasePartsIdAndName, orderPlan]);

  useEffect(() => {
    getPartsById();
    getAboutPartsById();
  }, [getPartsById, getAboutPartsById]);

  return (
    parts && (
      <div className={change ? change : ""}>
        <Box m={"1rem"} textAlign="center">
          <Box>脱毛したい部位を選択してください</Box>
          <Stack
            w={{ md: "65%", sm: "85%" }}
            mx={"auto"}
            my="1.5rem"
            justifyContent={"center"}
            wrap="wrap"
            spacing={"0"}
          >
            <Box w={"16rem"} m={"auto"}>
              <Image
                src={
                  orderPlan.gender === "女性"
                    ? AboutCategory?.imgUrlLady
                    : AboutCategory?.imgUrlMen
                }
              />
              <Text p="1.5rem">{AboutCategory?.name}</Text>
            </Box>
            <Box>
              {parts.map((data) => (
                <PartsButton
                  key={data.id}
                  text={data.name}
                  onClick={() => selectParts(data.id)}
                  filter={selected === data.id}
                />
              ))}
            </Box>
          </Stack>
        </Box>
      </div>
    )
  );
});
