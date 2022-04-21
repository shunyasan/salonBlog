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
import { PlanConditionBox } from "../../atoms/box/PlanConditionBox";
import { PayRerationsBoxList } from "../boxList/PayRerationsBoxList";
import { TopResource } from "../../../resorces/TopResource";
import { SearchSalonHooks } from "../../../hooks/app/salon/SearchSalonHooks";

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
  const { getRandomImg } = SearchSalonHooks();

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
        // minH={"15rem"}
        wrap={"wrap"}
        justifyContent={{ md: "space-evenly", sm: "center" }}
        alignItems={"flex-start"}
        spacing={"0"}
      >
        <Box h={"100%"} w={"22rem"} textAlign={"left"} overflow={"scroll"}>
          <Box pb={"2px"} pl={"8px"}>
            {clinic.name}
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
          {/* <Box my={"1em"}> */}
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
          <Flex wrap={"wrap"} w={"100%"} justifyContent="space-between">
            {/* <Box w="50%" px={"5px"}>
                  <PlanConditionBox title={"回数"} text={times + "回"} />
                </Box> */}
            <Box w="50%" px={"5px"}>
              <PlanConditionBox
                title={"施術者"}
                text={clinic.staffGender}
                gender={true}
              />
            </Box>
            <Box w="50%" px={"5px"}>
              <PlanConditionBox
                title={"予約"}
                text={clinic.reserve}
                first={"優良"}
                second={"良好"}
                other={"不明"}
              />
            </Box>
            <Box w="50%" px={"5px"}>
              <PlanConditionBox
                title={"内装"}
                text={clinic.interior}
                first={"豪華"}
                second={"綺麗"}
                other={"不明"}
              />
            </Box>
            <Box w="50%" px={"5px"}>
              <PlanConditionBox
                title={"施術室"}
                text={clinic.roomType}
                first={"完全個室"}
                second={"個室"}
                other={"不明"}
              />
            </Box>

            <Box
              ml={"5px"}
              w={"47.3%"}
              borderTop={"1px"}
              borderColor={"originGray"}
            ></Box>
            <Box
              mr={"5px"}
              w={"47.3%"}
              borderTop={"1px"}
              borderColor={"originGray"}
            ></Box>
            {/* <Box w={"90%"} borderTop={"1px"} borderColor={"originGray"}></Box> */}
          </Flex>
          {/* </Box> */}
          <Box w="100%" fontSize={"0.8em"} textAlign={"left"} py={"1em"}>
            <Text>念の為、公式ホームページのご確認をお願い致します。</Text>
            <Text>掲載情報に相違がある場合がございます。</Text>
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
