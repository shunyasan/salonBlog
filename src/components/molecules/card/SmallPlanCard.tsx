import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { memo, useCallback, VFC } from "react";
import { PriceDto } from "../../../type/api/dto/PriceDto";
import { InlineTitleBadge } from "../../atoms/badge/InlineTitleBadge";

type Props = {
  price: PriceDto;
};
export const SmallPlanCard: VFC<Props> = memo((props) => {
  const { price } = props;
  const checkGender = useCallback(() => {
    const func: any = {};
    func[1] = "女性";
    func[2] = "男性";
    func[3] = "男性・女性";
    const gender = func[price.gender] as string;
    return gender;
  }, [price]);
  return (
    <HStack
      p={"0.5em"}
      borderRadius={8}
      border={"1px"}
      borderColor={"originGray"}
      justifyContent={"space-around"}
      fontSize={"0.8rem"}
      spacing={"0"}
    >
      <HStack spacing={"0"} justifyContent={"center"} w={"40%"} wrap={"wrap"}>
        <Text>{price.name}</Text>
        <Text>({checkGender()})</Text>
      </HStack>
      <Text w={"2em"}>{price.times}回</Text>
      <HStack>
        <Box textAlign={"center"} display={"inline-block"}>
          <InlineTitleBadge>総額</InlineTitleBadge>
          <Text fontSize={{ md: "1.5em", sm: "1.3em" }}>
            ¥{price.price.toLocaleString()}
            {/* <Text as={"a"} fontSize={"0.6rem"}>
              ({price.})
            </Text> */}
          </Text>
        </Box>
        {/* <Button variant={"base"} ml={"1rem"} size={"xs"}>
          詳細
        </Button> */}
      </HStack>
    </HStack>
  );
});
