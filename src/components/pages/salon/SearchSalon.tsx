import { Button } from "@chakra-ui/button";
import { Box, Center, Flex, HStack, Text } from "@chakra-ui/layout";
import React, { memo, useCallback, useEffect, useState, VFC } from "react";
import { useHistory, useLocation } from "react-router";
import { CardName } from "../../../enums/SerchSalonCardName";
import { QueryOrderPlan } from "../../../type/app/QueryOrderPlan";
import { ViewCard } from "../../../type/app/ViewCard";
import { CompleteBadge } from "../../atoms/badge/CompleteBadge";
import { BaseButton } from "../../atoms/button/BaseButton";
import { AboutPartsSelectCard } from "./page/AboutPartsSelectCard";
import { GenderCard } from "./page/GenderCard";
import { HairCard } from "./page/HairCard";
import { OriginPartsSelectCard } from "./page/OriginPartsSelectCard";
import { PartsCard } from "./page/PartsCard";
import { PriceViewCard } from "./page/PriceViewCard";
import { SkinCollorCard } from "./page/SkinCollarCard";

const viewCard: ViewCard[] = [
  { name: CardName.first, number: 1 },
  { name: CardName.second, number: 2 },
  { name: CardName.third, number: 3 },
  { name: CardName.fourth, number: 4 },
  { name: CardName.fifth, number: 5 },
  { name: CardName.sixth, number: 6 },
  { name: CardName.seventh, number: 7 },
];

export const SearchSalon: VFC = memo(() => {
  const [change, setChange] = useState<string>("fade");
  const [prevParamsData, setPrevParamsData] = useState<string>("?");
  const [newParams, setNewParams] = useState<string>("");
  const [showNumber, setShowNumber] = useState<number>(0);
  const [queryOrderPlan, setQueryOrderPlan] = useState<QueryOrderPlan>();

  const history = useHistory();
  const { search } = useLocation();

  const getQueryOrderPlan = useCallback(() => {
    const decode = decodeURI(search);
    const query = new URLSearchParams(decode);
    const orderPlanViewCard: QueryOrderPlan = {
      gender: query.get("gender"),
      skinCollor: query.get("skinCollor"),
      hair: query.get("hair"),
      paySystem: query.get("paySystem"),
      originParts: query.get("originParts"),
      AboutCategory: query.get("AboutCategory"),
      parts: query.get("parts"),
    };

    setQueryOrderPlan(orderPlanViewCard);
    return orderPlanViewCard;
  }, [search]);

  // パラメーター
  const selectParamsData = useCallback(
    (data: string, query: string) => {
      setNewParams(`${query}=${data}&`);
      getQueryOrderPlan();
    },
    [getQueryOrderPlan]
  );
  // 戻るパラメーター
  const prevQuery = useCallback(
    (name: string) => {
      const decode = decodeURI(search);
      const prevQuery = decode.replace(new RegExp(name + ".*"), "");
      setPrevParamsData(prevQuery);
      console.log(prevQuery);
    },
    [search]
  );

  const getViewCardData = useCallback((orderPlanViewCard: QueryOrderPlan) => {
    const existOrder: string[] = [];
    for (const [key, val] of Object.entries(orderPlanViewCard)) {
      if (val) {
        existOrder.push(key);
      }
    }

    const findViewCard = viewCard.filter((card) => {
      return existOrder.includes(card.name);
    });

    const sortViewData = findViewCard.sort((a, b) => {
      return b.number - a.number;
    });

    return sortViewData[0];
  }, []);

  const readViewData = useCallback(() => {
    const orderPlanViewCard = getQueryOrderPlan();
    const cardDatas = getViewCardData(orderPlanViewCard);

    if (cardDatas) {
      setShowNumber(cardDatas.number);
      prevQuery(cardDatas.name);
    } else {
      setShowNumber(0);
    }
  }, [getQueryOrderPlan, getViewCardData, prevQuery]);

  // 次ボタン
  const nextClick = useCallback(async () => {
    setChange("slide");
    const decode = decodeURI(search);
    setPrevParamsData(decode);
    const createParams = `${decode}${newParams}`;
    const encode = encodeURI(createParams);
    history.push({
      pathname: "/salon",
      search: encode,
    });
    setNewParams("");
  }, [history, search, newParams]);

  // 戻るボタン
  const prevClick = useCallback(async () => {
    setChange("");
    history.push({
      pathname: "/salon",
      search: prevParamsData,
    });
    setNewParams("");
  }, [history, prevParamsData]);

  // 検索ボタン
  const findPlan = useCallback(async () => {
    history.push({
      pathname: "/salon/search",
      search: search + newParams,
    });
  }, [history, search, newParams]);

  // 表示ページ
  useEffect(() => {
    readViewData();
  }, [readViewData]);

  return (
    <>
      <Box textAlign="center" m={8}>
        <Center textAlign="center">
          <CompleteBadge number={1} selected={showNumber >= 0} />
          <Text as="a" m={2}>
            －
          </Text>
          <CompleteBadge number={2} selected={showNumber >= 1} />
          <Text as="a" m={2}>
            －
          </Text>
          <CompleteBadge number={3} selected={showNumber >= 2} />
          <Text as="a" m={2}>
            －
          </Text>
          <CompleteBadge number={4} selected={showNumber >= 3} />
          <Text as="a" m={2}>
            －
          </Text>
          <CompleteBadge number={5} selected={showNumber >= 4} />
          <Text as="a" m={2}>
            －
          </Text>
          <CompleteBadge number={6} selected={showNumber >= 5} />
          <Text as="a" m={2}>
            －
          </Text>
          <CompleteBadge number={7} selected={showNumber >= 6} />
        </Center>
      </Box>
      {/* 毛量を選択 */}
      {showNumber === 6 && queryOrderPlan ? (
        <HairCard
          setHairData={(data) => selectParamsData(data, CardName.seventh)}
        />
      ) : null}
      {/* 肌色を選択 */}
      {showNumber === 5 && queryOrderPlan ? (
        <SkinCollorCard
          setSkinCollorData={(data) => selectParamsData(data, CardName.sixth)}
        />
      ) : null}
      {/* 部位別を選択 */}
      {showNumber === 4 && queryOrderPlan ? (
        <PartsCard
          setPartsData={(data) => selectParamsData(data, CardName.fifth)}
          orderPlan={queryOrderPlan}
        />
      ) : null}
      {/* 大まかな部位を選ぶ */}
      {showNumber === 3 && queryOrderPlan ? (
        <AboutPartsSelectCard
          setAboutPartsSelectData={(data) =>
            selectParamsData(data, CardName.fourth)
          }
          orderPlan={queryOrderPlan}
        />
      ) : null}
      {/* カテゴリを選ぶ */}
      {showNumber === 2 && queryOrderPlan ? (
        <OriginPartsSelectCard
          setOriginPartsSelectData={(data) =>
            selectParamsData(data, CardName.third)
          }
          orderPlan={queryOrderPlan}
        />
      ) : null}
      {/* 料金表示を選択 */}
      {showNumber === 1 && queryOrderPlan ? (
        <PriceViewCard
          selectParamsData={(data) => selectParamsData(data, CardName.second)}
        />
      ) : null}
      {/* 性別を選択する */}
      {showNumber === 0 && queryOrderPlan ? (
        <GenderCard
          setGenderData={(data) => selectParamsData(data, CardName.first)}
          setAnimation={change}
        />
      ) : null}
      <Box m="14" textAlign="center">
        {showNumber === 0 || (
          <Button mx="7" onClick={prevClick} variant={"secBase"}>
            戻る
          </Button>
        )}
        {showNumber !== 6 && (
          <Button
            mx="7"
            onClick={nextClick}
            disabled={newParams === ""}
            variant={"secBase"}
          >
            次へ
          </Button>
        )}
      </Box>
      {showNumber > 2 && (
        <Box>
          <Center m="14" textAlign="center">
            <Button
              mx="7"
              onClick={findPlan}
              disabled={newParams === ""}
              variant={"base"}
            >
              検索
            </Button>
          </Center>
          <Center m="14" textAlign="center">
            〇件見つかりました
          </Center>
        </Box>
      )}
      <Center m="16">
        <BaseButton text={"TOPに戻る"} path={"/"} />
        {/* <Button bg={"red"} onClick={importFunc}>
					import
				</Button> */}
      </Center>
    </>
  );
});
