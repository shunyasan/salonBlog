import { memo, ReactNode, useEffect, useState, VFC } from "react";
import { Box, Flex, Text, Link, useDisclosure, HStack } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";
import { Logo } from "../atoms/logo/Logo";

export const Footer: VFC = memo((props) => {
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

  const profiles = [
    // {
    //   path: "#",
    //   text: "掲載クリニック様へ",
    // },
    // {
    //   path: "#",
    //   text: "プライバシーポリシー",
    // },
    {
      path: "/information/profile",
      text: "運営者情報・問い合わせ先",
    },
  ];

  const onClickPush = useCallback(
    (path: string) => history.push(path),
    [history]
  );
  return (
    <Box as="footer" bg={"originBlack"} mt={"2rem"} py="2rem">
      <Box textAlign={"center"} w={"80%"} mx={"auto"}>
        <HStack
          as="nav"
          bg="originBlack"
          color="originWhite"
          h={"4rem"}
          fontSize="0.8rem"
          alignItems={"center"}
          justifyContent={"space-between"}
          wrap={"wrap"}
        >
          {datas.map((data, i) => (
            <Box
              w={{ md: "inherit", sm: "40%" }}
              px={"1.3rem"}
              py={"0.1rem"}
              cursor="pointer"
              onClick={() => onClickPush(data.path)}
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
        <Link
          href="/"
          textDecoration={"none !important"}
          w={{ md: "inherit", sm: "100%" }}
          my={{ md: "inherit", sm: "1rem" }}
          mx={"auto"}
          _focus={{ outline: "none" }}
        >
          <Logo fontSize={"2rem"} color={"originWhite"} />
        </Link>
        <HStack
          as="nav"
          bg="originBlack"
          color="originWhite"
          h={"4rem"}
          fontSize="0.8rem"
          alignItems={"center"}
          justifyContent={"center"}
          wrap={"wrap"}
          spacing={"0"}
        >
          {profiles.map((data, i) => (
            <Box
              // w={{ md: "15%", sm: "60%" }}
              cursor="pointer"
              _hover={{
                transition: "0.5s",
                backgroundColor: "rgba(220,220,220,0.2)",
              }}
              onClick={() => onClickPush(data.path)}
            >
              {data.text}
            </Box>
          ))}
        </HStack>
      </Box>
    </Box>
  );
});
