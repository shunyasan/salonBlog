import { Box, Center, Flex, Link, Text } from "@chakra-ui/react";
import { memo, VFC } from "react";

type Props = {
  title: string;
  orderData: string;
  texts: string[];
  onClick: (val: string) => void;
};
export const ConditionText: VFC<Props> = memo((props) => {
  const { title, orderData, texts, onClick } = props;
  return (
    <Flex>
      <Center
        w={"30%"}
        display={"inline-block"}
        bg={"originLiteGray"}
        border={"1px"}
        borderColor={"originBlack"}
      >
        {title}
      </Center>
      <Flex justifyContent={"space-evenly"} w={"70%"} alignItems={"center"}>
        {texts.map((text, int) => (
          <Link
            key={int}
            fontSize="0.8rem"
            p={orderData === text ? "2px 5px" : ""}
            color={orderData === text ? "originWhite" : "originBlack"}
            bg={orderData === text ? "originBlack" : ""}
            onClick={() => onClick(text)}
          >
            {text}
          </Link>
        ))}
      </Flex>
    </Flex>
  );
});
