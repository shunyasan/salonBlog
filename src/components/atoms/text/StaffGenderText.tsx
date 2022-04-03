import { Box, Center, Text } from "@chakra-ui/layout";
import { memo, useEffect, useState, VFC } from "react";
import "../../../App.css";

type Props = {
  staffGender: number;
};

export const StaffGenderText: VFC<Props> = memo((props) => {
  const { staffGender } = props;
  return (
    <Box>
      <Text fontWeight={"bold"} color="#aa0000" display={"inline"}>
        {staffGender === 1 || staffGender === 3 ? "女性" : ""}
      </Text>
      {staffGender === 2 || staffGender === 3 ? (
        <Text fontWeight={"bold"} color="#005dff" display={"inline"}>
          男性
        </Text>
      ) : (
        ""
      )}
      <Text ml={"5px"} display={"inline"} fontSize={"0.8rem"}>
        が施術
      </Text>
    </Box>
  );
});
