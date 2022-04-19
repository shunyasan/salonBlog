import { VFC } from "react";
import { IconButton, Box, Flex, Stack, Text } from "@chakra-ui/react";
import { StatusText } from "../text/StatusText";
import { StaffGenderText } from "../text/StaffGenderText";

type Props = {
  title: string;
  text: string | number;
  first?: string;
  second?: string;
  fontSize?: string;
  other?: string;
  gender?: boolean;
  // width: string;
  // paddingY?: string;
  // onClick?: () => void;
};

export const PlanConditionBox: VFC<Props> = (props) => {
  const { title, text, first, second, fontSize, other, gender } = props;
  return (
    <Flex
      justifyContent={"space-around"}
      alignItems={"center"}
      borderTop={"1px"}
      borderColor={"originGray"}
      textAlign={"left"}
      py={"3px"}
    >
      <Text
        color={"originLiteBlack"}
        fontWeight={"bold"}
        // w={"3.5rem"}
        fontSize={"0.8em"}
      >
        {title}
      </Text>
      {gender && typeof text === "number" ? (
        <StaffGenderText staffGender={text} />
      ) : (
        <Box>
          <StatusText
            text={text}
            first={first || ""}
            second={second || ""}
            fontSize={"0.8em"}
            other={other || ""}
          />
        </Box>
      )}
    </Flex>
  );
};
