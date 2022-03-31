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
import {
  OrderPlanIdName,
  PriceAndClinics,
} from "../../../type/app/ViewTypeFromApi";
import clinicImg from "../../../resorces/clinic.jpg";
import { OptionServiceCard } from "../../molecules/card/OptionServiceCard";
import { useHistory } from "react-router-dom";
import { StaffGenderText } from "../../atoms/text/StaffGenderText";
import { OptionServiceText, OptionText } from "../../../type/app/BaseType";
import { ApiPrice } from "../../../type/api/ApiType";
import { InlineTitleBadge } from "../../atoms/badge/InlineTitleBadge";
import { ClinicOptionHook } from "../../../hooks/app/ClinicOptionHook";

type Props = {
  plan: ApiPrice;
  orderDataIdName: OrderPlanIdName;
};
export const PlanCardList: VFC<Props> = memo((props) => {
  const { plan, orderDataIdName } = props;
  const [detailViewState, setDetailViewState] = useState<boolean>(false);
  const [detailViewClass, setDetailViewClass] =
    useState<string>("defaultDisplayNone");
  const [optionService, setOptionService] = useState<OptionText[]>();
  const [medicalFee, setMedicalFee] = useState<OptionText[]>();
  const [payment, setPayment] = useState<OptionText[]>();
  const { newOptionFunc } = ClinicOptionHook();
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
      p={"1rem"}
      my={"3rem"}
      borderRadius={8}
      shadow={"0 4px 8px 2px rgb(180,180,180)"}
      // border="2px"
      // borderColor="#00188b"
    >
      <HStack
        px={"2rem"}
        // minH={"15rem"}
        wrap={"wrap"}
        justifyContent={"space-between"}
      >
        <Box h={"100%"} w={"40%"} textAlign={"left"}>
          <Box pb={"2px"}>{plan.clinic.name}</Box>
          <Image maxH={"80%"} src={clinicImg} />
          <Box>
            <Text fontSize={"0.7rem"}>住所：{plan.clinic.address}</Text>
            <Text fontSize={"0.7rem"}>
              最寄り駅：{plan.clinic.nearestStation}
            </Text>
          </Box>
        </Box>
        <HStack
          h={"100%"}
          w={"55%"}
          textAlign={"center"}
          wrap={"wrap"}
          justifyContent={"space-around"}
        >
          <Box>
            <InlineTitleBadge>料金</InlineTitleBadge>
            <Box>
              <Text display={"inline"} fontSize={"0.4rem"}>
                ({plan.clinic.tax || "不明"})
              </Text>
              {orderDataIdName.paySystem !== "総額" ? (
                <>
                  <Text display={"inline"} fontSize={"2rem"}>
                    ￥{plan.oncePrice.toLocaleString()}
                  </Text>
                  <Text display={"inline"}>/1回</Text>
                </>
              ) : (
                <Text display={"inline"} fontSize={"2rem"}>
                  ￥{plan.price.toLocaleString()}
                </Text>
              )}
            </Box>
            {orderDataIdName.paySystem !== "総額" && (
              <Box fontSize={"0.5rem"}>
                <Text as="a">総額</Text>
                <Text as="a">￥{plan.price.toLocaleString()}</Text>
              </Box>
            )}
          </Box>
          <Box>
            <Flex pt={3} justifyContent={"center"}>
              <Box mr={"1rem"}>
                <InlineTitleBadge>部位</InlineTitleBadge>
                <Text my={1}>{plan.name}</Text>
              </Box>
              <Box ml={"1rem"}>
                <InlineTitleBadge>回数</InlineTitleBadge>
                <Text my={1}>{plan.times}回</Text>
              </Box>
            </Flex>
            <Box
              // w={"31%"}
              mx={"auto"}
              mt={"0.5rem"}
              // bg={"#f6f6f6"}
              p={"0.5rem 1rem"}
            >
              <InlineTitleBadge>情報</InlineTitleBadge>

              <HStack
                my={1}
                px={2}
                justifyContent={"space-between"}
                // borderBottom={"1px"}
                // borderColor={"originGray"}
              >
                <Text display={"inline"} fontSize={"0.7rem"}>
                  予約 :
                </Text>
                <Text
                  px={"5px"}
                  bg={"#ffdede"}
                  display={"inline"}
                  fontSize={"0.9rem"}
                >
                  {plan.clinic.reserve || "不明"}
                </Text>
              </HStack>
              <HStack
                my={1}
                px={2}
                justifyContent={"space-between"}
                // borderBottom={"1px"}
                // borderColor={"originGray"}
              >
                <Text display={"inline"} fontSize={"0.7rem"}>
                  内装 :
                </Text>
                <Text
                  px={"5px"}
                  bg={"#ffdede"}
                  display={"inline"}
                  fontSize={"0.9rem"}
                >
                  {plan.clinic.interior || "不明"}
                </Text>
              </HStack>
              <HStack
                my={1}
                px={2}
                justifyContent={"space-between"}
                // borderBottom={"1px"}
                // borderColor={"originGray"}
              >
                <Text display={"inline"} fontSize={"0.7rem"}>
                  施術室 :
                </Text>
                <Text
                  px={"5px"}
                  bg={"#ffdede"}
                  display={"inline"}
                  fontSize={"0.9rem"}
                >
                  {plan.clinic.roomType || "不明"}
                </Text>
              </HStack>
              {plan.clinic.staffGender !== 0 && (
                <Box mt="1rem">
                  <StaffGenderText staffGender={plan.clinic.staffGender} />
                </Box>
              )}
            </Box>
          </Box>
        </HStack>
      </HStack>
      <Box borderBottom={"1px"} borderColor={"black"} mt={"0.5rem"}></Box>
      <Box pt={"2rem"} pb={"1rem"}>
        <Link
          href={plan.clinic.url}
          _hover={{ textDecoration: "none" }}
          isExternal
        >
          <Button mr={"1.5rem"} size={"lg"} variant="base">
            公式サイト
          </Button>
        </Link>
        <Button ml={"1.5rem"} size={"lg"} variant={"secBase"}>
          詳細を開く
        </Button>
      </Box>
      <Link display={"inline-block"} fontSize={"0.7rem"} onClick={detailOpen}>
        {detailViewState ? "閉じる" : "もっと見る"}
      </Link>
      <Box className={detailViewClass}>
        {optionService && (
          <OptionServiceCard
            topTitle={"オプションサービス"}
            datas={optionService}
          />
        )}
        {medicalFee && (
          <OptionServiceCard topTitle={"診察料"} datas={medicalFee} />
        )}
        {payment && (
          <OptionServiceCard topTitle={"契約/支払い"} datas={payment} />
        )}
      </Box>
    </Box>
  );
});
