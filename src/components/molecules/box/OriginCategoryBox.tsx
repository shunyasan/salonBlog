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
    <Box>
      <Box
        cursor={"pointer"}
        border={"2px"}
        p={"0.5rem 1rem"}
        fontSize={fontSize}
        // bg={arrow ? "originBlack": ""}
        // color={arrow ? "originWhite": ""}
        onClick={() => onClick()}
      >
        {name}
      </Box>
      {arrow && <Box mt={"5px"}>▼</Box>}
    </Box>
  );
});
