import { Box, Flex, Text } from "@chakra-ui/react";
import { memo, useCallback, useState, VFC } from "react";
import { OptionText } from "../../../type/app/OptionText";
import { InlineTitleBadge } from "../../atoms/badge/InlineTitleBadge";

type Props = {
  topTitle: string;
  datas: OptionText[];
  badgeBg?: string;
};

export const OptionServiceCard: VFC<Props> = memo((props) => {
  const { topTitle, datas, badgeBg } = props;

  return (
    <Box>
      <Text
        mb={"0.5rem"}
        fontSize={"1.1rem"}
        fontWeight={"bold"}
        textAlign={"center"}
      >
        {topTitle}
      </Text>
      <Flex
        w={"80%"}
        m={"auto"}
        justifyContent={"space-around"}
        wrap="wrap"
        // shadow={"0 10px 7px -10px #222"}
        position="relative"
      >
        {datas.map((data, i) => (
          <Box key={i} w="33.33%" textAlign={"center"} mb={"1rem"}>
            <InlineTitleBadge bg={badgeBg}>{data.name}</InlineTitleBadge>
            <Text pt={"2px"} fontSize={"0.9rem"}>
              {data.text || "不明"}
            </Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
});
