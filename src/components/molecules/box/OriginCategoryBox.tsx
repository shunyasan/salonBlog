import { Box, Image, Text } from "@chakra-ui/react";
import { memo, useCallback, useState, VFC } from "react";
import { AboutCategory, OriginCategory } from "../../../type/api/ApiType";

type Props = {
  name: string;
  onClick: () => void;
  arrow: boolean;
};
export const OriginCategoryBox: VFC<Props> = memo((props) => {
  const { name, onClick, arrow } = props;

  return (
    <Box>
      <Box
        cursor={"pointer"}
        border={"1px"}
        p={"0.5rem 1rem"}
        // bg={arrow ? "originBlack": ""}
        // color={arrow ? "originWhite": ""}
        onClick={() => onClick()}
      >
        {name}
      </Box>
      {arrow && <Box>▼</Box>}
    </Box>
  );
});
