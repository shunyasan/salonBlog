import { Text } from "@chakra-ui/react";
import { memo, useEffect, useState, VFC } from "react";

type Props = {
  text: string | number;
  first: string;
  second: string;
  fontSize?: string;
  other: string;
};
export const StatusText: VFC<Props> = memo((props) => {
  const { text, first, second, fontSize, other } = props;
  const [statusColor, setStatusColor] = useState<string>();

  useEffect(() => {
    const func: any = {};
    func[first] = "SeeThroughGold";
    func[second] = "SeeThroughBlue";
    const bg = func[text];
    if (bg) {
      setStatusColor(bg);
    } else {
      setStatusColor("");
    }
  }, [first, second, text]);

  return (
    <Text bg={statusColor} px={"5px"} display={"inline"} fontSize={fontSize}>
      {text || other}
    </Text>
  );
});
