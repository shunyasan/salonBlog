import { Box, Button, Image, Text } from "@chakra-ui/react";
import { memo, VFC } from "react";
import { AboutCategory } from "../../../type/api/AboutCategory";

type Props = {
  category: AboutCategory;
  gender: string;
  width: string;
  arrow: boolean;
  onClick: () => void;
  search?: () => void;
  // getId: (id: string) => void;
  // 1:女性 2:男性
};
export const CategoryBox: VFC<Props> = memo((props) => {
  const { category, gender, width, arrow, onClick, search } = props;
  return (
    <Box>
      <Box m={"1rem"} w={width} cursor={"pointer"} onClick={() => onClick()}>
        <Image
          src={gender === "男性" ? category.imgUrlMen : category.imgUrlLady}
        />
        <Text py={"0.7rem"}>{category.name}</Text>
        {arrow && (
          <Button
            variant={"whiteNotSpace"}
            p={"3px"}
            fontSize={"0.5em"}
            onClick={search}
          >
            このプランを探す
          </Button>
        )}
      </Box>
      {arrow && <Box fontSize={"1.3rem"}>▼</Box>}
    </Box>
  );
});
