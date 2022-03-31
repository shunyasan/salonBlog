import { Box, Text, Flex } from "@chakra-ui/layout";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { useLocation } from "react-router-dom";
import "../../../../App.css";
import { OrderPlanIdName } from "../../../../type/app/ViewTypeFromApi";
import { Button, Image, Select } from "@chakra-ui/react";
import { PlanCardList } from "../../../organisms/cardList/PlanCardList";
import { SearchResultCard } from "../../../molecules/card/SearchResultCard";
import { ApiPrice } from "../../../../type/api/ApiType";
import { OrderPlan } from "../../../../type/app/BaseType";
import { PriceApi } from "../../../../hooks/api/PriceApi";

export const SalonList: VFC = memo(() => {
  const [orderDataIdName, setOrderDataIdName] = useState<OrderPlanIdName>();
  const [planData, setPlanData] = useState<ApiPrice[]>([]);

  const { search } = useLocation();

  const { getTreatmentPrice } = PriceApi();

  const getTreatmentPriceFunc = useCallback(
    async (orderParams: OrderPlan) => {
      const data = await getTreatmentPrice(orderParams);
      setPlanData(data.prices);
      setOrderDataIdName({
        gender: orderParams.gender,
        skinCollor: orderParams.skinCollor,
        hair: orderParams.hair,
        paySystem: orderParams.paySystem || "総額",
        originParts: data.originCategory,
        AboutCategory: data.aboutCategory,
        parts: data.baseParts,
      });
    },
    [getTreatmentPrice]
  );

  useEffect(() => {
    const query = new URLSearchParams(search);
    const orderParams: OrderPlan = {
      gender: query.get("gender") || "女性",
      skinCollor: query.get("skinCollor") || "薄茶色",
      hair: query.get("hair") || "標準",
      paySystem: query.get("paySystem") || "総額",
      originParts: query.get("originParts") || "Z000001",
      AboutCategory: query.get("AboutCategory") || "A000001",
      parts: query.get("parts"),
    };
    getTreatmentPriceFunc(orderParams);
  }, [search, getTreatmentPriceFunc]);

  return (
    <Flex m={6} textAlign="center">
      <Box w={"20%"} pt={"3rem"}>
        <Text>検索結果</Text>
        {orderDataIdName && <SearchResultCard orderPlan={orderDataIdName} />}
      </Box>
      <Box w="80%" px={"3rem"}>
        {orderDataIdName &&
          planData.map((plan) => (
            <PlanCardList
              key={plan.id}
              plan={plan}
              orderDataIdName={orderDataIdName}
            />
          ))}
      </Box>
    </Flex>
  );
});
