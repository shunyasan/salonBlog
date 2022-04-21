import { memo, useCallback, useEffect, useState, VFC } from "react";
import { Feature } from "../../../enums/FeatureEnum";
import { ClinicApi } from "../../../hooks/api/ClinicApi";
import { ClinicNestPriceDto } from "../../../type/api/dto/ClinicNestPriceDto";
import { FeatureSearch } from "../../templete/FeatureSearch.tsx";

const numOfTake = 10;

export const AnesthesiaFeature: VFC = memo(() => {
  return (
    <FeatureSearch
      title="麻酔無料のクリニック"
      take={numOfTake}
      featureName={Feature.anesthesia}
    />
  );
});
