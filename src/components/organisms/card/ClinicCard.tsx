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
import { SalonListHook } from "../../../hooks/app/salon/search/SalonListHook";
import clinicImg from "../../../resorces/clinic.jpg";
import { ClinicNestPriceDto } from "../../../type/api/dto/ClinicNestPriceDto";
import { Clinic } from "../../../type/api/Clinic";
import { PriceDto } from "../../../type/api/dto/PriceDto";
import { InlineTitleBadge } from "../../atoms/badge/InlineTitleBadge";
import { FreeServiceTable } from "../../atoms/table/FreeServiceTable";
import { OpeningHoursTable } from "../../atoms/table/OpeningHoursTable";
import { PaymentRerationsTable } from "../../atoms/table/PaymentRerationsTable";
import { SmallPlanCard } from "../../molecules/card/SmallPlanCard";
import { PagenationParameter } from "../../../type/api/dto/PagenationParameterDto";
import { OptionText } from "../../../type/app/OptionText";
import { FreeServiceBoxList } from "../boxList/FreeServiceBoxList";
import { PayRerationsTextList } from "../textList/PayRerationsTextList";

type Props = {
  clinic: ClinicNestPriceDto;
};

const take = 10;
const skip = 2;

export const ClinicCard: VFC<Props> = memo((props) => {
  const { clinic } = props;
  const [payment, setPayment] = useState<OptionText[]>([]);
  const [additionalPrice, setAdditionalPrice] = useState<PriceDto[]>([]);
  const [detailViewState, setDetailViewState] = useState<boolean>(false);
  const [detailViewClass, setDetailViewClass] =
    useState<string>("defaultDisplayNone");

  const { checkFreeOption, newOptionFunc } = SalonListHook();
  const { getPriceByClinicId } = PriceApi();

  const getApiPrice = useCallback(
    async (clinicId: string) => {
      const query: PagenationParameter = { take, skip };
      const data = await getPriceByClinicId(clinicId, query);
      setAdditionalPrice(data);
    },
    [getPriceByClinicId]
  );

  const OptionFunc = useCallback(async () => {
    const clinicOptionList = newOptionFunc(clinic);
    setPayment(clinicOptionList.payment);
  }, [newOptionFunc, clinic]);

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
        // px={"2rem"}
        // minH={"15rem"}
        wrap={"wrap"}
        justifyContent={"center"}
        spacing={"0"}
        // justifyContent={{ md: "space-between", sm: "center" }}
      >
        <Box
          // maxW={"20rem"}
          w={"22rem"}
          textAlign={"left"}
          mb={"2rem"}
          overflow={"scroll"}
        >
          <Box pb={"2px"}>{clinic.name}</Box>
          <HStack overflow={"scroll"}>
            <Image w={"22rem"} src={clinicImg} />
            <Image w={"22rem"} src={clinicImg} />
            <Image w={"22rem"} src={clinicImg} />
          </HStack>
        </Box>
        <Stack
          h={"100%"}
          // w={{ md: "60%", sm: "95%" }}
          w={"40rem"}
          alignContent={"space-evenly"}
          spacing={"0"}
          // mb={"2rem !important"}
        >
          <Box>
            <InlineTitleBadge bg={"originWhite"}>無料サービス</InlineTitleBadge>
            <Box mt={"0.5rem"}>
              {/* <FreeServiceTable datas={clinic.clinicOption} /> */}
              <FreeServiceBoxList clinicOption={clinic.clinicOption} />
            </Box>
            {/* <Text>{freeOption}</Text> */}
          </Box>
          <HStack spacing={"0"} justifyContent={"space-evenly"} wrap={"wrap"}>
            <Box w={"9rem"} mx={"1rem"} mt={"0.7rem"}>
              <InlineTitleBadge fontSize={"1px"}>支払い関連</InlineTitleBadge>
              <Flex mt={"0.5rem"} mx={"auto"} justifyContent={"flex-start"}>
                {/* <PaymentRerationsTable datas={payment} /> */}
                <PayRerationsTextList payments={payment} />
              </Flex>
            </Box>
            <Box w={"19rem"} mx={"1rem"} mt={"0.7rem !important"}>
              <InlineTitleBadge bg={"originWhite"}>診察時間</InlineTitleBadge>
              <Box
                mt={"0.5rem"}
                //  maxW={"80%"} mx={"auto"}
                overflow={"scroll"}
              >
                <OpeningHoursTable datas={clinic.clinicOpeningHours} />
              </Box>
            </Box>
          </HStack>
          <Flex justifyContent={"center"} mt={"0.7rem"}>
            <Box mt={"0.7rem"}>
              <InlineTitleBadge bg={"originWhite"}>アクセス</InlineTitleBadge>
              <Box textAlign={"left"} mt={"0.5rem"}>
                <Text fontSize={"0.6rem"}>
                  住所：
                  <Text as={"a"} pl={"0.7rem"} fontSize={"0.8rem"}>
                    {clinic.address}
                  </Text>
                </Text>
                <Text fontSize={"0.6rem"}>
                  最寄り駅：
                  <Text as={"a"} pl={"0.7rem"} fontSize={"0.8rem"}>
                    {clinic.nearestStation}
                  </Text>
                </Text>
              </Box>
            </Box>
          </Flex>
        </Stack>
      </HStack>
      {/* <Box borderBottom={"1px"} borderColor={"black"} mt={"0.5rem"}></Box> */}
      <Box>
        <Link
          href={clinic.url}
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

      <Flex wrap={"wrap"} justifyContent={"space-evenly"}>
        {clinic.prices.map((data, int) => (
          <Box w={"22rem"} m={{ md: "0.5rem", sm: "0.3rem 0" }} key={int}>
            <SmallPlanCard price={data} />
          </Box>
        ))}
      </Flex>
      <Box className={detailViewClass}>
        <Flex wrap={"wrap"} justifyContent={"space-evenly"}>
          {additionalPrice.map((data, int) => (
            <Box w={"22rem"} m={{ md: "0.5rem", sm: "0.3rem 0" }} key={int}>
              <SmallPlanCard price={data} />
            </Box>
          ))}
        </Flex>
        <Button variant={"whiteNotSpace"} p={"5px 10px"} my={"1rem"}>
          他のプランも見る
        </Button>
      </Box>

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
