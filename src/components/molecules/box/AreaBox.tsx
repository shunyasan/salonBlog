import { Box, Image, Text } from "@chakra-ui/react";
import { memo, VFC } from "react";

type Props = {
  area: string;
  description: string;
  arrow: boolean;
  onClick: () => void;
  fontSize: string;
  // getId: (id: string) => void;
  // 1:女性 2:男性
};
export const AreaBox: VFC<Props> = memo((props) => {
  const { area, arrow, description, onClick, fontSize } = props;
  return (
    <Box>
      <Box
        fontSize={fontSize || undefined}
        cursor={"pointer"}
        border={"1px"}
        p={"0.5rem 1rem"}
        onClick={onClick}
        // bg={arrow ? "originBlack" : ""}
        // color={arrow ? "originWhite" : ""}
      >
        <Text>{area}</Text>
        <Box borderBottom={"1px"} borderColor={"black"} my={"0.5rem"}></Box>
        <Text fontSize={"0.6em"}>{description}</Text>
      </Box>
      {arrow && <Box fontSize={"1.3rem"}>▼</Box>}
    </Box>
  );
});
