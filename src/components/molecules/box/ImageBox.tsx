import { Box, Flex, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { memo, useCallback, useState, VFC } from "react";
import planImg from "../../../resorces/plan-icon.jpg";
import { useHistory } from "react-router-dom";
import { HomeFeatureText } from "../../../type/app/HomeFeatureText";

type Props = {
  homeFeature: HomeFeatureText;
  width?: string;
};
export const ImageBox: VFC<Props> = memo((props) => {
  const { homeFeature, width } = props;
  const history = useHistory();

  const pushLink = useCallback(() => {
    history.push(homeFeature.path);
  }, [history, homeFeature.path]);

  return (
    <Box maxW="14rem" pt="2rem" px={"1rem"}>
      <Box
        shadow={"0 4px 8px 2px rgb(180,180,180)"}
        transitionDuration={"1s"}
        transitionTimingFunction={"ease-out"}
        cursor={"pointer"}
        _hover={{ shadow: "none" }}
        onClick={pushLink}
      >
        <Image src={homeFeature.img} />
        <Stack justifyContent={"center"} p={"0.9rem"} textAlign={"center"}>
          <Text fontWeight={"bold"}>{homeFeature.text}</Text>
          <Box borderBottom={"1px"} borderColor={"#bbb"}></Box>
          <Text fontSize={"0.6rem"}>{homeFeature.description}</Text>
        </Stack>
      </Box>
    </Box>
  );
});
