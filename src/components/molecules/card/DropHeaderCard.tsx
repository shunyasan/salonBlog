import { Box, Center, HStack } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";

import { memo, VFC } from "react";
import testImg from "../../resorces/22223019_l.jpg";
import "../../App.css";
import { Text } from "@chakra-ui/react";

type Props = {
  anime: string;
};

export const DropHeaderCard: VFC<Props> = memo((props) => {
  const { anime } = props;

  return (
    <Box className={anime} w="100%" p={5} pos="absolute" zIndex={3}>
      <HStack spacing={8} color="originBlack">
        <Box>
          <Image src={testImg} />
          <Text textAlign="center">痛みが弱い</Text>
        </Box>
        <Box>
          <Image src={testImg} />
          <Text textAlign="center">分割が安い</Text>
        </Box>
        <Box>
          <Image src={testImg} />
          <Text textAlign="center">料金が安い</Text>
        </Box>
        <Box>
          <Image src={testImg} />
          <Text textAlign="center">個室で施術可</Text>
        </Box>
        <Box>
          <Image src={testImg} />
          <Text textAlign="center">施術室が豪華</Text>
        </Box>
      </HStack>
    </Box>
  );
});
