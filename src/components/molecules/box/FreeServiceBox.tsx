import { useEffect, useState, VFC } from "react";
import { IconButton, Box, Flex, Stack, Text } from "@chakra-ui/react";

type Props = {
  title: string;
  value: string;
  fontSize?: { true: string; false: string };
  height?: string;
  width?: string;
};

export const FreeServiceBox: VFC<Props> = (props) => {
  const { title, value, fontSize, height, width } = props;
  const [fontSizeData, setFontSizeData] = useState<string>();
  useEffect(() => {
    if (fontSize) {
      setFontSizeData(value !== "-" ? fontSize.true : fontSize.false);
    } else {
      setFontSizeData(value !== "-" ? "0.7em" : "0.6em");
    }
  }, [fontSize, value]);
  return (
    <Stack
      w={width || "5.5rem"}
      h={height || "4rem"}
      justifyContent={"center"}
      spacing={"3px"}
      fontSize={{ md: fontSizeData, sm: value !== "-" ? "0.7em" : "0.6em" }}
      // onClick={onClick}
      // mx={"auto !important"}
      // cursor={"pointer"}
    >
      <Text fontWeight={value !== "-" ? "bold" : ""}>{title}</Text>
      <Box
        borderBottom={"1px"}
        borderColor={"black"}
        w={"80%"}
        mx={"auto !important"}
      ></Box>
      <Text>{value}</Text>
    </Stack>
  );
};
