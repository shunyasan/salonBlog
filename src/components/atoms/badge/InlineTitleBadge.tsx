import { Box, Center, Text } from "@chakra-ui/layout";
import { memo, ReactNode, useEffect, useState, VFC } from "react";
import "../../../App.css";

type Props = {
  children: ReactNode;
  fontSize?: string;
  bg?: string;
  color?: string;
};

export const InlineTitleBadge: VFC<Props> = memo((props) => {
  const { children, fontSize, bg, color } = props;

  return (
    <Text
      px={"0.6rem"}
      display={"inline-block"}
      border={"1px"}
      fontSize={fontSize || "0.7rem"}
      bg={bg || ""}
      color={color || ""}
    >
      {children}
    </Text>
  );
});
