import {
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { CardName } from "../../../enums/SerchSalonCardName";
import { SalonListHook } from "../../../hooks/app/salon/search/SalonListHook";
import { IdAndNameDto } from "../../../type/api/dto/IdAndNameDto";
import { OrderPlanIdName } from "../../../type/app/OrderPlanIdName";
import { ConditionText } from "../../atoms/text/ConditionText";
import { PartsSelectBox } from "../../molecules/box/PartsSelectBox";

type Props = {
  OrderPlan: OrderPlanIdName;
  isOpen: boolean;
  onClose: () => void;
  resetPages: () => void;
};

export const PlanResearchModal: VFC<Props> = memo((props) => {
  const { OrderPlan, isOpen, onClose, resetPages } = props;
  const { getResearchCardData, createParameter } = SalonListHook();

  const [orderData, setOrderData] = useState<OrderPlanIdName>();
  const [partsAndCategory, setPartsAndCategory] = useState<{
    originCategory: IdAndNameDto[];
    aboutCategory: IdAndNameDto[];
    parts: IdAndNameDto[];
  }>();

  const getAllPartsAndCategory = useCallback(
    async (orderParams: OrderPlanIdName) => {
      const data = await getResearchCardData(
        orderParams.originParts.id,
        orderParams.AboutCategory.id,
        orderParams.parts?.id
      );
      setPartsAndCategory(data);
      setOrderData({
        gender: orderParams.gender,
        skinCollor: orderParams.skinCollor,
        hair: orderParams.hair,
        paySystem: orderParams.paySystem,
        originParts: data.originCategory[0],
        AboutCategory: data.aboutCategory[0],
        parts: data.parts[0],
      });
      return data;
    },
    [getResearchCardData]
  );

  const checkNewAboutPartsData = useCallback(
    (newOrderData: OrderPlanIdName, key: string, name: string, id?: string) => {
      if (key === "性別") {
        newOrderData.gender = name;
      } else if (key === "肌色") {
        newOrderData.skinCollor = name;
      } else if (key === "毛量") {
        newOrderData.hair = name;
      } else if (key === "料金体系") {
        newOrderData.paySystem = name;
      } else if (id && key === "広域カテゴリ") {
        newOrderData.originParts = { id, name };
        newOrderData.AboutCategory = { id: "", name: "" };
        newOrderData.parts = null;
      } else if (id && key === "詳細カテゴリ") {
        newOrderData.AboutCategory = { id, name };
        newOrderData.parts = null;
      } else if (id && key === "部位") {
        newOrderData.parts = { id, name };
      }
      return newOrderData;
    },
    []
  );

  const getSetOrderData = useCallback(
    async (key: string, name: string, id?: string) => {
      if (orderData) {
        const checkedParts: OrderPlanIdName = checkNewAboutPartsData(
          orderData,
          key,
          name,
          id
        );

        await getAllPartsAndCategory(checkedParts);
      }
    },
    [getAllPartsAndCategory, orderData, checkNewAboutPartsData]
  );

  const researchPlan = useCallback(async () => {
    if (orderData) {
      createParameter(orderData);
      onClose();
      resetPages();
    }
  }, [orderData, createParameter, onClose, resetPages]);

  useEffect(() => {
    getAllPartsAndCategory(OrderPlan);
  }, [getAllPartsAndCategory, OrderPlan]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w={{ md: "inherit", sm: "90%" }}>
        <ModalCloseButton />
        <ModalBody p={{ md: "2rem", sm: "2rem 1rem" }}>
          <Stack m={"auto"} textAlign={"center"} spacing={"2rem"}>
            {orderData && partsAndCategory ? (
              <>
                <ConditionText
                  title={"性別"}
                  orderData={orderData.gender}
                  texts={["女性", "男性"]}
                  onClick={(name: string) => getSetOrderData("性別", name)}
                />
                <ConditionText
                  title={"料金体系"}
                  orderData={orderData.paySystem}
                  texts={["総額", "１回分"]}
                  onClick={(name: string) => getSetOrderData("料金体系", name)}
                />
                <PartsSelectBox
                  title={"広域カテゴリ"}
                  data={partsAndCategory.originCategory}
                  noneValue={"未指定"}
                  onChange={(name: string, id: string) =>
                    getSetOrderData("広域カテゴリ", name, id)
                  }
                />
                <PartsSelectBox
                  title={"詳細カテゴリ"}
                  data={partsAndCategory.aboutCategory}
                  noneValue={"未指定"}
                  onChange={(name: string, id: string) =>
                    getSetOrderData("詳細カテゴリ", name, id)
                  }
                />
                <PartsSelectBox
                  title={"部位"}
                  data={partsAndCategory.parts}
                  noneValue={"未指定"}
                  onChange={(name: string, id: string) =>
                    getSetOrderData("部位", name, id)
                  }
                />
                <ConditionText
                  title={"肌色"}
                  orderData={orderData.skinCollor || "未選択"}
                  texts={["白色", "薄茶色", "色黒", "未選択"]}
                  onClick={(name: string) => getSetOrderData("肌色", name)}
                />
                <ConditionText
                  title={"毛量"}
                  orderData={orderData.hair || "未選択"}
                  texts={["産毛", "標準", "太い", "未選択"]}
                  onClick={(name: string) => getSetOrderData("毛量", name)}
                />
              </>
            ) : (
              ""
            )}
          </Stack>
          <Center mt={"2rem"}>
            <Button
              w={"60%"}
              variant={"base"}
              size={"md"}
              onClick={researchPlan}
            >
              再検索
            </Button>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
