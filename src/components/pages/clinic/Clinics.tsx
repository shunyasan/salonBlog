import { Box, HStack, Text } from "@chakra-ui/react";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { ClinicApi } from "../../../hooks/api/ClinicApi";
import { ApiClinic, ClinicNestPrice } from "../../../type/api/ApiType";
import { AreaBox } from "../../molecules/box/AreaBox";
import { ClinicCard } from "../../organisms/card/ClinicCard";
import { Pagenation } from "../../templete/Pagenation";

const numOfTakeData = 10;

export const Clinics: VFC = memo(() => {
  const { getAllClinic, getAllClinicByAreaId } = ClinicApi();
  const [clinicData, setClinicData] = useState<ClinicNestPrice[]>([]);
  const [areaIdState, setAreaIdState] = useState<string | undefined>();
  const [nowPage, setNowPage] = useState<number>(0);

  const getArea = useCallback(() => {}, []);

  const getClinics = useCallback(
    async (page: number, areaId?: string) => {
      if (areaId) {
        return await getAllClinicByAreaId(
          areaId,
          numOfTakeData,
          numOfTakeData * page
        );
      } else {
        return await getAllClinic(numOfTakeData, numOfTakeData * page);
      }
    },
    [getAllClinicByAreaId, getAllClinic]
  );

  const getClinicDataAndAreaId = useCallback(
    async (page: number, areaId?: string) => {
      const clinics = await getClinics(page, areaId);
      setClinicData(clinics);
      setAreaIdState(areaId);
    },
    [getClinics]
  );

  const getPageNumber = useCallback(
    async (page: number) => {
      console.log(page);
      setNowPage(page);
      getClinicDataAndAreaId(page, areaIdState);
    },
    [getClinicDataAndAreaId, areaIdState]
  );

  useEffect(() => {
    getClinicDataAndAreaId(0);
  }, [getClinicDataAndAreaId]);

  useEffect(() => {
    setNowPage(0);
  }, [areaIdState]);

  const AreaCard = [
    {
      area: "中央区",
      areaId: "AC000001",
      description: "説明文",
    },
    {
      area: "渋谷区",
      areaId: "AC000003",
      description: "説明文",
    },
    {
      area: "新宿区",
      areaId: "AC000005",
      description: "説明文",
    },
  ];

  return (
    <Box m={"3rem"} textAlign={"center"}>
      <Text fontSize={"1.5rem"}>クリニック一覧</Text>
      <HStack
        justifyContent={"space-evenly"}
        spacing={"1rem"}
        wrap={"wrap"}
        w={"80%"}
        my="2rem"
        mx={"auto"}
      >
        <Box>
          <Box
            cursor={"pointer"}
            border={"1px"}
            p={"0.5rem 1rem"}
            fontSize={"1.2rem"}
            onClick={() => getClinicDataAndAreaId(0)}
          >
            <Text>全ての区域</Text>
          </Box>
          {!areaIdState ? <Box fontSize={"1.3rem"}>▼</Box> : ""}
        </Box>
        {AreaCard.map((data, int) => (
          <AreaBox
            key={int}
            area={data.area}
            description={data.description}
            arrow={areaIdState === data.areaId ? true : false}
            onClick={() => getClinicDataAndAreaId(0, data.areaId)}
            fontSize={"1.2rem"}
          />
        ))}
      </HStack>
      <Pagenation
        max={100}
        take={numOfTakeData}
        nowPage={nowPage}
        onClick={(page: number) => getPageNumber(page)}
      >
        <Box w={"80%"} m="auto">
          {clinicData.map((data, int) => (
            <ClinicCard clinic={data} key={int} />
          ))}
        </Box>
      </Pagenation>
    </Box>
  );
});
