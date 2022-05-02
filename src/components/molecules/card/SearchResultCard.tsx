import {
  Box,
  Button,
  Flex,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { TitleValue } from "../../../type/app/TitleValue";
import { OrderPlanIdName } from "../../../type/app/OrderPlanIdName";
import { PlanResearchModal } from "../../organisms/modal/PlanResearchModal";

type Props = {
  orderPlan: OrderPlanIdName;
  resetPages: () => void;
};

export const SearchResultCard: VFC<Props> = memo((props) => {
  const { orderPlan, resetPages } = props;
  const [orderData, setOrderData] = useState<TitleValue[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getOrderData = useCallback(async () => {
    const data: TitleValue[] = [
      {
        title: "性別",
        value: orderPlan.gender,
      },
      {
        title: "料金表示",
        value: orderPlan.paySystem,
      },
      {
        title: "広域カテゴリ",
        value: orderPlan.originParts.name,
      },
      {
        title: "詳細カテゴリ",
        value: orderPlan.AboutCategory.name,
      },
      {
        title: "部位",
        value: orderPlan.parts ? orderPlan.parts.name : "未指定",
      },
      {
        title: "肌の色",
        value: orderPlan.skinCollor || "未指定",
      },
      {
        title: "毛量",
        value: orderPlan.hair || "未指定",
      },
    ];
    setOrderData(data);
  }, [orderPlan]);

  useEffect(() => {
    getOrderData();
  }, [getOrderData]);

  return (
    <>
      <Stack justifyContent={"center"} spacing={"0"} border={"1px"} p={"1rem"}>
        <HStack spacing={"0"} wrap={"wrap"} justifyContent={"center"}>
          {orderData.map((data, int) => (
            <Flex
              key={int}
              fontSize={"0.8rem"}
              alignItems={"center"}
              justifyContent={"space-evenly"}
              w={"100%"}
            >
              <Text
                w={"9em"}
                textAlign={"center"}
                display={"inline-block"}
                bg={"originLiteGray"}
                border={"1px"}
                borderColor={"originBlack"}
                m={"0.5em !important"}
              >
                {data.title}
              </Text>
              <Text
                w={"9em"}
                m={"0.4em !important"}
                textAlign={"center"}
                display={"inline-block"}
              >
                {data.value}
              </Text>
            </Flex>
          ))}
        </HStack>

        <Box>
          <Button
            onClick={onOpen}
            mt={"0.5rem"}
            w={"10em"}
            variant={"gold"}
            size={"xs"}
          >
            条件を変更
          </Button>
        </Box>
      </Stack>
      {orderPlan && (
        <PlanResearchModal
          OrderPlan={orderPlan}
          isOpen={isOpen}
          onClose={onClose}
          resetPages={resetPages}
        />
      )}
    </>
  );
});
