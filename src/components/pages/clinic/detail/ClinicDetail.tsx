import { Box, Checkbox, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { useLocation, useParams, useRouteMatch } from "react-router-dom";
import { ClinicApi } from "../../../../hooks/api/ClinicApi";
import { Clinic } from "../../../../type/api/Clinic";
import { ClinicNestPriceDto } from "../../../../type/api/dto/ClinicNestPriceDto";
import { ChangeBgText } from "../../../atoms/text/ChangeBgText";
import { ClinicOptionCard } from "../../../organisms/card/ClinicOptionCard";
import { ClinicPlanCard } from "../../../organisms/card/ClinicPlanCard";
import { ClinicSummaryCard } from "../../../organisms/card/ClinicSummaryCard";

export const ClinicDetail: VFC = memo(() => {
  const param = useParams<{ id: string }>();
  const { getOneClinic } = ClinicApi();

  const [clinicData, setClinicData] = useState<Clinic>();
  const [selectTab, setSelectTab] = useState<string>("クリニック概要");

  const getOneClinicFunc = useCallback(
    async (clinicId: string) => {
      const data = await getOneClinic(clinicId);
      setClinicData(data);
    },
    [getOneClinic]
  );

  const changeTab = useCallback((tab: string) => {
    setSelectTab(tab);
  }, []);

  useEffect(() => {
    getOneClinicFunc(param.id);
  }, [param, getOneClinicFunc]);

  return (
    <Stack
      my={"3rem"}
      mx={"auto"}
      // justifyContent={"center"}
      textAlign={"center"}
      maxW={"60em"}
    >
      {clinicData && (
        <>
          <Text mb={"1rem"} fontSize={"1.5rem"}>
            {clinicData.name}
          </Text>
          <Stack
            spacing={"0"}
            justifyContent={"space-evenly"}
            shadow={"0 4px 8px 2px rgb(180,180,180)"}
          >
            <Flex justifyContent={"space-evenly"}>
              {[
                "クリニック概要",
                // "オプションサービス",
                "プラン詳細",
                // "脱毛機器",
              ].map((text, i) => (
                <Box
                  key={i}
                  width={{ md: "50%", sm: "50%" }}
                  p={"1em"}
                  bg={selectTab !== text ? "#888" : ""}
                  transition={"0.5s"}
                  cursor={"pointer"}
                  _hover={{
                    bg: selectTab !== text ? "#aaa" : "",
                    transition: "0.5s",
                  }}
                  onClick={() => changeTab(text)}
                >
                  {text}
                </Box>
              ))}
              {/* 以降追加したい項目
              <Box>施術の流れ</Box>
            <Box>施術についての詳細</Box>
            <Box>SNS</Box> */}
            </Flex>
            <HStack spacing={"0"} p={"1em"} justifyContent={"center"}>
              <Box m={{ md: "2em", sm: "2em 0" }} w={"100%"}>
                {/* クリニック概要 */}
                {selectTab === "クリニック概要" && (
                  <ClinicSummaryCard clinicData={clinicData} />
                )}
                {/* オプションサービス
              {selectTab === "オプションサービス" && (
                <Box m={"2em"} w={"100%"}>
                  <ClinicOptionCard clinicData={clinicData} />
                </Box>
              )} */}
                {/* プラン詳細 */}
                {selectTab === "プラン詳細" && (
                  <ClinicPlanCard clinicData={clinicData} />
                )}
                {/* プラン詳細 */}
              </Box>
            </HStack>
          </Stack>
        </>
      )}
    </Stack>
  );
});
