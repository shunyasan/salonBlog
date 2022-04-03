import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { memo, useCallback, VFC } from "react";
import { ApiOnlyPrice, ApiPrice } from "../../../type/api/ApiType";
import { InlineTitleBadge } from "../../atoms/badge/InlineTitleBadge";

type Props = {
  price: ApiOnlyPrice;
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
      p={"0.5rem 2rem"}
      borderRadius={8}
      border={"1px"}
      borderColor={"originGray"}
      justifyContent={"space-between"}
    >
      <HStack spacing={"5px"} fontSize={"0.8rem"}>
        <Text as={"a"} maxW={"50%"}>
          {price.name}
        </Text>
        <Text as={"a"} pr={"1rem"} fontSize={"0.8rem"}>
          ({checkGender()})
        </Text>
        <Text as={"a"}>{price.times}回</Text>
      </HStack>
      <HStack>
        <Box textAlign={"center"} display={"inline-block"}>
          <InlineTitleBadge>総額</InlineTitleBadge>
          <Text fontSize="1.3rem">
            ¥{price.price.toLocaleString()}
            {/* <Text as={"a"} fontSize={"0.6rem"}>
              ({price.})
            </Text> */}
          </Text>
        </Box>
        <Button variant={"base"} ml={"1rem"} size={"xs"}>
          詳細
        </Button>
      </HStack>
    </HStack>
  );
});
