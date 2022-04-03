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
import { OrderPlanIdName } from "../../../type/app/ViewTypeFromApi";
import clinicImg from "../../../resorces/clinic.jpg";
import { OptionServiceCard } from "../../molecules/card/OptionServiceCard";
import { useHistory } from "react-router-dom";
import { StaffGenderText } from "../../atoms/text/StaffGenderText";
import { OptionServiceText, OptionText } from "../../../type/app/BaseType";
import { ApiPrice } from "../../../type/api/ApiType";
import { InlineTitleBadge } from "../../atoms/badge/InlineTitleBadge";
import { StatusText } from "../../atoms/text/StatusText";
import { SalonListHook } from "../../../hooks/app/salon/search/SalonListHook";

type Props = {
  plan: ApiPrice;
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
        </Box>
        <Box h={"100%"} w={"55%"}>
          <HStack wrap={"wrap"} justifyContent={"space-around"}>
            <Stack spacing={"1rem"}>
              <Box>
                <InlineTitleBadge>料金</InlineTitleBadge>
                <Box>
                  <Text as={"a"} fontSize={"0.4rem"}>
                    ({plan.clinic.tax || "不明"})
                  </Text>
                  {orderDataIdName.paySystem !== "総額" ? (
                    <>
                      <Text as={"a"} fontSize={"2rem"}>
                        ￥{plan.oncePrice.toLocaleString()}
                      </Text>
                      <Text as={"a"}>/回</Text>
                    </>
                  ) : (
                    <Text as={"a"} fontSize={"2rem"}>
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
                <InlineTitleBadge>回数</InlineTitleBadge>
                <Text my={1}>{plan.times}回</Text>
              </Box>
            </Stack>
            <Box w={"55%"}>
              <Flex pt={3} justifyContent={"center"}>
                <Box>
                  <InlineTitleBadge>部位</InlineTitleBadge>
                  <Text my={1}>{plan.name}</Text>
                </Box>
              </Flex>
              <Box
                w={"65%"}
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
                  <StatusText
                    text={plan.clinic.reserve}
                    first={"優良"}
                    second={"良好"}
                    fontSize={"0.9rem"}
                    other={"不明"}
                  />
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
                  <StatusText
                    text={plan.clinic.interior}
                    first={"豪華"}
                    second={"綺麗"}
                    fontSize={"0.9rem"}
                    other={"不明"}
                  />
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
                  <StatusText
                    text={plan.clinic.roomType}
                    first={"完全個室"}
                    second={"個室"}
                    fontSize={"0.9rem"}
                    other={"不明"}
                  />
                </HStack>
                {plan.clinic.staffGender !== 0 && (
                  <Box mt="1rem">
                    <StaffGenderText staffGender={plan.clinic.staffGender} />
                  </Box>
                )}
              </Box>
            </Box>
          </HStack>
          <Box px={"1em"} textAlign={"left"} fontSize={"0.8rem"}>
            <Text>
              <Text as={"a"} fontSize={"0.6rem"} mr={"1rem"}>
                住所：
              </Text>
              {plan.clinic.address}
            </Text>
            <Text>
              <Text as={"a"} fontSize={"0.6rem"} mr={"1rem"}>
                最寄り駅：
              </Text>
              {plan.clinic.nearestStation}
            </Text>
          </Box>
        </Box>
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
          <Box>
            <OptionServiceCard
              topTitle={"オプションサービス"}
              datas={optionService}
            />
            <Box
              borderBottom={"1px"}
              borderColor={"originGray"}
              w={"80%"}
              mx={"auto"}
            ></Box>
          </Box>
        )}
        {medicalFee && (
          <Box pt={"1rem"}>
            <OptionServiceCard topTitle={"診察料"} datas={medicalFee} />
            <Box
              borderBottom={"1px"}
              borderColor={"originGray"}
              w={"80%"}
              mx={"auto"}
            ></Box>
          </Box>
        )}
        {payment && (
          <Box pt={"1rem"}>
            <OptionServiceCard topTitle={"契約/支払い"} datas={payment} />
          </Box>
        )}
      </Box>
    </Box>
  );
});
