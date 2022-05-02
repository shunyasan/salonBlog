import { Box, Flex, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { SearchSalonHooks } from "../../../hooks/app/salon/SearchSalonHooks";
import { TopResource } from "../../../resorces/TopResource";
import { Clinic } from "../../../type/api/Clinic";
import { CopyrightImageBox } from "../../atoms/box/CopyrightImageBox";

type Props = {
  clinics: Clinic[];
  onClick: () => void;
  itemWidth: string;
};

export const FeatureBoxList: VFC<Props> = memo((props) => {
  const { clinics, onClick, itemWidth } = props;
  const { getRandomImg } = SearchSalonHooks();

  const [image, setImage] = useState<string>();

  useEffect(() => {
    const get = getRandomImg();
    setImage(get);
  }, [getRandomImg]);

  return (
    <HStack
      // w={"40rem"}
      spacing={"1em"}
      wrap={"nowrap"}
      overflowX={"scroll"}
    >
      {clinics.map((data, i) => (
        <Box
          minW={itemWidth}
          h={"20em"}
          shadow="xl"
          cursor="pointer"
          onClick={onClick}
          key={i}
        >
          {image && (
            <CopyrightImageBox
              src={image}
              // src={TopResource.clinicImg}
              authority={"urk"}
              fontSize={"0.7em"}
            />
          )}
          <Stack p="1em">
            <Text>{data.name}</Text>
            <Text pt={"0.6em"} fontSize={"0.7em"}>
              {data.nearestStation}
            </Text>
          </Stack>
        </Box>
      ))}
    </HStack>
  );
});
