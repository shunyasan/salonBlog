import { memo, useCallback, useEffect, useState, VFC } from "react";
import { Feature } from "../../../enums/FeatureEnum";
import { ClinicApi } from "../../../hooks/api/ClinicApi";
import { ClinicNestPriceDto } from "../../../type/api/dto/ClinicNestPriceDto";
import { FeatureSearch } from "../../templete/FeatureSearch.tsx";

const numOfTake = 10;

export const InteriorFeature: VFC = memo(() => {
  return (
    <FeatureSearch
      title="内装が豪華なクリニック"
      take={numOfTake}
      featureName={Feature.interior}
    />
  );
});
