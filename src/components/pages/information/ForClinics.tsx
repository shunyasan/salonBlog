import { Box, Center, Flex, HStack, Link, Text } from "@chakra-ui/react";
import { memo, VFC } from "react";

export const ForClinics: VFC = memo(() => {
  return (
    <Flex justifyContent={"center"} p={"2rem"} minH={"20rem"}>
      <Text>掲載クリニック様へ</Text>
      <Box textAlign={"center"}>
        <Text my={"1rem"}>テスト</Text>
      </Box>
    </Flex>
  );
});
