import { Box, Flex } from "@chakra-ui/react";
import { memo, VFC } from "react";
import { Clinic } from "../../../type/api/Clinic";
import { PlanConditionBox } from "../../atoms/box/PlanConditionBox";

type Props = {
  clinic: Clinic;
  width: string;
  py: string;
  fontSize?: { md: string; sm: string };
  border?: string;
  fontWeigth?: boolean;
};

export const NoticeClinicDetail: VFC<Props> = memo((props) => {
  const { clinic, width, py, fontSize, border, fontWeigth } = props;
  return (
    <Flex wrap={"wrap"} justifyContent={"space-around"}>
      {[
        <PlanConditionBox
          title={"施術者"}
          text={clinic.staffGender}
          gender={true}
          fontSize={fontSize}
          fontWeight={fontWeigth === undefined ? true : fontWeigth}
        />,
        <PlanConditionBox
          title={"予約"}
          text={clinic.reserve}
          first={"優良"}
          second={"良好"}
          other={"不明"}
          fontSize={fontSize}
          fontWeight={fontWeigth === undefined ? true : fontWeigth}
        />,
        <PlanConditionBox
          title={"内装"}
          text={clinic.interior}
          first={"豪華"}
          second={"綺麗"}
          other={"不明"}
          fontSize={fontSize}
          fontWeight={fontWeigth === undefined ? true : fontWeigth}
        />,
        <PlanConditionBox
          title={"施術室"}
          text={clinic.roomType}
          first={"完全個室"}
          second={"個室"}
          other={"不明"}
          fontSize={fontSize}
          fontWeight={fontWeigth === undefined ? true : fontWeigth}
        />,
      ].map((data, i) => (
        <Box
          key={i}
          w={width}
          py={py}
          borderTop={border || "1px"}
          borderColor={"originGray"}
        >
          {data}
        </Box>
      ))}
      <Box
        w={width}
        borderTop={border || "1px"}
        borderColor={"originGray"}
      ></Box>
      <Box
        w={width}
        borderTop={border || "1px"}
        borderColor={"originGray"}
      ></Box>
    </Flex>
  );
});
