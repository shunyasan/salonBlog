import { memo, ReactNode, useEffect, useState, VFC } from "react";
import { Box, Flex, Text, Link, useDisclosure, HStack } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";
import { DropHeader } from "../molecules/DropHeader";

type Props = {
  children: ReactNode;
  topPage?: boolean;
};

export const Header: VFC<Props> = memo((props) => {
  const { children, topPage } = props;
  const [clinicMeterTrigger, setClinicMeterTrigger] = useState<boolean>(false);
  const [planMeterTrigger, setPlanMeterTrigger] = useState<boolean>(false);
  const [clinicNum, setClinicNum] = useState<string>("100");
  const [planNum, setPlanNum] = useState<string>("10000");

  const history = useHistory();
  const onClickTransition = (path: string) => history.push(path);

  useEffect(() => {
    if (topPage) {
      setClinicMeterTrigger(true);
      setTimeout(() => {
        setClinicMeterTrigger(false);
      }, 2000);
    }
  }, [topPage]);

  useEffect(() => {
    if (topPage) {
      setPlanMeterTrigger(true);
      setTimeout(() => {
        setPlanMeterTrigger(false);
      }, 3000);
    }
  }, [topPage]);

  useEffect(() => {
    if (topPage) {
      const random = [...Array(5)].map(() =>
        Math.floor(Math.random() * 10).toString()
      );
      const clinicRandom = random.slice(0, 3);
      const planRandom = random.slice(0, 5);

      if (clinicMeterTrigger) {
        setClinicNum(clinicRandom.join(""));
      } else {
        setClinicNum("100");
      }
      if (planMeterTrigger) {
        setPlanNum(planRandom.join(""));
      } else {
        setPlanNum("10000");
      }
    }
  }, [clinicNum, planNum, clinicMeterTrigger, planMeterTrigger, topPage]);

  return (
    <>
      <Box pos="relative" zIndex={1}>
        <Box as="header">
          <Flex justifyContent={"space-between"} alignItems={"center"} h="7rem">
            <Box textAlign="center" ml={"2rem"}>
              <Text fontSize="2.5rem" fontWeight={"bold"}>
                あなたの脱毛
              </Text>
              <Text fontSize="0.7rem">東京都</Text>
            </Box>
            <Box textAlign="center" bg={"#eee"} p={"1rem 2rem"} h="100%">
              <Text fontSize="0.7rem" mb={"0.5rem"} color={"originGold"}>
                東京都主要５区のクリニックからほぼ全てのプランを集計
              </Text>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Text>現在</Text>
                <Box>
                  <Text fontSize="0.6rem">クリニック数</Text>
                  <Text fontSize="1.6rem" mx={"3px"}>
                    {clinicNum}
                    <Text as="span" fontSize={"0.6rem"} ml={"5px"}>
                      件
                    </Text>
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="0.6rem">プラン数</Text>
                  <Text fontSize="1.6rem" mx={"3px"}>
                    {planNum}
                    <Text as="span" fontSize={"0.6rem"} ml={"5px"}>
                      件
                    </Text>
                  </Text>
                </Box>
              </Flex>
            </Box>
          </Flex>
          <HStack
            as="nav"
            bg="originBlack"
            color="originWhite"
            h={"4rem"}
            fontSize="0.8rem"
            alignItems={"center"}
            pl={"1rem"}
          >
            <Box
              textAlign="center"
              px={"1.3rem"}
              py={"0.1rem"}
              cursor="pointer"
              onClick={() => onClickTransition("/")}
              _hover={{
                transition: "0.5s",
                backgroundColor: "rgba(220,220,220,0.2)",
              }}
            >
              TOP
            </Box>
            <Box
              textAlign="center"
              px={"1.3rem"}
              py={"0.1rem"}
              mx={2}
              cursor="pointer"
              onClick={() => onClickTransition("/salon")}
              _hover={{
                transition: "0.5s",
                backgroundColor: "rgba(220,220,220,0.2)",
              }}
            >
              プランを探す
            </Box>
            <Box
              textAlign="center"
              px={"1.3rem"}
              py={"0.1rem"}
              mx={2}
              cursor="pointer"
              onClick={() => onClickTransition("/treatment-parts")}
              _hover={{
                transition: "0.5s",
                backgroundColor: "rgba(220,220,220,0.2)",
              }}
            >
              部位一覧
            </Box>
            <Box
              textAlign="center"
              px={"1.3rem"}
              py={"0.1rem"}
              mx={2}
              cursor="pointer"
              _hover={{
                transition: "0.5s",
                backgroundColor: "rgba(220,220,220,0.2)",
              }}
              onClick={() => onClickTransition("/clinic")}
            >
              クリニック一覧
            </Box>
          </HStack>
        </Box>
        {/* <DropHeader anime={dropHeader} /> */}
      </Box>
      {/* <MenuDrawer
				isOpen={isOpen}
				onClose={onClose}
				onClickHome={onClickHome}
				onClickFollows={onClickFollows}
				onClickFollowers={onClickFollowers}
				onClickSerch={onClickSerch}
			/> */}
      {children}
    </>
  );
});
