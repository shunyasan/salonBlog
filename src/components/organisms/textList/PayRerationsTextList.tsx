import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { memo, useCallback, VFC } from "react";
import { ClinicOption } from "../../../type/api/ClinicOption";
import { OptionText } from "../../../type/app/OptionText";
import { FreeServiceBox } from "../../molecules/box/FreeServiceBox";
type Props = {
  payments: OptionText[];
};

export const PayRerationsTextList: VFC<Props> = memo((props) => {
  const { payments } = props;
  return (
    <Stack spacing={"0"} wrap={"wrap"} w={"100%"}>
      {payments.map((data) => (
        <HStack justifyContent={"space-between"} fontSize={"0.8em"}>
          <Box>{data.name}:</Box>
          <Box>{data.text || "-"}</Box>
        </HStack>
      ))}
    </Stack>
  );
});
