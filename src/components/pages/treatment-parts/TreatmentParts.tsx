import { Box, HStack, Text } from "@chakra-ui/react";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { AbobutCategiryId } from "../../../enums/AbobutCategiryIdEnum";
import { OriginCategiryId } from "../../../enums/OriginCategiryIdEnum";
import { AboutCategoryApi } from "../../../hooks/api/AboutCategoryApi";
import { BasePartsApi } from "../../../hooks/api/BasePartsApi";
import { TreatmentPartsHook } from "../../../hooks/app/treatment-parts/TreatmentPartsHook";
import { AboutCategory } from "../../../type/api/AboutCategory";
import { BaseParts } from "../../../type/api/BaseParts";
import { AboutCategoryByName } from "../../../type/app/AboutCategoryByName";
import { BasePartsByName } from "../../../type/app/BasePartsByName";
import { CategoryBox } from "../../molecules/box/CategoryBox";
import { OriginCategoryBox } from "../../molecules/box/OriginCategoryBox";
import { PartsBox } from "../../molecules/box/PartsBox";

export const TreatmentParts: VFC = memo(() => {
  const { getAboutCategoryByOriginId } = AboutCategoryApi();
  const { getAllBasePartsByAboutCategoryId } = BasePartsApi();
  const { checkBasePartsKey, checkAboutCategoryKey, boxData, searchForPlan } =
    TreatmentPartsHook();

  const [gender, setGender] = useState<string>("女性");
  const [viewAboutCategory, setViewAboutCategory] = useState<AboutCategory[]>(
    []
  );
  const [viewBaseParts, setViewBaseParts] = useState<BaseParts[]>([]);
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
            aboutCategoryId,
            gender
          );
        }
        setBasePartsData(setData);
        setViewBaseParts(setData[dataKey]);
      }
    },
    [basePartsData, checkBasePartsKey, getAllBasePartsByAboutCategoryId, gender]
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

  const changeGenderState = useCallback(
    (genderParam: string) => {
      if (gender !== genderParam) {
        setGender(genderParam);
        setAboutCategoryData({
          face: [],
          limb: [],
          body: [],
          vio: [],
          allBody: [],
          other: [],
        });
        setBasePartsData({
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
      }
    },
    [gender]
  );

  useEffect(() => {
    getAboutCategory(OriginCategiryId.face);
    getBaseParts(AbobutCategiryId.upperFace);
  }, [getAboutCategory, getBaseParts]);

  return (
    <Box my={"3rem"} mx={{ md: "3rem", sm: "1rem" }} textAlign={"center"}>
      <Text fontSize={"1.5rem"}>施術可能な部位一覧</Text>
      <HStack mt="2rem" justifyContent={"center"}>
        <Box
          cursor={"pointer"}
          p={"0.5rem 1rem"}
          color={gender === "女性" ? "originWhite" : ""}
          bg={gender === "女性" ? "originGold" : ""}
          onClick={() => changeGenderState("女性")}
          transition={"0.2s"}
          transitionTimingFunction={"linear"}
        >
          女性
        </Box>
        <Box
          cursor={"pointer"}
          p={"0.5rem 1rem"}
          color={gender === "男性" ? "originWhite" : ""}
          bg={gender === "男性" ? "originGold" : ""}
          onClick={() => changeGenderState("男性")}
          transition={"0.2s"}
          transitionTimingFunction={"linear"}
        >
          男性
        </Box>
      </HStack>
      <HStack mt="2rem" mx={"auto"} wrap={"wrap"} justifyContent={"center"}>
        {boxData.map((data, int) => (
          <OriginCategoryBox
            key={int}
            name={data.name}
            onClick={() => getAboutCategory(data.originId)}
            arrow={
              viewAboutCategory[0] &&
              viewAboutCategory[0].originId === data.originId
            }
            fontSize={"1.2rem"}
          />
        ))}
      </HStack>
      <HStack
        // w={"80%"}
        // mx="auto"
        mt="1rem"
        spacing={"0"}
        wrap={"wrap"}
        justifyContent={"space-evenly"}
      >
        {viewAboutCategory.map((data, i) => (
          <CategoryBox
            key={i}
            category={data}
            gender={gender}
            width={{ md: "10rem", sm: "8.5rem" }}
            arrow={
              viewBaseParts[0] && viewBaseParts[0].aboutCategoryId === data.id
                ? true
                : false
            }
            onClick={() => getBaseParts(data.id)}
            search={() => searchForPlan(gender, data.originId, data.id)}
          />
        ))}
      </HStack>
      <HStack
        w={{ md: "80%", sm: "95%" }}
        mx="auto"
        spacing={"0"}
        mt="1rem"
        wrap={"wrap"}
        justifyContent={"space-evenly"}
      >
        {viewBaseParts.map((data, i) => (
          <PartsBox
            key={i}
            parts={data}
            width={"10rem"}
            search={() =>
              searchForPlan(
                gender,
                viewAboutCategory[0].originId,
                data.aboutCategoryId,
                data.id
              )
            }
          />
        ))}
      </HStack>
    </Box>
  );
});
