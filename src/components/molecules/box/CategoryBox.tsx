import { Box, Image, Text } from "@chakra-ui/react";
import { memo, VFC } from "react";
import { AboutCategory, OriginCategory } from "../../../type/api/ApiType";

type Props = {
  category: AboutCategory;
  gender: number;
  width: string;
  arrow: boolean;
  onClick: () => void;
  // getId: (id: string) => void;
  // 1:女性 2:男性
};
export const CategoryBox: VFC<Props> = memo((props) => {
  const { category, gender, width, arrow, onClick } = props;
  return (
    <Box>
      <Box m={"1rem"} w={width} cursor={"pointer"} onClick={() => onClick()}>
        <Image src={gender === 1 ? category.imgUrlLady : category.imgUrlMen} />
        <Text pt={"0.7rem"}>{category.name}</Text>
      </Box>
      {arrow && <Box fontSize={"1.3rem"}>▼</Box>}
    </Box>
  );
});
