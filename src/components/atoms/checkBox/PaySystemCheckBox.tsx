import { Box, Flex, Text } from "@chakra-ui/react";
import { memo, VFC } from "react";
import { SortPlanData } from "../../../type/app/ViewTypeFromApi";

type Props = {
  sortData: SortPlanData;
};

export const PaySystemCheckBox: VFC<Props> = memo((props) => {
  const { sortData } = props;
  return (
    <Flex>
      <Box>
        <Text
          my={"3px"}
          fontSize={"0.8rem"}
          fontWeight={sortData?.paySystem === "総額" ? "bold" : ""}
        >
          1回分の費用から考える(総額)
        </Text>
        <Text
          my={"3px"}
          fontSize={"0.8rem"}
          fontWeight={sortData?.paySystem === "１回分" ? "bold" : ""}
        >
          1回ごとのコストから考える
        </Text>
      </Box>
    </Flex>
  );
});
