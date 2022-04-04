import { Box, Center, Select, Text } from "@chakra-ui/react";
import { ChangeEvent, memo, useCallback, VFC } from "react";
import { IdAndNameDto } from "../../../type/api/dto/IdAndNameDto";

type Props = {
  title: string;
  data: IdAndNameDto[];
  noneValue: string;
  onChange: (name: string, id: string) => void;
};
export const PartsSelectBox: VFC<Props> = memo((props) => {
  const { title, data, noneValue, onChange } = props;

  const changeSetNewIdName = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const newOrderId = e.target.value;
      const findData = data.find((val) => val.id === newOrderId);
      if (findData) {
        onChange(findData.name, findData.id);
      }
    },
    [data, onChange]
  );

  return (
    <Box>
      <Center
        w={"30%"}
        display={"inline-block"}
        bg={"originLiteGray"}
        border={"1px"}
        borderColor={"originBlack"}
      >
        {title}
      </Center>
      <Box w={"70%"} display={"inline-block"}>
        <Select
          textAlign={"center"}
          display={"inline-block"}
          border={"none"}
          w={"10rem"}
          size={"xs"}
          cursor={"pointer"}
          _hover={{ border: "1px", borderColor: "originGray" }}
          _focus={{ outline: "none", border: "1px", borderColor: "originGray" }}
          placeholder={data.length < 1 ? noneValue : ""}
          onChange={changeSetNewIdName}
        >
          {data.map((text) => (
            <option key={text.id} value={text.id}>
              {text.name}
            </option>
          ))}
        </Select>
      </Box>
    </Box>
  );
});
