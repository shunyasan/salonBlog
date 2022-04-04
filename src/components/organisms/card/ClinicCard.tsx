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
import { OnlyPriceDto } from "../../../type/api/dto/OnlyPriceDto";
import { InlineTitleBadge } from "../../atoms/badge/InlineTitleBadge";
import { FreeServiceTable } from "../../atoms/table/FreeServiceTable";
import { OpeningHoursTable } from "../../atoms/table/OpeningHoursTable";
import { PaymentRerationsTable } from "../../atoms/table/PaymentRerationsTable";
import { SmallPlanCard } from "../../molecules/card/SmallPlanCard";
import { PagenationParameter } from "../../../type/api/dto/PagenationParameterDto";
import { OptionText } from "../../../type/app/OptionText";

type Props = {
  clinic: ClinicNestPriceDto;
};

const take = 10;
const skip = 2;

export const ClinicCard: VFC<Props> = memo((props) => {
  const { clinic } = props;
  const [freeOption, setFreeOption] = useState<string>("");
  const [payment, setPayment] = useState<OptionText[]>([]);
  const [additionalPrice, setAdditionalPrice] = useState<OnlyPriceDto[]>([]);
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
        <Stack
          h={"100%"}
          w={"55%"}
          spacing={"1rem"}
          alignContent={"space-evenly"}
        >
          <Box>
            <InlineTitleBadge bg={"originWhite"}>無料サービス</InlineTitleBadge>
            <Box mt={"0.5rem"}>
              <FreeServiceTable datas={clinic.clinicOption} />
            </Box>
            {/* <Text>{freeOption}</Text> */}
          </Box>
          <Box>
            <InlineTitleBadge bg={"originWhite"}>診察時間</InlineTitleBadge>
            <Box mt={"0.5rem"} maxW={"80%"} mx={"auto"}>
              <OpeningHoursTable datas={clinic.clinicOpeningHours} />
            </Box>
          </Box>
          <Box>
            <InlineTitleBadge fontSize={"1px"}>支払い関連</InlineTitleBadge>
            <Box mt={"0.5rem"} maxW={"60%"} mx={"auto"}>
              <PaymentRerationsTable datas={payment} />
            </Box>
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
      <Box className={detailViewClass}>
        <Flex
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
