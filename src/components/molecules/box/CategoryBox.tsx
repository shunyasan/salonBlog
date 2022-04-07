import { Box, Button, Image, Text } from "@chakra-ui/react";
import { memo, VFC } from "react";
import { AboutCategory } from "../../../type/api/AboutCategory";

type Props = {
  category: AboutCategory;
  gender: string;
  width: { md: string; sm: string };
  arrow: boolean;
  onClick: () => void;
  search?: () => void;
  // getId: (id: string) => void;
  // 1:女性 2:男性
};
export const CategoryBox: VFC<Props> = memo((props) => {
  const { category, gender, width, arrow, onClick, search } = props;
  return (
    // <Box>
    <Box
      m={"1rem !important"}
      py={"0.5em"}
      w={width}
      h={{ md: "13em", sm: "12em" }}
      cursor={"pointer"}
      onClick={onClick}
      // border={arrow ? "4px" : ""}
      shadow={arrow ? "0 0 3px 2px #111" : ""}
    >
      <Image
        src={gender === "男性" ? category.imgUrlMen : category.imgUrlLady}
      />
      <Text py={"0.7rem"}>{category.name}</Text>
      {arrow && (
        <Box>
          <Button
            variant={"whiteNotSpace"}
            p={"3px"}
            fontSize={"0.5em"}
            onClick={search}
          >
            このプランを探す
          </Button>
        </Box>
      )}
    </Box>
    // {arrow && <Box fontSize={"1.3rem"}>▼</Box>}
    // </Box>
  );
});
