import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { memo, useCallback, VFC } from "react";
import { Clinic } from "../../../type/api/Clinic";
import { OptionText } from "../../../type/app/OptionText";
import { TitleValue } from "../../../type/app/TitleValue";
import { FreeServiceBox } from "../../molecules/box/FreeServiceBox";
type Props = {
  datas: TitleValue[];
  fontSize?: string;
  bg?: string;
  justifyContent?: string;
};

export const PairDataBoxList: VFC<Props> = memo((props) => {
  const { datas, bg, fontSize, justifyContent } = props;

  return (
    <Stack bg={bg || ""} fontSize={fontSize}>
      {datas.map((data, i) => (
        <Flex
          key={i}
          my={"1em !important"}
          wrap={"wrap"}
          justifyContent={justifyContent || "space-between"}
        >
          <Text fontWeight={"bold"} w="20%">
            {data.title}
          </Text>
          <Text w="78%" textAlign={"left"}>
            {data.value}
          </Text>
        </Flex>
      ))}
    </Stack>
  );
});
