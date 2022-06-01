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
import { ResultCardBox } from "./ResultCardBox";

type Props = {
  orderPlan: OrderPlanIdName;
  resetPages: () => void;
};

export const SearchResultCard: VFC<Props> = memo((props) => {
  const { orderPlan, resetPages } = props;
  const [baseData, setBaseData] = useState<TitleValue[]>([]);
  const [partsData, setPartsData] = useState<TitleValue[]>([]);
  const [yourData, setYourData] = useState<TitleValue[]>([]);
  const [clinicData, setClinicData] = useState<TitleValue[]>([]);
  const [planData, setplanData] = useState<TitleValue[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const base: TitleValue[] = [
      {
        title: "性別",
        value: orderPlan.gender.name,
      },
    ];
    const parts: TitleValue[] = [
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
    ];
    const your: TitleValue[] = [
      {
        title: "肌の色",
        value: orderPlan.skinCollor.name || "未指定",
      },
      {
        title: "毛量",
        value: orderPlan.hair.name || "未指定",
      },
      {
        title: "料金表示",
        value: orderPlan.paySystem.name,
      },
    ];
    const clinic: TitleValue[] = [
      {
        title: "施術室",
        value:
          orderPlan.roomType.name === "none"
            ? "未指定"
            : orderPlan.roomType.name,
      },
      {
        title: "内装",
        value:
          orderPlan.interior.name === "none"
            ? "未指定"
            : orderPlan.interior.name,
      },
      {
        title: "施術者",
        value: Number(orderPlan.staff.name) === 0 ? "未指定" : "あり",
      },
    ];
    const plan: TitleValue[] = [
      {
        title: "カード払い",
        value: orderPlan.card.name === "none" ? "未指定" : orderPlan.card.name,
      },
      {
        title: "医療ローン",
        value: orderPlan.loan.name === "none" ? "未指定" : orderPlan.loan.name,
      },
      {
        title: "コースの解約",
        value:
          orderPlan.contract.name === "none"
            ? "未指定"
            : orderPlan.contract.name,
      },
      // {
      //   title: "無料オプション",
      //   value: orderPlan.option === "none" ? "未指定" : orderPlan.option,
      // },
    ];
    setBaseData(base);
    setPartsData(parts);
    setYourData(your);
    setClinicData(clinic);
    setplanData(plan);
  }, [orderPlan]);

  return (
    <>
      <Box border={"1px"} p={"1rem"}>
        <Stack
          spacing={"0.5rem"}
          wrap={"wrap"}
          justifyContent={"space-evenly"}
          fontSize={"0.8rem"}
        >
          <Box mb={"1rem"}>
            <Text
              w={"9em"}
              bg={"originLiteGray"}
              border={"1px"}
              borderColor={"originBlack"}
            >
              性別
            </Text>
            <Text fontSize={"1rem"} fontWeight={"bold"}>
              {orderPlan.gender.name}
            </Text>
          </Box>
          <Box
            // なぜか縦が言うこと聞かない
            h={"7rem"}
          >
            <Text
              w={"9em"}
              bg={"originLiteGray"}
              border={"1px"}
              borderColor={"originBlack"}
            >
              部位
            </Text>
            {partsData.map((data, i) => (
              <ResultCardBox key={i} title={data.title} value={data.value} />
            ))}
          </Box>
          <Box>
            <Text
              w={"9em"}
              bg={"originLiteGray"}
              border={"1px"}
              borderColor={"originBlack"}
            >
              自分
            </Text>
            {yourData.map((data, i) => (
              <ResultCardBox key={i} title={data.title} value={data.value} />
            ))}
          </Box>
          <Box>
            <Text
              w={"9em"}
              bg={"originLiteGray"}
              border={"1px"}
              borderColor={"originBlack"}
            >
              クリニック
            </Text>
            {clinicData.map((data, i) => (
              <ResultCardBox key={i} title={data.title} value={data.value} />
            ))}
          </Box>
          <Box h={"7rem"}>
            <Text
              w={"9em"}
              bg={"originLiteGray"}
              border={"1px"}
              borderColor={"originBlack"}
            >
              プラン
            </Text>
            {planData.map((data, i) => (
              <ResultCardBox key={i} title={data.title} value={data.value} />
            ))}
          </Box>
        </Stack>
        <Box mt={"0.5rem"}>
          <Button onClick={onOpen} w={"10em"} variant={"gold"} size={"xs"}>
            条件を変更
          </Button>
        </Box>
      </Box>
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
