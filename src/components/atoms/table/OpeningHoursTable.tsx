import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { memo, VFC } from "react";
import "../../../App.css";
import { ApiClinicOpeningHours } from "../../../type/api/ApiType";

type Props = {
  datas: ApiClinicOpeningHours[];
};

export const OpeningHoursTable: VFC<Props> = memo((props) => {
  const { datas } = props;
  return (
    <Table variant={"unstyled"} size={"xs"}>
      <Thead>
        <Tr>
          <Th>診察時間</Th>
          <Th>月</Th>
          <Th>火</Th>
          <Th>水</Th>
          <Th>木</Th>
          <Th>金</Th>
          <Th>土</Th>
          <Th>日</Th>
          <Th>祝</Th>
        </Tr>
      </Thead>
      <Tbody fontSize={"1rem"}>
        {datas.map((hours, int) => (
          <Tr key={int}>
            <Td>
              {hours.startHours}〜{hours.endHours}
            </Td>
            <Td>{hours.mon ? "〇" : "-"}</Td>
            <Td>{hours.thu ? "〇" : "-"}</Td>
            <Td>{hours.wed ? "〇" : "-"}</Td>
            <Td>{hours.thir ? "〇" : "-"}</Td>
            <Td>{hours.fri ? "〇" : "-"}</Td>
            <Td>{hours.sat ? "〇" : "-"}</Td>
            <Td>{hours.sun ? "〇" : "-"}</Td>
            <Td>{hours.hol ? "〇" : "-"}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
});
