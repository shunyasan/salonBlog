import { Checkbox, Flex } from "@chakra-ui/react";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { SelectFreeOption } from "../../../type/app/SelectFreeOption";

type Props = {
  onChange: (valuse: string[]) => void;
};

export const FreeOptionCheckBox: VFC<Props> = memo((props) => {
  const { onChange } = props;
  const [selecteFreeOption, setSelecteFreeOption] = useState<SelectFreeOption>({
    irradiationLeakage: false,
    aftercare: false,
    anesthesia: false,
    firstVisitFees: false,
    subsequentVisitFees: false,
    shaving: false,
    troubleTreatment: false,
  });

  const onChangeOption = useCallback(() => {
    const list: string[] = [];
    for (const [key, val] of Object.entries(selecteFreeOption)) {
      val && list.push(key);
    }
    onChange(list);
  }, [selecteFreeOption, onChange]);

  return (
    <Flex
      wrap={"wrap"}
      justifyContent={"space-between"}
      w={"30rem"}
      mx={"auto"}
    >
      <Checkbox
        // w={"50%"}
        mx={"1rem"}
        _focus={{
          boxShadow: "none",
        }}
        isChecked={selecteFreeOption.aftercare}
        onChange={(e) => {
          setSelecteFreeOption({
            ...selecteFreeOption,
            aftercare: e.target.checked,
          });
          onChangeOption();
        }}
      >
        アフターケア
      </Checkbox>
      <Checkbox
        // w={"50%"}
        mx={"1rem"}
        _focus={{
          boxShadow: "none",
        }}
        isChecked={selecteFreeOption.anesthesia}
        onChange={(e) => {
          setSelecteFreeOption({
            ...selecteFreeOption,
            anesthesia: e.target.checked,
          });
          onChangeOption();
        }}
      >
        麻酔
      </Checkbox>
      <Checkbox
        // w={"50%"}
        mx={"1rem"}
        _focus={{
          boxShadow: "none",
        }}
        isChecked={selecteFreeOption.firstVisitFees}
        onChange={(e) => {
          setSelecteFreeOption({
            ...selecteFreeOption,
            firstVisitFees: e.target.checked,
          });
          onChangeOption();
        }}
      >
        初診料
      </Checkbox>
      <Checkbox
        // w={"50%"}
        mx={"1rem"}
        _focus={{
          boxShadow: "none",
        }}
        isChecked={selecteFreeOption.subsequentVisitFees}
        onChange={(e) => {
          setSelecteFreeOption({
            ...selecteFreeOption,
            subsequentVisitFees: e.target.checked,
          });
          onChangeOption();
        }}
      >
        再診料
      </Checkbox>
      <Checkbox
        // w={"50%"}
        mx={"1rem"}
        _focus={{
          boxShadow: "none",
        }}
        isChecked={selecteFreeOption.irradiationLeakage}
        onChange={(e) => {
          setSelecteFreeOption({
            ...selecteFreeOption,
            irradiationLeakage: e.target.checked,
          });
          onChangeOption();
        }}
      >
        照射漏れ
      </Checkbox>
      <Checkbox
        // w={"50%"}
        mx={"1rem"}
        _focus={{
          boxShadow: "none",
        }}
        isChecked={selecteFreeOption.shaving}
        onChange={(e) => {
          setSelecteFreeOption({
            ...selecteFreeOption,
            shaving: e.target.checked,
          });
          onChangeOption();
        }}
      >
        剃毛
      </Checkbox>
      <Checkbox
        // w={"50%"}
        mx={"1rem"}
        _focus={{
          boxShadow: "none",
        }}
        isChecked={selecteFreeOption.troubleTreatment}
        onChange={(e) => {
          setSelecteFreeOption({
            ...selecteFreeOption,
            troubleTreatment: e.target.checked,
          });
          onChangeOption();
        }}
      >
        トラブル処置
      </Checkbox>
    </Flex>
  );
});
