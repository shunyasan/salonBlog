import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { memo, VFC } from "react";
import "../../../App.css";
import { ApiClinicOption } from "../../../type/api/ApiType";
import { OptionText } from "../../../type/app/BaseType";

type Props = {
  datas: OptionText[];
};

export const PaymentRerationsTable: VFC<Props> = memo((props) => {
  const { datas } = props;
  return (
    <Table variant={"unstyled"} size={"xs"}>
      <Thead>
        <Tr>
          <Th>カード払い</Th>
          <Th>医療ローン</Th>
          <Th>途中解約</Th>
        </Tr>
      </Thead>
      <Tbody fontSize={"1rem"}>
        <Tr>
          {datas.map((data, i) => (
            <Td key={i}>{data.text || "-"}</Td>
          ))}
        </Tr>
      </Tbody>
    </Table>
  );
});
