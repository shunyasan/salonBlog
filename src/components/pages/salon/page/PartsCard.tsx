import { Button } from "@chakra-ui/button";
import { Box, Center, Flex, HStack, Text } from "@chakra-ui/layout";
import { Radio } from "@chakra-ui/radio";
import { Select } from "@chakra-ui/select";
import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useState,
  VFC,
} from "react";
import { PartsButton } from "../../../atoms/button/PartsButton";
import { Image } from "@chakra-ui/react";
import { QueryOrderPlan } from "../../../../type/app/BaseType";
import { AboutCategoryApi } from "../../../../hooks/api/AboutCategoryApi";
import { BasePartsApi } from "../../../../hooks/api/BasePartsApi";
import { AboutCategory } from "../../../../type/api/AboutCategory";
import { IdAndNameDto } from "../../../../type/api/dto/IdAndNameDto";

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
      console.log(res);
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
        <Box m={6} textAlign="center">
          <Box>より詳細な部位を選択</Box>
          <Box w={"80%"} m={"auto"} my="6" minW="xs">
            <Box w={"30%"} m={"auto"}>
              <Image
                src={
                  orderPlan.gender === "女性"
                    ? AboutCategory?.imgUrlLady
                    : AboutCategory?.imgUrlMen
                }
              />
              <Text p="5">{AboutCategory?.name}</Text>
            </Box>

            <Flex
              w={"80%"}
              m={"auto"}
              justifyContent={"center"}
              wrap="wrap"
              p="4"
            >
              {parts.map((data) => (
                <PartsButton
                  key={data.id}
                  text={data.name}
                  onClick={() => selectParts(data.id)}
                  filter={selected === data.id}
                />
              ))}
            </Flex>
          </Box>
        </Box>
      </div>
    )
  );
});
