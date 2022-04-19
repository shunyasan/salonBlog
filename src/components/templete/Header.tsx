import { memo, ReactNode, useEffect, useState, VFC } from "react";
import {
  Box,
  Flex,
  Text,
  Link,
  useDisclosure,
  HStack,
  Button,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";
import { HeaderDrawer } from "../molecules/drawer/HeaderDrawer";
import { HamburgerIconBox } from "../atoms/box/HamburgerIconBox";
import { Logo } from "../atoms/logo/Logo";

type Props = {
  children: ReactNode;
  topPage?: boolean;
};

const clinicDefoultNum = "349";
const planDefoultNum = "32442";

export const Header: VFC<Props> = memo((props) => {
  const { children, topPage } = props;
  const [clinicMeterTrigger, setClinicMeterTrigger] = useState<boolean>(false);
  const [planMeterTrigger, setPlanMeterTrigger] = useState<boolean>(false);
  const [clinicNum, setClinicNum] = useState<string>(clinicDefoultNum);
  const [planNum, setPlanNum] = useState<string>(planDefoultNum);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const datas = [
    {
      path: "/",
      text: "TOP",
    },
    {
      path: "/salon",
      text: "プランを探す",
    },
    {
      path: "/treatment-parts",
      text: "部位一覧",
    },
    {
      path: "/clinic",
      text: "クリニック一覧",
    },
  ];

  const onClickTransition = useCallback(
    (path: string) => {
      onClose();
      history.push(path);
    },
    [history, onClose]
  );

  useEffect(() => {
    if (topPage) {
      setClinicMeterTrigger(true);
      setPlanMeterTrigger(true);
      setTimeout(() => {
        setClinicMeterTrigger(false);
      }, 2000);
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
        setClinicNum(clinicDefoultNum);
      }
      if (planMeterTrigger) {
        setPlanNum(planRandom.join(""));
      } else {
        setPlanNum(planDefoultNum);
      }
    }
  }, [clinicMeterTrigger, planMeterTrigger, topPage, clinicNum, planNum]);

  return (
    <>
      <Box pos="relative" zIndex={1}>
        <Box as="header">
          <HStack
            wrap={"wrap"}
            justifyContent={{ md: "space-between" }}
            alignItems={"center"}
            spacing={"0"}
          >
            <Link
              href="/"
              textDecoration={"none !important"}
              w={{ md: "inherit", sm: "100%" }}
              my={{ md: "inherit", sm: "1rem" }}
              mx={"2rem"}
              _focus={{ outline: "none" }}
            >
              <Flex justifyContent={"center"}>
                <Logo fontSize="2.4rem" color={"originBlack"} />
              </Flex>
            </Link>
            <Box
              textAlign="center"
              bg={"#eee"}
              p={"1rem 2rem"}
              h="100%"
              w={{ md: "inherit", sm: "100%" }}
              // marginInlineStart={"unset !important"}
            >
              <Text fontSize="0.7rem" mb={"0.5rem"} color={"originGold"}>
                東京都激戦５区のクリニックからほぼ全てのプランを分析
              </Text>
              <HStack
                justifyContent={"center"}
                alignItems={"center"}
                spacing={"2rem"}
              >
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
              </HStack>
            </Box>
          </HStack>
          <Box as="nav" w={"100%"}>
            <Box display={{ md: "block", sm: "none" }}>
              <HStack
                alignItems={"center"}
                py={"1.3rem"}
                fontSize="0.8rem"
                bg="originBlack"
                color="originWhite"
                pl={"1rem"}
              >
                {datas.map((data, i) => (
                  <Box
                    textAlign="center"
                    px={"1.3rem"}
                    py={"0.1rem"}
                    cursor="pointer"
                    onClick={() => onClickTransition(data.path)}
                    _hover={{
                      transition: "0.5s",
                      backgroundColor: "rgba(220,220,220,0.2)",
                    }}
                    key={i}
                  >
                    {data.text}
                  </Box>
                ))}
              </HStack>
            </Box>
            <Flex
              justifyContent={"center"}
              cursor={"pointer"}
              bg="originBlack"
              _hover={{ transition: "1s", opacity: 0.8 }}
              // _hover={{ transition: "1s", bg: "originLiteBlack" }}
              display={{ md: "none", sm: "block" }}
              onClick={onOpen}
            >
              <HamburgerIconBox />
            </Flex>
          </Box>
        </Box>
        {/* <DropHeader anime={dropHeader} /> */}
      </Box>
      <HeaderDrawer
        isOpen={isOpen}
        onClose={onClose}
        onClick={(path: string) => onClickTransition(path)}
      />
      {children}
    </>
  );
});
