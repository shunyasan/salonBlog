import { Box, Center, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { AbobutCategiryId } from "../../../enums/AbobutCategiryIdEnum";
import { OriginCategiryId } from "../../../enums/OriginCategiryIdEnum";
import { AboutCategoryApi } from "../../../hooks/api/AboutCategoryApi";
import { IdAndNameApi } from "../../../hooks/api/IdAndNameApi";
import { PriceApi } from "../../../hooks/api/PriceApi";
import { TreatmentPartsHook } from "../../../hooks/app/treatment-parts/TreatmentPartsHook";
import { AboutCategory } from "../../../type/api/AboutCategory";
import { Clinic } from "../../../type/api/Clinic";
import { ClinicNestPriceDto } from "../../../type/api/dto/ClinicNestPriceDto";
import { IdAndNameDto } from "../../../type/api/dto/IdAndNameDto";
import { PriceDto } from "../../../type/api/dto/PriceDto";
import { SmallPlanCard } from "../../molecules/card/SmallPlanCard";
import { AboutTreatmentParts } from "../boxList/AboutTreatmentParts";
import { PlanDetailModal } from "../modal/PlanDetailModal";

type Props = {
  clinicData: Clinic;
};

export const ClinicPlanCard: VFC<Props> = memo((props) => {
  const { clinicData } = props;
  const { getAboutCategoryByOriginId } = AboutCategoryApi();
  const { getAllOriginCategoryIdAndName } = IdAndNameApi();
  const { getPriceByAboutIdAndClinicId } = PriceApi();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectTab, setSelectTab] = useState<string>(OriginCategiryId.face);
  const [originData, setOriginData] = useState<IdAndNameDto[]>([]);
  const [priceData, setPriceData] = useState<PriceDto[]>([]);
  const [modalPrice, setModalPrice] = useState<PriceDto>();
  const [selectedAboutId, setSelectedAboutId] = useState<string>(
    AbobutCategiryId.upperFace
  );
  const [aboutCategoryData, setAboutCategoryData] = useState<AboutCategory[]>(
    []
  );

  const getOriginCategory = useCallback(async () => {
    const data = await getAllOriginCategoryIdAndName();
    setOriginData(data);
    return data;
  }, [getAllOriginCategoryIdAndName]);

  const getAboutCategory = useCallback(
    async (originId: string) => {
      const data = await getAboutCategoryByOriginId(originId);
      setAboutCategoryData(data);
      return data;
    },
    [getAboutCategoryByOriginId]
  );

  const getPrices = useCallback(
    async (aboutId: string) => {
      const data = await getPriceByAboutIdAndClinicId(clinicData.id, aboutId);
      setPriceData(data);
      return data;
    },
    [getPriceByAboutIdAndClinicId, clinicData]
  );

  const getFirstPartsDatas = useCallback(async () => {
    const origin = await getOriginCategory();
    const about = await getAboutCategory(origin[0].id);
    await getPrices(about[0].id);
  }, [getOriginCategory, getAboutCategory, getPrices]);

  const changeAboutCategory = useCallback(
    async (aboutId: string) => {
      await getPrices(aboutId);
      setSelectedAboutId(aboutId);
    },
    [getPrices]
  );

  const changeTab = useCallback(
    async (originId: string) => {
      const data = await getAboutCategory(originId);
      setSelectTab(originId);
      changeAboutCategory(data[0].id);
    },
    [getAboutCategory, changeAboutCategory]
  );

  const openPlanDetailModal = useCallback(
    async (price: PriceDto) => {
      setModalPrice(price);
      onOpen();
    },
    [onOpen]
  );

  useEffect(() => {
    getFirstPartsDatas();
  }, [getFirstPartsDatas]);

  return (
    <Box>
      <Flex justifyContent={"space-evenly"} wrap={"wrap"}>
        {originData.map((data, i) => (
          <Box
            key={i}
            width={{ md: "16.6%", sm: "33.3%" }}
            py={"1em"}
            color={selectTab === data.id ? "originGold" : ""}
            fontWeight={selectTab === data.id ? "bold" : ""}
            borderBottom={selectTab === data.id ? "2px" : ""}
            borderColor={selectTab === data.id ? "originGold" : ""}
            transition={"0.5s"}
            cursor={"pointer"}
            _hover={{
              bg: selectTab === data.id ? "" : "#aaa",
              transition: "0.5s",
            }}
            textAlign={"center"}
            onClick={() => changeTab(data.id)}
          >
            <Box display={"inline-block"}>{data.name}</Box>
          </Box>
        ))}
      </Flex>
      <AboutTreatmentParts
        about={aboutCategoryData}
        gender={"男性"}
        selectedId={selectedAboutId}
        onClick={(id: string) => changeAboutCategory(id)}
      />
      {priceData.length !== 0 ? (
        <>
          <Flex wrap={"wrap"} justifyContent={"space-evenly"}>
            {priceData.map((data, i) => (
              <>
                <Box
                  w={{ md: "40%", sm: "30em" }}
                  m={{ md: "0.5rem", sm: "0.3rem 0" }}
                  key={i}
                >
                  <SmallPlanCard
                    price={data}
                    onClick={() => openPlanDetailModal(data)}
                  />
                </Box>
              </>
            ))}
          </Flex>
          {modalPrice && (
            <PlanDetailModal
              isOpen={isOpen}
              onClose={onClose}
              price={modalPrice}
              clinic={clinicData}
            />
          )}
        </>
      ) : (
        <Center mt={"2em"}>こちらのプランはありません</Center>
      )}
    </Box>
  );
});
