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
import { PayRerationsBoxList } from "../boxList/PayRerationsBoxList";
import { TopResource } from "../../../resorces/TopResource";
import { SearchSalonHooks } from "../../../hooks/app/salon/SearchSalonHooks";
import { useHistory } from "react-router-dom";
import { NoticeClinicDetail } from "../../molecules/box/NoticeClinicDetail";

type Props = {
  clinic: ClinicNestPriceDto;
};

const take = 10;
const skip = 2;

export const ClinicCard: VFC<Props> = memo((props) => {
  const { clinic } = props;
  const history = useHistory();
  const { checkFreeOption, newOptionFunc } = SalonListHook();
  const { getPriceByClinicId } = PriceApi();
  const { getRandomImg } = SearchSalonHooks();

  const [payment, setPayment] = useState<OptionText[]>([]);
  const [additionalPrice, setAdditionalPrice] = useState<PriceDto[]>([]);
  const [detailViewState, setDetailViewState] = useState<boolean>(false);
  const [detailViewClass, setDetailViewClass] =
    useState<string>("defaultDisplayNone");
  // 画像準備期間のみ
  const [image, setImage] = useState<string[]>([]);

  useEffect(() => {
    const gets = [...Array(2)].map(() => getRandomImg());
    setImage(gets);
  }, [getRandomImg]);
  //

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
      color={"#333"}
    >
      <HStack
        // minH={"15rem"}
        wrap={"wrap"}
        justifyContent={{ md: "space-evenly", sm: "center" }}
        alignItems={"flex-start"}
        spacing={"0"}
      >
        <Box h={"100%"} w={"22rem"} textAlign={"left"}>
          <Box pb={"2px"} pl={"8px"} fontSize={"1.1em"} fontWeight={"bold"}>
            {clinic.name}
          </Box>
          <Flex wrap={{ md: "wrap", sm: "nowrap" }} overflow={"scroll"}>
            <Image maxH={"80%"} src={image[0]} />
            <Image maxH={"80%"} mt={{ md: "5px", sm: "0" }} src={image[1]} />
          </Flex>
        </Box>
        <Stack
          spacing={"0"}
          // w="13.3rem"
          // w={{
          //   md: "30rem",
          //   sm: "inherit",
          //   // sm: "100%"
          // }}
          maxW={{
            md: "30rem",
            sm: "100%",
          }}
          mt={"1rem"}
          px={"1em"}
          py={"1em"}
          justifyContent={"center"}
        >
          <NoticeClinicDetail clinic={clinic} width={"46%"} py={"8px"} />
          <Box
            w="100%"
            fontSize={"0.8em"}
            textAlign={"left"}
            py={"1em"}
            pl={"1em"}
          >
            <Text>念の為、公式ホームページのご確認をお願い致します。</Text>
            <Text>掲載情報に相違がある場合がございます。</Text>
          </Box>
          <Box maxW={"100%"} mt={"1em"}>
            <Box>
              <Text
                textAlign={"left"}
                fontSize={"0.9em"}
                color={"originBlack"}
                fontWeight={"bold"}
              >
                オプションサービス
              </Text>
            </Box>
            <Flex wrap={"nowrap"} overflow={"scroll"}>
              <FreeServiceBoxList clinicOption={clinic.clinicOption} />
            </Flex>
          </Box>

          {payment && (
            <Box>
              <Box>
                <Text
                  textAlign={"left"}
                  fontSize={"0.9em"}
                  color={"originBlack"}
                  fontWeight={"bold"}
                >
                  契約/支払い
                </Text>
              </Box>
              <Flex wrap={"nowrap"} overflow={"scroll"}>
                <PayRerationsBoxList payments={payment} />
              </Flex>
            </Box>
          )}
          <Box w={"100%"} justifyContent={"left"} alignItems={"center"}>
            <Box w="100%" textAlign={"left"}>
              <Text
                fontSize={"0.9em"}
                color={"originBlack"}
                fontWeight={"bold"}
              >
                診察時間
              </Text>
            </Box>
            <Box mt={"3px"} overflow={"scroll"} w={{ md: "25em", sm: "95%" }}>
              <OpeningHoursTable datas={clinic.clinicOpeningHours} />
            </Box>
          </Box>
          <Flex alignItems={"center"} w={"100%"} mt={"1em !important"}>
            <Text
              fontSize={"0.9em"}
              color={"originBlack"}
              fontWeight={"bold"}
              mr={"1rem"}
              alignItems={"center"}
            >
              アクセス
            </Text>
            <Text fontSize={"0.8rem"} textAlign={"left"}>
              {clinic.nearestStation}
            </Text>
          </Flex>
          <Flex justifyContent={"center"}>
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
            </Box>
            <Box>
              <Button
                my={"1rem"}
                mx={"1.5rem"}
                size={"lg"}
                variant="secBase"
                onClick={() => history.push(`/clinic/${clinic.id}`)}
              >
                詳細
              </Button>
            </Box>
          </Flex>
        </Stack>
      </HStack>
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
