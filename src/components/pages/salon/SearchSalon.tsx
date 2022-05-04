import { Button } from "@chakra-ui/button";
import { Box, Center, Flex, HStack, Text } from "@chakra-ui/layout";
import React, { memo, useCallback, useEffect, useState, VFC } from "react";
import { useHistory, useLocation } from "react-router";
import { useParams } from "react-router-dom";
import { QueryKey } from "../../../enums/QueryKey";
import { CreateParameterHooks } from "../../../hooks/app/parameter/CreateParameterHooks";
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

export const SearchSalon: VFC = memo(() => {
  const { getQueryOrderPlan } = CreateParameterHooks();
  const history = useHistory();
  const { search } = useLocation();

  const [change, setChange] = useState<string>("fade");
  const [prevParamsData, setPrevParamsData] = useState<string>("?");
  // const [newParams, setNewParams] = useState<string>("");
  const [showPage, setShowPage] = useState<number>(0);
  const [queryOrderPlan, setQueryOrderPlan] = useState<QueryOrderPlan>();

  // 次ボタン
  const nextClick = useCallback(
    async (newParams: string) => {
      setChange("slide");
      const decode = decodeURI(search);
      setPrevParamsData(decode);
      const createParams = `${decode}${newParams}`;
      const encode = encodeURI(createParams);
      history.push({
        pathname: "/salon",
        search: encode,
      });
      // 編集前
      // setNewParams("");
    },
    [history, search]
  );

  // 戻るボタン
  const prevClick = useCallback(async () => {
    setChange("");
    history.push({
      pathname: "/salon",
      search: prevParamsData,
    });
    // 編集前
    // setNewParams("");
  }, [history, prevParamsData]);

  // 最後の条件ボタン
  const FindPlanLastCondition = useCallback(
    (query: string) => {
      const decode = decodeURI(search);
      history.push({
        pathname: "/salon/search",
        search: decode + query,
      });
    },
    [history, search]
  );

  // 検索ボタン
  const findPlan = useCallback(async () => {
    history.push({
      pathname: "/salon/search",
      search: search,
    });
  }, [history, search]);

  // パラメーター
  const selectParamsData = useCallback(
    (query: string, page: number) => {
      nextClick(query);
      setShowPage(page || 0);

      // setNewParams(`${query}=${data}&`);
    },
    [nextClick]
  );

  // 修正前
  // const selectParamsData = useCallback(
  //   (data: string, query: string, page: number) => {
  //     const param = `${query}=${data}&`;
  //     nextClick(param);
  //     setShowPage(page || 0);

  //     // setNewParams(`${query}=${data}&`);
  //   },
  //   [nextClick]
  // );

  // 戻るパラメーター
  const prevQuery = useCallback(
    (name: string) => {
      const decode = decodeURI(search);
      const prevQuery = decode.replace(new RegExp(name + ".*"), "");
      setPrevParamsData(prevQuery);
    },
    [search]
  );

  useEffect(() => {
    const orderPlanViewCard = getQueryOrderPlan(search);
    setQueryOrderPlan(orderPlanViewCard);
  }, [getQueryOrderPlan, search]);

  return (
    <>
      <Box textAlign="center" m={8}>
        <Center my={"1rem"} fontSize={"1.5rem"}>
          プランを探す{" "}
        </Center>
        <HStack justifyContent={"center"} wrap={"wrap"}>
          {[...Array(7)].map((_, i) => (
            <CompleteBadge
              key={i}
              number={i + 1}
              selected={showPage >= i}
              mx={"5px"}
              circle={{ md: "2.5rem", sm: "2rem" }}
            />
          ))}
        </HStack>
      </Box>
      {/* 毛量を選択 */}
      {showPage === 6 && queryOrderPlan ? (
        <HairCard setHairData={(query) => FindPlanLastCondition(query)} />
      ) : null}
      {/* 肌色を選択 */}
      {showPage === 5 && queryOrderPlan ? (
        <SkinCollorCard
          setSkinCollorData={(query) => selectParamsData(query, 6)}
        />
      ) : null}
      {/* 部位別を選択 */}
      {showPage === 4 && queryOrderPlan ? (
        <PartsCard
          setPartsData={(query) => selectParamsData(query, 5)}
          orderPlan={queryOrderPlan}
        />
      ) : null}
      {/* 大まかな部位を選ぶ */}
      {showPage === 3 && queryOrderPlan ? (
        <AboutPartsSelectCard
          setAboutPartsSelectData={(query) => selectParamsData(query, 4)}
          orderPlan={queryOrderPlan}
        />
      ) : null}
      {/* カテゴリを選ぶ */}
      {showPage === 2 && queryOrderPlan ? (
        <OriginPartsSelectCard
          setOriginPartsSelectData={(query) => selectParamsData(query, 3)}
          orderPlan={queryOrderPlan}
        />
      ) : null}
      {/* 料金表示を選択 */}
      {showPage === 1 && queryOrderPlan ? (
        <PriceViewCard
          selectParamsData={(query) => selectParamsData(query, 2)}
        />
      ) : null}
      {/* 性別を選択する */}
      {showPage === 0 && queryOrderPlan ? (
        <GenderCard
          setGenderData={(query) => selectParamsData(query, 1)}
          setAnimation={change}
        />
      ) : null}
      <Box m="2em" textAlign="center">
        {showPage === 0 || (
          <Button mx="7" onClick={prevClick} variant={"secBase"}>
            戻る
          </Button>
        )}
      </Box>
      {showPage > 2 && (
        <Box>
          <Center m="2em" textAlign="center">
            <Button
              mx="7"
              onClick={findPlan}
              // disabled={newParams === ""}
              variant={"base"}
            >
              検索
            </Button>
          </Center>
          {/* <Center m="14" textAlign="center">
            〇件見つかりました
          </Center> */}
        </Box>
      )}
      <Center m="2em">
        <BaseButton
          text={"最初からやり直す"}
          path={"/salon"}
          size={undefined}
          base={"secBase"}
        />
      </Center>
    </>
  );
});
