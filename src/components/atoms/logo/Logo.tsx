import { Box, Text } from "@chakra-ui/react";
import { memo, VFC } from "react";

type Props = {
  fontSize: string;
  color: string;
  // fontSize: {md: string, sm: string}
};

export const Logo: VFC<Props> = memo((props) => {
  const { fontSize, color } = props;
  return (
    <Box
      color={color}
      display={"inline-block"}
      my={4}
      fontWeight={"bold"}
      fontSize={fontSize}
      textAlign={"center"}
    >
      <Text>あなたの脱毛</Text>
      <Text fontSize="0.35em">東京都</Text>
    </Box>
  );
});
