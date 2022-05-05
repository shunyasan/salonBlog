import { Button } from "@chakra-ui/button";
import { Box, Center, Flex, HStack, Text } from "@chakra-ui/layout";
import React, { memo, useCallback, useEffect, useState, VFC } from "react";
import { useHistory, useLocation } from "react-router";
import { useParams } from "react-router-dom";
import { QueryKey } from "../../../enums/QueryKey";
import { CreateParameterHooks } from "../../../hooks/app/parameter/CreateParameterHooks";
import { PageQuery } from "../../../type/app/PageQuery";
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
  const [showPage, setShowPage] = useState<number>(0);
  const [queryOrderPlan, setQueryOrderPlan] = useState<QueryOrderPlan>();
  const [pageQuery, setPageQuery] = useState<PageQuery>({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
  });

  // 次ボタン
  // const nextClick = useCallback(
  //   async (newParams: string) => {
  //     setChange("slide");
  //     const decode = decodeURI(search);
  //     setPrevParamsData(decode);
  //     const createParams = `${decode}${newParams}`;
  //     const encode = encodeURI(createParams);
  //     history.push({
  //       pathname: "/salon",
  //       search: encode,
  //     });
  //     // 編集前
  //     // setNewParams("");
  //   },
  //   [history, search]
  // );

  const createPageQuery = useCallback(
    (query: string, page: number) => {
      const queryData: any = pageQuery;
      queryData[page] = query;
      setPageQuery(queryData);
    },
    [pageQuery]
  );

  // 次ボタン　パラメーター
  const selectParamsData = useCallback(
    (query: string, page: number) => {
      setChange("slide");
      createPageQuery(query, page);
      const decode = decodeURI(search);
      setPrevParamsData(decode);
      const createParams = `${decode}${query}`;
      const encode = encodeURI(createParams);
      setShowPage(page || 0);

      history.push({
        pathname: "/salon",
        search: encode,
      });
    },
    [history, search, createPageQuery]
  );

  // 戻るボタン
  const prevClick = useCallback(async () => {
    const queryData: any = pageQuery;
    const page = showPage - 1;
    const query = queryData[page];

    for (const key in pageQuery) {
      if (showPage <= Number(key)) {
        queryData[key] = "";
      }
    }
    setPageQuery(queryData);

    setChange("");
    setShowPage(page < 0 ? 0 : page);
    history.push({
      pathname: "/salon",
      search: query,
    });
    // 編集前
    // setNewParams("");
  }, [history, showPage, pageQuery]);

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

  const transitionTop = useCallback(() => {
    setShowPage(0);
    setChange("fade");
    history.push("/salon");
  }, [history]);

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
        <Button variant={"secBase"} onClick={transitionTop}>
          最初からやり直す
        </Button>
      </Center>
    </>
  );
});
