import { Box, Text, Flex } from "@chakra-ui/layout";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { Pagenation } from "./pagenation/Pagenation";
import { ClinicNestPriceDto } from "../../type/api/dto/ClinicNestPriceDto";
import { ClinicCard } from "../organisms/card/ClinicCard";
import { FeatureApi } from "../../hooks/api/FeatureApi";
import { TopResource } from "../../resorces/TopResource";

type Props = {
  title: string;
  take: number;
  featureName: string;
};

export const FeatureSearch: VFC<Props> = memo((props) => {
  const { title, take, featureName } = props;

  const { getFeature, getCountFeature } = FeatureApi();
  const [clinicData, setClinicData] = useState<ClinicNestPriceDto[]>([]);
  const [maxData, setMaxData] = useState<number>(0);
  const [pagenationData, setPagenationData] = useState<{
    now: number;
    block: number;
  }>({
    now: 0,
    block: 0,
  });

  const getFeatureFunc = useCallback(
    async (page: number) => {
      const datas = await getFeature(featureName, take, page * take);
      setClinicData(datas);
    },
    [getFeature, featureName, take]
  );

  const getCountFeatureFunc = useCallback(async () => {
    const datas = await getCountFeature(featureName);
    setMaxData(datas);
  }, [getCountFeature, featureName]);

  const getPageNumber = useCallback(
    async (page: number, block?: number) => {
      getFeatureFunc(page);
      if (block || block === 0) {
        setPagenationData({ now: page, block: block });
      } else {
        setPagenationData({ ...pagenationData, now: page });
      }
    },
    [getFeatureFunc, pagenationData]
  );

  useEffect(() => {
    getFeatureFunc(0);
    getCountFeatureFunc();
  }, [getFeatureFunc, getCountFeatureFunc]);

  return (
    <Box textAlign={"center"}>
      <Box
        bgImage={TopResource.topImg}
        bgSize={"cover"}
        minH={"20rem"}
        // my={"3rem"}
        // mx={{ md: "3rem", sm: "1rem" }}
      >
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          w="100%"
          minH={"20rem"}
          backdropFilter="auto"
          backdropBlur="8px"
          color={"originWhite"}
          fontSize={"1.6rem"}
        >
          {title}
        </Flex>
      </Box>
      <Pagenation
        max={maxData}
        take={take}
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
