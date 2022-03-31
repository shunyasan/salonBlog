import { Box, Select, Text } from "@chakra-ui/react";
import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useState,
  VFC,
} from "react";
import { ViewDataIdName } from "../../../type/app/ViewTypeFromApi";

type Props = {
  data: ViewDataIdName[];
  noneValue: string;
  onChange: (name: string, id: string) => void;
};
export const PartsSelect: VFC<Props> = memo((props) => {
  const { data, noneValue, onChange } = props;

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
  );
});
