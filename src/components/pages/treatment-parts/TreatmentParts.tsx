import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { Adsense } from "../../../Adsense";
import { OriginCategiryId } from "../../../enums/OriginCategiryIdEnum";
import { AboutCategoryApi } from "../../../hooks/api/AboutCategoryApi";
import { BasePartsApi } from "../../../hooks/api/BasePartsApi";
import { IdAndNameApi } from "../../../hooks/api/IdAndNameApi";
import { TreatmentPartsHook } from "../../../hooks/app/treatment-parts/TreatmentPartsHook";
import { AboutCategory } from "../../../type/api/AboutCategory";
import { BaseParts } from "../../../type/api/BaseParts";
import { IdAndNameDto } from "../../../type/api/dto/IdAndNameDto";
import { AboutCategoryByName } from "../../../type/app/AboutCategoryByName";
import { BasePartsByName } from "../../../type/app/BasePartsByName";
import { CategoryBox } from "../../molecules/box/CategoryBox";
import { OriginCategoryBox } from "../../molecules/box/OriginCategoryBox";
import { PartsBox } from "../../molecules/box/PartsBox";
import { AboutTreatmentParts } from "../../organisms/boxList/AboutTreatmentParts";

export const TreatmentParts: VFC = memo(() => {
  const { getAboutCategoryByOriginId } = AboutCategoryApi();
  const { getAllBasePartsByAboutCategoryId } = BasePartsApi();
  const { searchForPlan } = TreatmentPartsHook();
  const { getAllOriginCategoryIdAndName } = IdAndNameApi();

  const [originData, setOriginData] = useState<IdAndNameDto[]>([]);
  const [gender, setGender] = useState<string>("女性");
  const [viewAboutCategory, setViewAboutCategory] = useState<AboutCategory[]>(
    []
  );
  const [viewBaseParts, setViewBaseParts] = useState<BaseParts[]>([]);

  const getBaseParts = useCallback(
    async (aboutCategoryId: string) => {
      const data = await getAllBasePartsByAboutCategoryId(
        aboutCategoryId,
        gender
      );
      setViewBaseParts(data);
      return data;
    },
    [getAllBasePartsByAboutCategoryId, gender]
  );

  const getAboutCategory = useCallback(
    async (originId: string) => {
      const data = await getAboutCategoryByOriginId(originId);
      setViewAboutCategory(data);
      getBaseParts(data[0].id);
      return data;
    },
    [getAboutCategoryByOriginId, getBaseParts]
  );

  const getOriginCategory = useCallback(async () => {
    const data = await getAllOriginCategoryIdAndName();
    setOriginData(data);
    return data;
  }, [getAllOriginCategoryIdAndName]);

  const getFirstPartsDatas = useCallback(async () => {
    const origin = await getOriginCategory();
    const about = await getAboutCategory(origin[0].id);
    await getBaseParts(about[0].id);
  }, [getOriginCategory, getAboutCategory, getBaseParts]);

  const changeGenderState = useCallback(
    (genderParam: string) => {
      if (gender !== genderParam) {
        setGender(genderParam);
      }
    },
    [gender]
  );

  useEffect(() => {
    getFirstPartsDatas();
  }, [getFirstPartsDatas]);

  return (
    <Box
      my={"3rem"}
      px={{ md: "3rem", sm: "1rem" }}
      textAlign={"center"}
      w={"100%"}
    >
      <Text fontSize={"1.5rem"}>施術可能な部位一覧</Text>
      <HStack mt="2rem" justifyContent={"center"}>
        <Box
          cursor={"pointer"}
          p={"0.5rem 1rem"}
          color={gender === "女性" ? "originWhite" : ""}
          bg={gender === "女性" ? "originBlack" : ""}
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
          bg={gender === "男性" ? "originBlack" : ""}
          onClick={() => changeGenderState("男性")}
          transition={"0.2s"}
          transitionTimingFunction={"linear"}
        >
          男性
        </Box>
      </HStack>
      <Flex
        mt="2rem"
        mx={"auto"}
        wrap={"wrap"}
        w={{ md: "70%", sm: "95%" }}
        justifyContent={"center"}
      >
        {originData.map((data, int) => (
          <OriginCategoryBox
            key={int}
            name={data.name}
            onClick={() => getAboutCategory(data.id)}
            arrow={
              viewAboutCategory[0] && viewAboutCategory[0].originId === data.id
            }
            fontSize={"1.2rem"}
            width={{ md: "16.6%", sm: "33.3%" }}
          />
        ))}
      </Flex>
      <Box mt="2rem">
        <AboutTreatmentParts
          about={viewAboutCategory}
          gender={gender}
          selectedId={viewBaseParts[0] && viewBaseParts[0].aboutCategoryId}
          onClick={(id: string) => getBaseParts(id)}
          search={(originId: string, id: string) =>
            searchForPlan(gender, originId, id)
          }
        />
      </Box>
      <HStack
        w={{ md: "80%", sm: "95%" }}
        mx="auto"
        spacing={"0"}
        // mt="1rem"
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
      <Adsense />
    </Box>
  );
});
