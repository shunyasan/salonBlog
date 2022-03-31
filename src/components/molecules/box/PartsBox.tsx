import { Box, Text } from "@chakra-ui/react";
import { memo, VFC } from "react";
import { ApiBaseParts } from "../../../type/api/ApiType";

type Props = {
  parts: ApiBaseParts;
  width: string;
  // 1:女性 2:男性
};
export const PartsBox: VFC<Props> = memo((props) => {
  const { parts, width } = props;
  return (
    <Box
      m={"1rem"}
      w={width}
      cursor={"pointer"}
      // onClick={() => getId(category.id)}
    >
      <Text pt={"0.7rem"}>{parts.name}</Text>
    </Box>
  );
});
