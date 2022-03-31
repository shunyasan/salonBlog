import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Link,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { PriceApi } from "../../../hooks/api/PriceApi";
import { ClinicOptionHook } from "../../../hooks/app/ClinicOptionHook";
import clinicImg from "../../../resorces/clinic.jpg";
import { ApiOnlyPrice, ClinicNestPrice } from "../../../type/api/ApiType";
import { OptionText } from "../../../type/app/BaseType";
import { InlineTitleBadge } from "../../atoms/badge/InlineTitleBadge";
import { SmallPlanCard } from "../../molecules/card/SmallPlanCard";

type Props = {
  clinic: ClinicNestPrice;
};
export const ClinicCard: VFC<Props> = memo((props) => {
  const { clinic } = props;
  const [freeOption, setFreeOption] = useState<string>("");
  const [payment, setPayment] = useState<OptionText[]>([]);
  const [additionalPrice, setAdditionalPrice] = useState<ApiOnlyPrice[]>([]);
  const [detailViewState, setDetailViewState] = useState<boolean>(false);
  const [detailViewClass, setDetailViewClass] =
    useState<string>("defaultDisplayNone");

  const { checkFreeOption, newOptionFunc } = ClinicOptionHook();
  const { getPriceByClinicId } = PriceApi();

  const getApiPrice = useCallback(
    async (clinicId: string) => {
      const data = await getPriceByClinicId(clinicId);
      setAdditionalPrice(data);
    },
    [getPriceByClinicId]
  );

  const OptionFunc = useCallback(async () => {
    const clinicOption = checkFreeOption(clinic.clinicOption);
    const clinicOptionList = newOptionFunc(clinic);
    setFreeOption(clinicOption);
    setPayment(clinicOptionList.payment);
  }, [checkFreeOption, newOptionFunc, clinic]);

  const detailOpen = useCallback(
    async (clinicId: string) => {
      if (additionalPrice.length === 0) {
        await getApiPrice(clinicId);
      }
      if (!detailViewState) {
        setDetailViewClass("detailServiceOpenClinic");
      } else {
        setDetailViewClass("detailServiceCloseClinic");
      }
      setDetailViewState(!detailViewState);
    },
    [detailViewState, additionalPrice, getApiPrice]
  );

  useEffect(() => {
    OptionFunc();
  }, [OptionFunc]);

  return clinic ? (
    <Box
      p={"1rem"}
      my={"3rem"}
      borderRadius={8}
      shadow={"0 4px 8px 2px rgb(180,180,180)"}
    >
      <HStack
        px={"2rem"}
        // minH={"15rem"}
        wrap={"wrap"}
        justifyContent={"space-between"}
      >
        <Box w={"40%"} textAlign={"left"}>
          <Box pb={"2px"}>{clinic.name}</Box>
          <Image maxH={"80%"} src={clinicImg} />
        </Box>
        <Stack h={"100%"} w={"55%"} spacing={"8px"}>
          <Box mb={"1rem"}>
            <InlineTitleBadge bg={"originBlack"} color={"originWhite"}>
              無料サービス
            </InlineTitleBadge>
            <Text>{freeOption}</Text>
          </Box>
          <Flex wrap={"wrap"} justifyContent={"space-evenly"}>
            {payment.map((data, i) => (
              <Box key={i}>
                <InlineTitleBadge fontSize={"1px"}>
                  {data.name}
                </InlineTitleBadge>
                <Text pt={"2px"} fontSize={"0.8rem"}>
                  {data.text || "不明"}
                </Text>
              </Box>
            ))}
          </Flex>
          <Box>
            <Table variant={"unstyled"} size={"sm"}>
              <Thead>
                <Tr>
                  <Th>診察時間</Th>
                  <Th>月</Th>
                  <Th>火</Th>
                  <Th>水</Th>
                  <Th>木</Th>
                  <Th>金</Th>
                  <Th>土</Th>
                  <Th>日</Th>
                  <Th>祝</Th>
                </Tr>
              </Thead>
              <Tbody fontSize={"1rem"}>
                {clinic.clinicOpeningHours.map((hours, int) => (
                  <Tr key={int}>
                    <Td>
                      {hours.startHours}〜{hours.endHours}
                    </Td>
                    <Td>{hours.mon ? "〇" : "-"}</Td>
                    <Td>{hours.thu ? "〇" : "-"}</Td>
                    <Td>{hours.wed ? "〇" : "-"}</Td>
                    <Td>{hours.thir ? "〇" : "-"}</Td>
                    <Td>{hours.fri ? "〇" : "-"}</Td>
                    <Td>{hours.sat ? "〇" : "-"}</Td>
                    <Td>{hours.sun ? "〇" : "-"}</Td>
                    <Td>{hours.hol ? "〇" : "-"}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          <Box textAlign={"left"} pt={"1rem"}>
            <Text fontSize={"0.6rem"}>
              住所：
              <Text as={"a"} pl={"0.7rem"} fontSize={"1rem"}>
                {clinic.address}
              </Text>
            </Text>
            <Text fontSize={"0.6rem"}>
              最寄り駅：
              <Text as={"a"} pl={"0.7rem"} fontSize={"1rem"}>
                {clinic.nearestStation}
              </Text>
            </Text>
          </Box>
        </Stack>
      </HStack>
      {/* <Box borderBottom={"1px"} borderColor={"black"} mt={"0.5rem"}></Box> */}
      <Box pt={"2rem"} pb={"1rem"}>
        <Link href={clinic.url} _hover={{ textDecoration: "none" }} isExternal>
          <Button mr={"1.5rem"} size={"lg"} variant="base">
            公式サイト
          </Button>
        </Link>
        <Button ml={"1.5rem"} size={"lg"} variant={"secBase"}>
          詳細を開く
        </Button>
      </Box>

      <Flex wrap={"wrap"} w={"90%"} m={"auto"} justifyContent={"space-around"}>
        {clinic.onlyPrices.map((data, int) => (
          <Box w={"45%"} m={"0.7rem"} key={int}>
            <SmallPlanCard price={data} />
          </Box>
        ))}
      </Flex>
      <Flex
        className={detailViewClass}
        wrap={"wrap"}
        w={"90%"}
        m={"auto"}
        justifyContent={"space-around"}
      >
        {additionalPrice.map((data, int) => (
          <Box w={"45%"} m={"0.7rem"} key={int}>
            <SmallPlanCard price={data} />
          </Box>
        ))}
      </Flex>
      <Link
        display={"inline-block"}
        fontSize={"0.7rem"}
        onClick={() => detailOpen(clinic.id)}
      >
        {detailViewState ? "閉じる" : "もっと見る"}
      </Link>
    </Box>
  ) : (
    <></>
  );
});
