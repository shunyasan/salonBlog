import { Box, Text, Flex } from "@chakra-ui/layout";
import { type } from "os";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { useLocation } from "react-router-dom";
import {
  OrderPlanIdName,
  SortPlanData,
} from "../../../type/app/ViewTypeFromApi";
import { PlanCard } from "../../organisms/card/PlanCard";
import testImg from "../../../resorces/top-image.jpg";
import { Image } from "@chakra-ui/react";
import { ApiPrice } from "../../../type/api/ApiType";
import { OrderPlan } from "../../../type/app/BaseType";
import { PriceApi } from "../../../hooks/api/PriceApi";

type Props = {
  title: string;
};
export const FeatureSearch: VFC<Props> = memo((props) => {
  const { title } = props;
  const [orderDataIdName, setOrderDataIdName] = useState<OrderPlanIdName>();
  const [planData, setPlanData] = useState<ApiPrice[]>([]);
  const [sortData, setsortData] = useState<SortPlanData>();

  const { search } = useLocation();
  const { getTreatmentPrice } = PriceApi();

  // const getPriceFirestore = useCallback(
  //   async (order: OrderPlan) => {
  //     const plans = await getTreatmentPrice(order);
  //     setPlanData(plans.prices);
  //   },
  //   [getTreatmentPrice]
  // );

  // useEffect(() => {
  // 	getPriceFirestore(orderParams);
  // }, [getPriceFirestore]);

  return (
    <>
      <Box bgImage={testImg} bgSize={"cover"} minH={"20rem"}>
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
      <Box w="80%" px={"3rem"}>
        {orderDataIdName &&
          planData.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              orderDataIdName={orderDataIdName}
            />
          ))}
      </Box>
    </>
  );
});
