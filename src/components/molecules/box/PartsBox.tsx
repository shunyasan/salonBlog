import { Box, Button, Text } from "@chakra-ui/react";
import { memo, VFC } from "react";
import { BaseParts } from "../../../type/api/BaseParts";

type Props = {
  parts: BaseParts;
  width: string;
  search?: () => void;
  // 1:女性 2:男性
};
export const PartsBox: VFC<Props> = memo((props) => {
  const { parts, width, search } = props;
  return (
    <Box
      w={width}
      px={"8px"}
      // onClick={() => getId(category.id)}
    >
      <Text pt={"0.7rem"}>{parts.name}</Text>
      <Button
        variant={"whiteNotSpace"}
        p={"3px"}
        fontSize={"0.5em"}
        onClick={search}
      >
        このプランを探す
      </Button>
    </Box>
  );
});
