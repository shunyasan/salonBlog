import { memo, ReactNode, useEffect, useState, VFC } from "react";
import { Box, Flex, Text, Link, useDisclosure, HStack } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";
import { DropHeader } from "../molecules/DropHeader";

export const Footer: VFC = memo((props) => {
  const history = useHistory();
  const onClickHome = () => history.push("/");
  const onClickSerch = () => history.push("/salon");
  return (
    <Box bg={"originBlack"} mt={"2rem"} py="2rem">
      <Box as="footer">
        <HStack
          as="nav"
          bg="originBlack"
          color="originWhite"
          h={"4rem"}
          fontSize="0.8rem"
          alignItems={"center"}
          justifyContent={"space-around"}
        >
          <Box
            textAlign="center"
            px={"1.3rem"}
            py={"0.1rem"}
            cursor="pointer"
            onClick={onClickHome}
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
            onClick={onClickSerch}
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
            _hover={{
              transition: "0.5s",
              backgroundColor: "rgba(220,220,220,0.2)",
            }}
          >
            地域から探す
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
          >
            クリニックから探す
          </Box>
        </HStack>
        <Box
          color={"#fff"}
          display={"inline-block"}
          textAlign="center"
          my={4}
          w="100%"
        >
          <Text fontSize="2rem">あなたの脱毛</Text>
          <Text fontSize="0.7rem">東京都</Text>
        </Box>
      </Box>
    </Box>
  );
});
