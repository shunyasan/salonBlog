import { Box, Checkbox, Flex, HStack, Text } from "@chakra-ui/react";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { ClinicApi } from "../../../hooks/api/ClinicApi";
import { ClinicAreaApi } from "../../../hooks/api/ClinicAreaApi";
import { ClinicArea } from "../../../type/api/ClinicArea";
import { ClinicNestPriceDto } from "../../../type/api/dto/ClinicNestPriceDto";
import { AreaBox } from "../../molecules/box/AreaBox";
import { ClinicCard } from "../../organisms/card/ClinicCard";
import { Pagenation } from "../../templete/pagenation/Pagenation";

const numOfTakeData = 10;
const defaultMax = 349;

export const Clinics: VFC = memo(() => {
  const { getAllClinic, getAllClinicByAreaId } = ClinicApi();
  const { getAllArea } = ClinicAreaApi();

  const [clinicData, setClinicData] = useState<ClinicNestPriceDto[]>([]);
  const [areaData, setAreaData] = useState<ClinicArea[]>([]);
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
    <Box my={"3rem"} mx={{ md: "3rem", sm: "1rem" }} textAlign={"center"}>
      <Text fontSize={"1.5rem"}>クリニック一覧</Text>
      <HStack
        justifyContent={"space-evenly"}
        wrap={"wrap"}
        spacing={"0"}
        my="2rem"
      >
        <Box>
          <Flex
            cursor={"pointer"}
            border={!areaIdState.id ? "4px" : "1px"}
            w={"8rem"}
            h={"8rem"}
            m={"1rem"}
            alignItems={"center"}
            justifyContent={"center"}
            fontSize={"1.2rem"}
            onClick={() => getClinicDataAndAreaId(0, undefined, defaultMax)}
          >
            <Text>全ての区域</Text>
          </Flex>
          {/* {!areaIdState.id ? <Box fontSize={"1.3rem"}>▼</Box> : ""} */}
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
        {/* <Box mt={"2rem"}>
          <Checkbox colorScheme="yellow" value={}>系列クリニックをまとめる</Checkbox>
        </Box> */}
        <Box w={{ md: "80%", sm: "95%" }} m="auto">
          {clinicData.map((data, int) => (
            <ClinicCard clinic={data} key={int} />
          ))}
        </Box>
      </Pagenation>
    </Box>
  );
});
