import { Box, HStack, Text } from "@chakra-ui/react";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { ClinicApi } from "../../../hooks/api/ClinicApi";
import { ClinicAreaApi } from "../../../hooks/api/ClinicAreaApi";
import {
  ApiClinic,
  ApiClinicArea,
  ClinicNestPrice,
} from "../../../type/api/ApiType";
import { AreaBox } from "../../molecules/box/AreaBox";
import { ClinicCard } from "../../organisms/card/ClinicCard";
import { Pagenation } from "../../templete/pagenation/Pagenation";

const numOfTakeData = 10;
const defaultMax = 349;

export const Clinics: VFC = memo(() => {
  const { getAllClinic, getAllClinicByAreaId } = ClinicApi();
  const { getAllArea } = ClinicAreaApi();

  const [clinicData, setClinicData] = useState<ClinicNestPrice[]>([]);
  const [areaData, setAreaData] = useState<ApiClinicArea[]>([]);
  const [areaIdState, setAreaIdState] = useState<{
    id: string | undefined;
    max: number;
  }>({ id: undefined, max: defaultMax });
  const [pagenationData, setPagenationData] = useState<{
    now: number;
    block: number;
  }>({
    now: 0,
    block: 0,
  });

  const getArea = useCallback(async () => {
    const areas = await getAllArea();
    setAreaData(areas);
  }, [getAllArea]);

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
    async (page: number, areaId?: string, max?: number) => {
      const clinics = await getClinics(page, areaId);
      setClinicData(clinics);
      if (max) {
        setAreaIdState({ id: areaId, max: max });
      }
    },
    [getClinics]
  );

  const getPageNumber = useCallback(
    async (page: number, block?: number) => {
      getClinicDataAndAreaId(page, areaIdState.id);
      if (block || block === 0) {
        setPagenationData({ now: page, block: block });
      } else {
        setPagenationData({ ...pagenationData, now: page });
      }
    },
    [getClinicDataAndAreaId, areaIdState, pagenationData]
  );

  useEffect(() => {
    getClinicDataAndAreaId(0, undefined, defaultMax);
    getArea();
  }, [getClinicDataAndAreaId, getArea]);

  useEffect(() => {
    setPagenationData({ now: 0, block: 0 });
  }, [areaIdState]);

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
            onClick={() => getClinicDataAndAreaId(0, undefined, defaultMax)}
          >
            <Text>全ての区域</Text>
          </Box>
          {!areaIdState.id ? <Box fontSize={"1.3rem"}>▼</Box> : ""}
        </Box>
        {areaData.map((data, int) => (
          <AreaBox
            key={int}
            area={data.area}
            description={data.description}
            arrow={areaIdState?.id === data.id ? true : false}
            onClick={() =>
              getClinicDataAndAreaId(0, data.id, data.registrationNumber)
            }
            fontSize={"1.2rem"}
          />
        ))}
      </HStack>
      <Pagenation
        max={areaIdState.max}
        take={numOfTakeData}
        nowPage={pagenationData.now}
        pageBlock={pagenationData.block}
        onClickNumber={(page: number, block?: number) =>
          getPageNumber(page, block)
        }
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
