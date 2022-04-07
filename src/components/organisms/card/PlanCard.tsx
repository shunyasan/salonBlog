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
import clinicImg from "../../../resorces/clinic.jpg";
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
      my={"1rem !important"}
      borderRadius={8}
      shadow={"0 4px 8px 2px rgb(180,180,180)"}
      // border="2px"
      // borderColor="#00188b"
    >
      <HStack
        // minH={"15rem"}
        wrap={"wrap"}
        justifyContent={"center"}
      >
        <Box h={"100%"} w={"22rem"} textAlign={"left"}>
          <Box pb={"2px"}>{plan.clinic.name}</Box>
          <Image maxH={"80%"} src={clinicImg} />
        </Box>
        <Box h={"100%"} w={{ md: "inherit", sm: "100%" }}>
          <HStack wrap={"wrap"} justifyContent={"space-around"} spacing={"0"}>
            <Stack
              spacing={"0"}
              // w="13.3rem"
              w={"13.3rem"}
            >
              <Box my={"5px"}>
                <InlineTitleBadge>料金</InlineTitleBadge>
                <Box>
                  <Text as={"a"} fontSize={"0.4rem"}>
                    ({plan.clinic.tax || "不明"})
                  </Text>
                  {orderDataIdName.paySystem !== "総額" ? (
                    <>
                      <Text as={"a"} fontSize={{ md: "2rem" }}>
                        ￥{plan.oncePrice.toLocaleString()}
                      </Text>
                      <Text as={"a"}>/回</Text>
                    </>
                  ) : (
                    <Text as={"a"} fontSize={{ md: "2rem", sm: "1.6rem" }}>
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
              <Box my={"5px !important"}>
                <InlineTitleBadge>回数</InlineTitleBadge>
                <Text my={1}>{plan.times}回</Text>
              </Box>
            </Stack>
            <Flex
              w={{ md: "23rem", sm: "30rem" }}
              spacing={"0"}
              wrap={"wrap"}
              justifyContent={"center"}
            >
              <Flex
                justifyContent={"center"}
                w={{ md: "100%", sm: "45%" }}
                mt={"5px"}
              >
                <Box>
                  <InlineTitleBadge>部位</InlineTitleBadge>
                  <Text my={1}>{plan.name}</Text>
                </Box>
              </Flex>
              <Flex
                justifyContent={"center"}
                w={{ md: "100%", sm: "45%" }}
                mt={"5px"}
              >
                <Box
                  w={"9rem"}
                  // mt={"0.5rem"}
                  // bg={"#f6f6f6"}
                  // p={"0.5rem 1rem"}
                >
                  <Box>
                    <InlineTitleBadge>情報</InlineTitleBadge>
                  </Box>
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
                    <Box mt="0.3rem">
                      <StaffGenderText staffGender={plan.clinic.staffGender} />
                    </Box>
                  )}
                </Box>
              </Flex>
              <Flex justifyContent={"center"} mt={"5px"}>
                <Box textAlign={"center"}>
                  <InlineTitleBadge bg={"originWhite"}>
                    アクセス
                  </InlineTitleBadge>
                  <Box
                    px={"1em"}
                    fontSize={"0.8rem"}
                    mt={"5px"}
                    textAlign={"left"}
                  >
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
              </Flex>
            </Flex>
          </HStack>
        </Box>
      </HStack>
      <Box borderBottom={"1px"} borderColor={"black"} mt={"0.5rem"}></Box>
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
        <Button mb={"1rem"} mx={"1.5rem"} size={"lg"} variant={"secBase"}>
          詳細を開く
        </Button>
      </Box>
      <Link display={"inline-block"} fontSize={"0.7rem"} onClick={detailOpen}>
        {detailViewState ? "閉じる" : "もっと見る"}
      </Link>
      <Box className={detailViewClass}>
        <Stack spacing={"0"} justifyContent={"center"}>
          {optionService && (
            <Box
            // w={"34rem"}
            >
              <InlineTitleBadge bg={"originWhite"}>
                オプションサービス
              </InlineTitleBadge>
              <FreeServiceBoxList clinicOption={plan.clinic.clinicOption} />
            </Box>
          )}
          <Box
            w={"80%"}
            mx={"auto !important"}
            borderTop={"1px"}
            borderColor={"originGray"}
          ></Box>
          {payment && (
            <Box mt={"1em !important"}>
              <InlineTitleBadge bg={"originWhite"}>
                契約/支払い
              </InlineTitleBadge>
              <PayRerationsBoxList payments={payment} />
            </Box>
          )}
        </Stack>
      </Box>
    </Box>
  );
});
