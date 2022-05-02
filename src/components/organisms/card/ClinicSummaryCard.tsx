import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { ClinicDetailHooks } from "../../../hooks/app/clinic/ClinicDetailHooks";
import { SearchSalonHooks } from "../../../hooks/app/salon/SearchSalonHooks";
import { Clinic } from "../../../type/api/Clinic";
import { TitleValue } from "../../../type/app/TitleValue";
import { OpeningHoursTable } from "../../atoms/table/OpeningHoursTable";
import { NoticeClinicDetail } from "../../molecules/box/NoticeClinicDetail";
import { PairDataBoxList } from "../boxList/PairDataBoxList";
import { PairDataRowBoxList } from "../boxList/PairDataRowBoxList";

type Props = {
  clinicData: Clinic;
};

export const ClinicSummaryCard: VFC<Props> = memo((props) => {
  const { clinicData } = props;
  const { getRandomImg } = SearchSalonHooks();
  const { ClinicOtherTitleValue, ClinicOptionTitleValue } = ClinicDetailHooks();

  const [otherData, setOtherData] = useState<TitleValue[]>();
  const [optionData, setOptionData] = useState<TitleValue[]>();

  const [image, setImage] = useState<string[]>([]);
  const [topImg, setTopImg] = useState<string>();

  useEffect(() => {
    const gets = [...Array(2)].map(() => getRandomImg());
    setImage(gets);
    setTopImg(gets[0]);
  }, [getRandomImg]);
  //

  const payDatas: TitleValue[] = [
    { title: "カード払い", value: clinicData.cardPay },
    {
      title: "医療ローン",
      value: clinicData.medhicalLoan,
    },
    // {
    //   title: "URL",
    //   value: clinicData.url,
    // },
    {
      title: "途中解約",
      value: clinicData.clinicOption.contractCancellation,
    },
  ];

  useEffect(() => {
    const option = ClinicOptionTitleValue(clinicData.clinicOption);
    setOptionData(option);

    const other = ClinicOtherTitleValue(clinicData);
    setOtherData(other);
  }, [ClinicOptionTitleValue, clinicData, ClinicOtherTitleValue]);

  return (
    <Box>
      <Box w={"100%"}>
        <Image src={topImg} w={"28rem"} mx={"auto"} />
      </Box>
      <Flex overflow={"scroll"} justifyContent={"center"} my={"1em"}>
        <Image
          w={"4rem"}
          src={image[0]}
          mx={"1em"}
          onClick={() => setTopImg(image[0])}
        />
        <Image
          w={"4rem"}
          src={image[1]}
          mx={"1em"}
          onClick={() => setTopImg(image[1])}
        />
      </Flex>
      <Stack
        w={{ md: "85%", sm: "100%" }}
        mx={"auto"}
        mt={"2em"}
        spacing={{ md: "2em", sm: "1em" }}
        justifyContent={"center"}
      >
        <NoticeClinicDetail
          clinic={clinicData}
          width={"46%"}
          py={"1em"}
          fontSize={{ md: "1.1rem", sm: "1rem" }}
        />
        <Box>
          <Flex
            w="70%"
            mx={"auto"}
            mt={"3px"}
            overflow={"scroll"}
            display={{ md: "block", sm: "none" }}
          >
            <OpeningHoursTable
              datas={clinicData.clinicOpeningHours}
              size={"sm"}
            />
          </Flex>
          <Flex
            w="70%"
            mx={"auto"}
            mt={"3px"}
            overflow={"scroll"}
            display={{ md: "none", sm: "block" }}
          >
            <OpeningHoursTable
              datas={clinicData.clinicOpeningHours}
              size={"xs"}
            />
          </Flex>
        </Box>

        <Box fontWeight={"bold"} textAlign={"left"} borderBottom={"1px"}>
          オプションサービス
        </Box>
        <Box>
          {optionData && (
            <Flex
              w={{ md: "90%", sm: "100%" }}
              justifyContent={"center"}
              mx={"auto"}
            >
              <PairDataRowBoxList
                datas={optionData}
                width={"50%"}
                my={{ md: "1em", sm: "0.8em" }}
              />
            </Flex>
          )}
        </Box>
        <Box fontWeight={"bold"} textAlign={"left"} borderBottom={"1px"}>
          契約・支払い
        </Box>
        <Box>
          <Flex
            w={{ md: "90%", sm: "100%" }}
            justifyContent={"center"}
            mx={"auto"}
          >
            <PairDataRowBoxList
              datas={payDatas}
              width={{ md: "33.3%", sm: "11.5rem" }}
              my={{ md: "1em", sm: "0.8em" }}
              justifyContent={"space-between"}
            />
          </Flex>
        </Box>
        <Box>
          {otherData && (
            <PairDataBoxList
              datas={otherData}
              bg={"#eee"}
              fontSize={".85rem"}
            />
          )}
        </Box>
        <Box>
          <Link
            href={clinicData.url}
            _hover={{ textDecoration: "none" }}
            _focus={{ outline: "none" }}
            isExternal
          >
            <Button my={"1rem"} mx={"1.5rem"} size={"lg"} variant="base">
              公式サイト
            </Button>
          </Link>
        </Box>
        {/* <Text>クリニックについてずらっと</Text> */}
      </Stack>
    </Box>
  );
});
