import { Box, Text, Flex } from "@chakra-ui/layout";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { useLocation } from "react-router-dom";
import "../../../../App.css";
import { Button, Image, Select } from "@chakra-ui/react";
import { PlanCard } from "../../../organisms/card/PlanCard";
import { SearchResultCard } from "../../../molecules/card/SearchResultCard";
import { PriceApi } from "../../../../hooks/api/PriceApi";
import { Pagenation } from "../../../templete/pagenation/Pagenation";
import { Price } from "../../../../type/api/Price";
import { OrderPlanIdName } from "../../../../type/app/OrderPlanIdName";
import { OrderPlan } from "../../../../type/app/OrderPlan";

const numOfTakeData = 10;

export const SalonList: VFC = memo(() => {
  const { getTreatmentPrice, getCountPrice } = PriceApi();
  const { search } = useLocation();

  const [orderDataIdName, setOrderDataIdName] = useState<OrderPlanIdName>();
  const [orderPlanData, setOrderPlanData] = useState<OrderPlan>();
  const [planData, setPlanData] = useState<Price[]>([]);
  const [maxValue, setMaxvalue] = useState<number | undefined>();
  const [pagenationData, setPagenationData] = useState<{
    now: number;
    block: number;
  }>({
    now: 0,
    block: 0,
  });
  const getTreatmentPriceFunc = useCallback(
    async (orderParams: OrderPlan, take: number, skip: number) => {
      const data = await getTreatmentPrice(orderParams, take, skip);
      setPlanData(data.prices);
      setOrderDataIdName({
        gender: orderParams.gender,
        paySystem: orderParams.paySystem,
        originParts: data.originCategory,
        AboutCategory: data.aboutCategory,
        parts: data.baseParts,
        skinCollor: orderParams.skinCollor,
        hair: orderParams.hair,
      });
    },
    [getTreatmentPrice]
  );

  const getMaxDataCount = useCallback(
    async (orderParams: OrderPlan) => {
      if (!maxValue) {
        const count = await getCountPrice(orderParams);
        setMaxvalue(count);
      }
    },
    [getCountPrice, maxValue]
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
    const query = new URLSearchParams(search);
    const orderParams: OrderPlan = {
      gender: query.get("gender") || "女性",
      paySystem: query.get("paySystem") || "総額",
      originParts: query.get("originParts") || "Z000001",
      AboutCategory: query.get("AboutCategory") || "A000001",
      parts: query.get("parts"),
      skinCollor: query.get("skinCollor"),
      hair: query.get("hair"),
    };
    getTreatmentPriceFunc(orderParams, numOfTakeData, 0);
    getMaxDataCount(orderParams);
    setOrderPlanData(orderParams);
  }, [search, getTreatmentPriceFunc, getMaxDataCount]);

  return (
    <Flex m={6} textAlign="center">
      <Box w={"20%"} pt={"3rem"}>
        <Text>検索結果</Text>
        {orderDataIdName && (
          <SearchResultCard
            orderPlan={orderDataIdName}
            resetPages={serPagenationDefault}
          />
        )}
      </Box>
      <Box w="80%" px={"3rem"}>
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
            {orderDataIdName &&
              planData.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  orderDataIdName={orderDataIdName}
                />
              ))}
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
    </Flex>
  );
});
