import { memo, ReactNode, useEffect, useState, VFC } from "react";
import { Box, Flex, Text, Link, useDisclosure, HStack } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";
import { DropHeader } from "../molecules/DropHeader";

type Props = {
  children: ReactNode;
  max: number;
  take: number;
  nowPage: number;
  onClick: (page: number) => void;
};

export const Pagenation: VFC<Props> = memo((props) => {
  const { children, max, take, nowPage, onClick } = props;

  const [numOfPage, setNumOfPage] = useState<number>(0);

  useEffect(() => {
    const maxPage = Math.ceil(max / take);
    setNumOfPage(maxPage);
  }, [max, take]);

  return (
    <Box>
      <Box>
        <HStack justifyContent={"center"}>
          {[...Array(numOfPage)].map((_, i) => (
            <Box
              cursor={"pointer"}
              bg={nowPage === i ? "originGray" : ""}
              key={i}
              onClick={() => onClick(i)}
            >
              {i + 1}
            </Box>
          ))}
        </HStack>
        <Text mt="1rem">10件/全21件</Text>
        {children}
        <HStack justifyContent={"center"}>
          {[...Array(numOfPage)].map((_, i) => (
            <Box cursor={"pointer"} key={i}>
              {i + 1}
            </Box>
          ))}
        </HStack>
      </Box>
    </Box>
  );
});
