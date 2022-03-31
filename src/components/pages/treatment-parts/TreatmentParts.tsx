import { Box, HStack, Text } from "@chakra-ui/react";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { AbobutCategiryId } from "../../../enums/AbobutCategiryIdEnum";
import { OriginCategiryId } from "../../../enums/OriginCategiryIdEnum";
import { AboutCategoryApi } from "../../../hooks/api/AboutCategoryApi";
import { BasePartsApi } from "../../../hooks/api/BasePartsApi";
import { AboutCategoryHook } from "../../../hooks/app/AboutCategoryHook";
import { OriginCategoryHook } from "../../../hooks/app/OriginCategoryHook";
import {
  AboutCategory,
  ApiBaseParts,
  OriginCategory,
} from "../../../type/api/ApiType";
import {
  AboutCategoryByName,
  BasePartsByName,
} from "../../../type/app/BaseType";
import { CategoryBox } from "../../molecules/box/CategoryBox";
import { OriginCategoryBox } from "../../molecules/box/OriginCategoryBox";
import { PartsBox } from "../../molecules/box/PartsBox";

export const TreatmentParts: VFC = memo(() => {
  const { getAboutCategoryByOriginId } = AboutCategoryApi();
  const { getAllBasePartsByAboutCategoryId } = BasePartsApi();
  const { checkAboutCategoryKey, boxData } = OriginCategoryHook();
  const { checkBasePartsKey } = AboutCategoryHook();

  const [viewAboutCategory, setViewAboutCategory] = useState<AboutCategory[]>(
    []
  );
  const [viewBaseParts, setViewBaseParts] = useState<ApiBaseParts[]>([]);
  const [aboutCategoryData, setAboutCategoryData] =
    useState<AboutCategoryByName>({
      face: [],
      limb: [],
      body: [],
      vio: [],
      allBody: [],
      other: [],
    });

  const [basePartsData, setBasePartsData] = useState<BasePartsByName>({
    upperFace: [],
    lowerFace: [],
    faceSet: [],
    arm: [],
    leg: [],
    limb: [],
    frontBody: [],
    backBody: [],
    bodySet: [],
    vio: [],
    vioSet: [],
    allBody: [],
    select: [],
    time: [],
    range: [],
    upperBody: [],
    lowerBody: [],
  });

  const getBaseParts = useCallback(
    async (aboutCategoryId: string) => {
      const dataKey = checkBasePartsKey(aboutCategoryId);
      if (dataKey) {
        const setData: any = basePartsData;
        if (setData[dataKey].length === 0) {
          setData[dataKey] = await getAllBasePartsByAboutCategoryId(
            aboutCategoryId
          );
        }
        setBasePartsData(setData);
        setViewBaseParts(setData[dataKey]);
      }
    },
    [basePartsData, checkBasePartsKey, getAllBasePartsByAboutCategoryId]
  );

  const getAboutCategory = useCallback(
    async (originId: string) => {
      const dataKey = checkAboutCategoryKey(originId);
      if (dataKey) {
        const setData: any = aboutCategoryData;
        if (setData[dataKey].length === 0) {
          setData[dataKey] = await getAboutCategoryByOriginId(originId);
        }
        setAboutCategoryData(setData);
        setViewAboutCategory(setData[dataKey]);

        getBaseParts(setData[dataKey][0].id);
      }
    },
    [
      aboutCategoryData,
      checkAboutCategoryKey,
      getAboutCategoryByOriginId,
      getBaseParts,
    ]
  );

  useEffect(() => {
    getAboutCategory(OriginCategiryId.face);
    getBaseParts(AbobutCategiryId.upperFace);
  }, [getAboutCategory, getBaseParts]);

  return (
    <Box m={"3rem"} textAlign={"center"}>
      <Text fontSize={"1.5rem"}>施術可能な部位一覧</Text>
      <HStack mt="2rem" justifyContent={"center"} spacing={"1rem "}>
        {boxData.map((data, int) => (
          <OriginCategoryBox
            key={int}
            name={data.name}
            onClick={() => getAboutCategory(data.originId)}
            arrow={
              viewAboutCategory[0] &&
              viewAboutCategory[0].originId === data.originId
            }
          />
        ))}
      </HStack>
      <HStack
        w={"80%"}
        mt="2rem"
        mx="auto"
        wrap={"wrap"}
        justifyContent={"space-evenly"}
      >
        {viewAboutCategory.map((data) => (
          <CategoryBox
            category={data}
            gender={1}
            width={"10rem"}
            arrow={
              viewBaseParts[0] && viewBaseParts[0].aboutCategoryId === data.id
                ? true
                : false
            }
            onClick={() => getBaseParts(data.id)}
          />
        ))}
      </HStack>
      <HStack
        w={"80%"}
        mt="2rem"
        mx="auto"
        wrap={"wrap"}
        justifyContent={"space-evenly"}
      >
        {viewBaseParts.map((data) => (
          <PartsBox parts={data} width={"10rem"} />
        ))}
      </HStack>
    </Box>
  );
});
