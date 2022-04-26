import { Box, HStack } from "@chakra-ui/react";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { ClinicOption } from "../../../type/api/ClinicOption";
import { FreeServiceBox } from "../../molecules/box/FreeServiceBox";
type Props = {
  clinicOption: ClinicOption;
};

export const FreeServiceBoxList: VFC<Props> = memo((props) => {
  const { clinicOption } = props;
  const [optionData, setOptionData] = useState<
    {
      title: string;
      value: string;
    }[]
  >();

  const checkNoneValue = useCallback((val: string) => {
    if (!val || val === "なし") {
      return "-";
    }
    return val;
  }, []);

  useEffect(() => {
    const datas = [
      { title: "初診料", value: checkNoneValue(clinicOption.firstVisitFees) },
      {
        title: "再診料",
        value: checkNoneValue(clinicOption.subsequentVisitFees),
      },
      {
        title: "照射漏れ",
        value: checkNoneValue(clinicOption.irradiationLeakage),
      },
      { title: "アフターケア", value: checkNoneValue(clinicOption.aftercare) },
      { title: "麻酔", value: checkNoneValue(clinicOption.anesthesia) },
      { title: "剃毛", value: checkNoneValue(clinicOption.shaving) },
      {
        title: "肌トラブル対応",
        value: checkNoneValue(clinicOption.troubleTreatment),
      },
    ];
    setOptionData(datas);
  }, [checkNoneValue, clinicOption]);

  return (
    <HStack spacing={"0"} justifyContent={"center"}>
      {optionData &&
        optionData.map((data, i) => (
          <FreeServiceBox
            title={data.title}
            value={data.value}
            fontSize={{ true: "0.75em", false: "0.6em" }}
            height={"6em"}
            width={"8em"}
            changeVal={"無料"}
            key={i}
          />
        ))}
    </HStack>
  );
});
