import { Box, Text } from "@chakra-ui/react";
import { memo, VFC } from "react";
import { Clinic } from "../../../type/api/Clinic";
import { ClinicNestPriceDto } from "../../../type/api/dto/ClinicNestPriceDto";

type Props = {
  clinicData: Clinic;
};

export const ClinicOptionCard: VFC<Props> = memo((props) => {
  const { clinicData } = props;

  return (
    <Box>
      <Text>オプションについてずらっと</Text>
      <Text></Text>
    </Box>
  );
});
