import {
  Box,
  Button,
  color,
  Flex,
  HStack,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { OptionServiceCard } from "../../molecules/card/OptionServiceCard";
import { useHistory } from "react-router-dom";
import { StaffGenderText } from "../../atoms/text/StaffGenderText";
import { InlineTitleBadge } from "../../atoms/badge/InlineTitleBadge";
import { StatusText } from "../../atoms/text/StatusText";
import { SalonListHook } from "../../../hooks/app/salon/search/SalonListHook";
import { PriceDto } from "../../../type/api/dto/PriceDto";
import { OrderPlanIdName } from "../../../type/app/OrderPlanIdName";
import { OptionText } from "../../../type/app/OptionText";
import { FreeServiceBoxList } from "../boxList/FreeServiceBoxList";
import { PayRerationsBoxList } from "../boxList/PayRerationsBoxList";
import { PlanConditionBox } from "../../atoms/box/PlanConditionBox";
import { OpeningHoursTable } from "../../atoms/table/OpeningHoursTable";
import { TopResource } from "../../../resorces/TopResource";
import { SearchSalonHooks } from "../../../hooks/app/salon/SearchSalonHooks";

type Props = {
  plan: PriceDto;
  orderDataIdName: OrderPlanIdName;
};
export const PlanCard: VFC<Props> = memo((props) => {
  const { plan, orderDataIdName } = props;
  const [detailViewState, setDetailViewState] = useState<boolean>(false);
  const [detailViewClass, setDetailViewClass] =
    useState<string>("defaultDisplayNone");
  const [optionService, setOptionService] = useState<OptionText[]>();
  const [medicalFee, setMedicalFee] = useState<OptionText[]>();
  const [payment, setPayment] = useState<OptionText[]>();
  const { newOptionFunc } = SalonListHook();
  const { getRandomImg } = SearchSalonHooks();
  const history = useHistory();

  const OptionFunc = useCallback(() => {
    const clinicOption = newOptionFunc(plan.clinic);
    setOptionService(clinicOption.service);
    setMedicalFee(clinicOption.medicalFee);
    setPayment(clinicOption.payment);
  }, [plan, newOptionFunc]);

  const detailOpen = useCallback(() => {
    if (!detailViewState) {
      setDetailViewClass("detailServiceOpen");
    } else {
      setDetailViewClass("detailServiceClose");
    }
    setDetailViewState(!detailViewState);
  }, [detailViewState]);

  useEffect(() => {
    OptionFunc();
  }, [OptionFunc]);

  return (
    <Box
      py={"1rem"}
      my={"1rem"}
      borderRadius={8}
      shadow={"0 4px 8px 2px rgb(180,180,180)"}
      // border="2px"
      // borderColor="#00188b"
    >
      <HStack
        // minH={"15rem"}
        wrap={"wrap"}
        justifyContent={{ md: "space-evenly", sm: "center" }}
        alignItems={"flex-start"}
        spacing={"0"}
      >
        <Box h={"100%"} w={"22rem"} textAlign={"left"} overflow={"scroll"}>
          <Box pb={"2px"} pl={"8px"}>
            {plan.clinic.name}
          </Box>
          <Flex wrap={{ md: "wrap", sm: "nowrap" }}>
            <Image maxH={"80%"} src={getRandomImg()} />
            <Image
              maxH={"80%"}
              mt={{ md: "5px", sm: "0" }}
              src={getRandomImg()}
            />
          </Flex>
        </Box>
        {/* <Box h={"100%"} w={{ md: "inherit", sm: "100%" }} px={"1em"}> */}
        {/* <HStack
            wrap={"wrap"}
            justifyContent={"space-around"}
            spacing={"0"}
            px={"1em"}
          > */}
        <Box
          spacing={"0"}
          // w="13.3rem"
          w={{ md: "30rem", sm: "100%" }}
          mt={"1rem"}
          px={"1em"}
        >
          <Text fontSize={"0.9rem"}>{plan.name}</Text>
          <Box my={"5px"}>
            {/* <InlineTitleBadge fontSize={"0.9rem"}>料金</InlineTitleBadge> */}
            <Box>
              <Text as={"a"} fontSize={"0.4rem"}>
                ({plan.clinic.tax || "不明"})
              </Text>
              {orderDataIdName.paySystem !== "総額" ? (
                <>
                  <Text as={"a"} fontSize={{ md: "1.8rem", sm: "1.5rem" }}>
                    ￥{plan.oncePrice.toLocaleString()}
                  </Text>
                  <Text as={"a"}>/回</Text>
                </>
              ) : (
                <>
                  <Text as={"a"} fontSize={{ md: "1.8rem", sm: "1.5rem" }}>
                    ￥{plan.price.toLocaleString()}
                  </Text>
                  {/* <Text as="a">({plan.times}回)</Text> */}
                </>
              )}
            </Box>
            <Box fontSize={"0.7rem"}>
              {orderDataIdName.paySystem !== "総額" ? (
                <>
                  <Text as="a">総額</Text>
                  <Text as="a">￥{plan.price.toLocaleString()}</Text>
                  {/* <Text as="a">({plan.times}回)</Text> */}
                </>
              ) : (
                <>
                  <Text as="a">￥{plan.oncePrice.toLocaleString()}</Text>
                  <Text as={"a"}>/回</Text>
                </>
              )}
            </Box>
          </Box>
          {/* <Box my={"5px"} display={{ md: "block", sm: "none" }}>
                <InlineTitleBadge>回数</InlineTitleBadge>
                <Text my={1}>{plan.times}回</Text>
              </Box> */}
          <Box my={"1em"}>
            <Box w="96%" mx={"auto"}>
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                borderTop={"1px"}
                borderColor={"originGray"}
                textAlign={"left"}
                py={"3px"}
              >
                <Text
                  color={"originLiteBlack"}
                  fontWeight={"bold"}
                  // w={"3.5rem"}
                  fontSize={"0.8em"}
                  px={"1em"}
                >
                  回数
                </Text>
                <Text px={"1em"}>{plan.times}回</Text>
              </Flex>
              {/* <PlanConditionBox title={"回数"} text={plan.times + "回"} /> */}
            </Box>
            <Flex wrap={"wrap"} w={"100%"} justifyContent="space-between">
              {/* <Box w="50%" px={"5px"}>
                  <PlanConditionBox title={"回数"} text={plan.times + "回"} />
                </Box> */}
              <Box w="50%" px={"5px"}>
                <PlanConditionBox
                  title={"施術者"}
                  text={plan.clinic.staffGender}
                  gender={true}
                />
              </Box>
              <Box w="50%" px={"5px"}>
                <PlanConditionBox
                  title={"予約"}
                  text={plan.clinic.reserve}
                  first={"優良"}
                  second={"良好"}
                  other={"不明"}
                />
              </Box>
              <Box w="50%" px={"5px"}>
                <PlanConditionBox
                  title={"内装"}
                  text={plan.clinic.interior}
                  first={"豪華"}
                  second={"綺麗"}
                  other={"不明"}
                />
              </Box>
              <Box w="50%" px={"5px"}>
                <PlanConditionBox
                  title={"施術室"}
                  text={plan.clinic.roomType}
                  first={"完全個室"}
                  second={"個室"}
                  other={"不明"}
                />
              </Box>

              <Box
                mx={"5px"}
                w={"46%"}
                borderTop={"1px"}
                borderColor={"originGray"}
              ></Box>
              <Box
                mx={"5px"}
                w={"46%"}
                borderTop={"1px"}
                borderColor={"originGray"}
              ></Box>
              {/* <Box w={"90%"} borderTop={"1px"} borderColor={"originGray"}></Box> */}
            </Flex>
          </Box>
          <Box w="100%" fontSize={"0.8em"} textAlign={"left"}>
            <Text>念の為、公式ホームページのご確認をお願い致します。</Text>
            <Text>掲載情報に相違がある場合がございます。</Text>
          </Box>
          {/* </Stack>
        <Stack
          w={{ md: "inherit", sm: "100%" }}
          spacing={"1em"}
          justifyContent={{ md: "center", sm: "left" }}
          alignItems={"center"}
          px={"1em"}
          mt={"1em"}
        > */}
          <Box w={"100%"} mt={"1em"}>
            <Box textAlign={"left"}>
              <Text
                fontSize={"0.9em"}
                color={"originBlack"}
                fontWeight={"bold"}
              >
                オプションサービス
              </Text>
              {/* <InlineTitleBadge bg={"originWhite"}>
                    オプションサービス
                  </InlineTitleBadge> */}
            </Box>
            <Flex wrap={"nowrap"} overflow={"scroll"}>
              <FreeServiceBoxList clinicOption={plan.clinic.clinicOption} />
            </Flex>
          </Box>
          {payment && (
            <Box w={"100%"}>
              <Box textAlign={"left"}>
                <Text
                  fontSize={"0.9em"}
                  color={"originBlack"}
                  fontWeight={"bold"}
                >
                  契約/支払い
                </Text>
                {/* <InlineTitleBadge bg={"originWhite"}>
                      契約/支払い
                    </InlineTitleBadge> */}
              </Box>
              <Flex wrap={"nowrap"} overflow={"scroll"}>
                <PayRerationsBoxList payments={payment} />
              </Flex>
            </Box>
          )}
          {/* <Stack spacing={"1em"} w={{ md: "48%", sm: "100%" }}> */}
          <Box w={"100%"} justifyContent={"left"} alignItems={"center"}>
            <Box w="100%" textAlign={"left"}>
              <Text
                fontSize={"0.9em"}
                color={"originBlack"}
                fontWeight={"bold"}
              >
                診察時間
              </Text>
              {/* <InlineTitleBadge bg={"originWhite"}>
                    診察時間
                  </InlineTitleBadge> */}
            </Box>
            <Box mt={"3px"} overflow={"scroll"} w={{ md: "20em", sm: "95%" }}>
              <OpeningHoursTable datas={plan.clinic.clinicOpeningHours} />
            </Box>
          </Box>
          <Flex alignItems={"center"} w={"100%"} mt={"1em"}>
            <Text
              fontSize={"0.9em"}
              color={"originBlack"}
              fontWeight={"bold"}
              mr={"1rem"}
              alignItems={"center"}
            >
              アクセス
            </Text>
            {/* <InlineTitleBadge bg={"originWhite"}>
                    アクセス
                  </InlineTitleBadge> */}
            <Text fontSize={"0.8rem"} textAlign={"left"}>
              {plan.clinic.nearestStation}
            </Text>
          </Flex>
        </Box>
        {/* </Stack> */}
        {/* </HStack> */}
        {/* </Box> */}
      </HStack>
      {/* <Box borderBottom={"1px"} borderColor={"black"} mt={"0.5rem"}></Box> */}
      <Box>
        <Link
          href={plan.clinic.url}
          _hover={{ textDecoration: "none" }}
          _focus={{ outline: "none" }}
          isExternal
        >
          <Button my={"1rem"} mx={"1.5rem"} size={"lg"} variant="base">
            公式サイト
          </Button>
        </Link>
        {/* <Button mb={"1rem"} mx={"1.5rem"} size={"lg"} variant={"secBase"}>
          詳細を開く
        </Button> */}
      </Box>
      {/* <Link display={"inline-block"} fontSize={"0.7rem"} onClick={detailOpen}>
        {detailViewState ? "閉じる" : "もっと見る"}
      </Link>
      <Box className={detailViewClass}>
        <Stack spacing={"0"} justifyContent={"center"}>
          {optionService && (
            <Box w={"100%"}>
              <InlineTitleBadge bg={"originWhite"}>
                オプションサービス
              </InlineTitleBadge>
              <Flex wrap={"nowrap"} overflow={"scroll"}>
                <FreeServiceBoxList clinicOption={plan.clinic.clinicOption} />
              </Flex>
            </Box>
          )}
          <Box
            w={"80%"}
            mx={"auto"}
            borderTop={"1px"}
            borderColor={"originGray"}
          ></Box>
          {payment && (
            <Box mt={"1em"}>
              <InlineTitleBadge bg={"originWhite"}>
                契約/支払い
              </InlineTitleBadge>
              <PayRerationsBoxList payments={payment} />
            </Box>
          )}
        </Stack>
      </Box> */}
    </Box>
  );
});
