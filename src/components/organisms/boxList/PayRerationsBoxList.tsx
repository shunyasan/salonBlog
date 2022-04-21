import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { memo, useCallback, VFC } from "react";
import { OptionText } from "../../../type/app/OptionText";
import { FreeServiceBox } from "../../molecules/box/FreeServiceBox";
type Props = {
  payments: OptionText[];
};

export const PayRerationsBoxList: VFC<Props> = memo((props) => {
  const { payments } = props;
  return (
    <HStack spacing={"0"} wrap={"wrap"} justifyContent={"center"}>
      {payments.map((data, i) => (
        <FreeServiceBox
          title={data.name}
          value={data.text}
          fontSize={{ true: "0.9em", false: "0.75em" }}
          height={"6em"}
          width={"7.5em"}
          changeVal={"OK"}
          key={i}
        />
      ))}
    </HStack>
  );
});
