import { Box, Image, Text } from "@chakra-ui/react";
import { memo, useCallback, useState, VFC } from "react";

type Props = {
  name: string;
  onClick: () => void;
  arrow: boolean;
  fontSize: string;
};
export const OriginCategoryBox: VFC<Props> = memo((props) => {
  const { name, onClick, arrow, fontSize } = props;

  return (
    // <Box>
    <Box
      cursor={"pointer"}
      m={"0.5em !important"}
      w="5rem"
      textAlign={"center"}
      border={"2px"}
      py={"0.5rem"}
      fontSize={fontSize}
      bg={arrow ? "originBlack" : ""}
      color={arrow ? "originWhite" : ""}
      onClick={onClick}
      transition={"0.2s"}
      transitionTimingFunction={"linear"}
    >
      {name}
    </Box>
    // {arrow && <Box mt={"5px"}>▼</Box>}
    // </Box>
  );
});
