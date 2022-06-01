import { Box, Text, Flex } from "@chakra-ui/layout";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { useLocation } from "react-router-dom";
import "../../../../App.css";
import { Button, Image, Select, Stack } from "@chakra-ui/react";
import { PlanCard } from "../../../organisms/card/PlanCard";
import { SearchResultCard } from "../../../molecules/card/SearchResultCard";
import { PriceApi } from "../../../../hooks/api/PriceApi";
import { Pagenation } from "../../../templete/pagenation/Pagenation";
import { PriceDto } from "../../../../type/api/dto/PriceDto";
import { OrderPlanIdName } from "../../../../type/app/OrderPlanIdName";
import { OrderPlan } from "../../../../type/app/OrderPlan";
import { BaseButton } from "../../../atoms/button/BaseButton";
import { CreateParameterHooks } from "../../../../hooks/app/parameter/CreateParameterHooks";
import { OrderPlanIdNameClass } from "../../../../hooks/app/class/OrderPlanIdName.class";
import { Adsense } from "../../../../Adsense";

const numOfTakeData = 10;

type Props = {
  title: (value: string) => void;
};
export const SalonList: VFC<Props> = memo((props) => {
  const { title } = props;
  const { getTreatmentPrice, getCountPrice } = PriceApi();
  const { getQueryOrderPlanInSearch } = CreateParameterHooks();
  const { changeOrderPlanToOrderPlanIdName } = OrderPlanIdNameClass();

  const { search } = useLocation();

  const [orderDataIdName, setOrderDataIdName] = useState<OrderPlanIdName>();
  const [orderPlanData, setOrderPlanData] = useState<OrderPlan>();
  const [planData, setPlanData] = useState<PriceDto[]>([]);
  const [maxValue, setMaxvalue] = useState<number | undefined>();
  const [pagenationData, setPagenationData] = useState<{
    now: number;
    block: number;
  }>({
    now: 0,
    block: 0,
  });

  const createTitle = useCallback(
    (idName: OrderPlanIdName) => {
      const data = Object.entries(idName).map(([key, value]) => value.name);
      const res = data.reduce((a, b) => a + "," + b);
      title(res);
    },
    [title]
  );

  const getTreatmentPriceFunc = useCallback(
    async (orderParams: OrderPlan, take: number, skip: number) => {
      const data = await getTreatmentPrice(orderParams, take, skip);
      const idName = changeOrderPlanToOrderPlanIdName(orderParams);
      idName.originParts = data.originCategory;
      idName.AboutCategory = data.aboutCategory;
      idName.parts = data.baseParts;
      createTitle(idName);
      setOrderDataIdName(idName);
      setPlanData(data.prices);
    },
    [getTreatmentPrice, changeOrderPlanToOrderPlanIdName, createTitle]
  );

  const getMaxDataCount = useCallback(
    async (orderParams: OrderPlan) => {
      const count = await getCountPrice(orderParams);
      setMaxvalue(count);
    },
    [getCountPrice]
  );

  const serPagenationDefault = useCallback(() => {
    setMaxvalue(undefined);
    setPagenationData({ now: 0, block: 0 });
    setPlanData([]);
  }, []);

  const getPageNumber = useCallback(
    async (page: number, block?: number) => {
      if (orderPlanData) {
        setPlanData([]);
        getTreatmentPriceFunc(
          orderPlanData,
          numOfTakeData,
          numOfTakeData * page
        );
        if (block || block === 0) {
          setPagenationData({ now: page, block: block });
        } else {
          setPagenationData({ ...pagenationData, now: page });
        }
      }
    },
    [getTreatmentPriceFunc, pagenationData, orderPlanData]
  );

  useEffect(() => {
    const param = getQueryOrderPlanInSearch(search);
    getTreatmentPriceFunc(param, numOfTakeData, 0);
    setOrderPlanData(param);
  }, [search, getTreatmentPriceFunc, getQueryOrderPlanInSearch]);

  useEffect(() => {
    if (orderPlanData) {
      getMaxDataCount(orderPlanData);
    }
  }, [orderPlanData, getMaxDataCount]);

  return (
    <Stack
      m={"2rem"}
      spacing={"0"}
      textAlign="center"
      wrap={"wrap"}
      justifyContent={"center"}
    >
      <Box w={{ md: "24rem", sm: "20rem" }} mx={"auto"}>
        <Text>検索結果</Text>
        {orderDataIdName && (
          <SearchResultCard
            orderPlan={orderDataIdName}
            resetPages={serPagenationDefault}
          />
        )}
        <Box my={"1rem"}>
          <BaseButton
            text={"最初からやり直す"}
            path={"/salon"}
            size={undefined}
            base={"secBase"}
          />
        </Box>
      </Box>
      <Adsense />
      <Box w={{ md: "55rem", sm: "100%" }} mx={"auto !important"}>
        {maxValue && maxValue > 0 ? (
          <Pagenation
            max={maxValue}
            take={numOfTakeData}
            nowPage={pagenationData.now}
            pageBlock={pagenationData.block}
            onClickNumber={(page: number, block?: number) =>
              getPageNumber(page, block)
            }
          >
            <Stack justifyContent={"center"} spacing={"1.2em"} my={"1em"}>
              {orderDataIdName &&
                planData.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    orderDataIdName={orderDataIdName}
                  />
                ))}
            </Stack>
          </Pagenation>
        ) : (
          ""
        )}
        {planData.length === 0 && (
          <Box my={"3rem"}>
            <Text>こちらのプランは見つかりませんでした。</Text>
            <Text>「条件を変更」をご利用ください</Text>
          </Box>
        )}
      </Box>
      <Adsense />
    </Stack>
  );
});
