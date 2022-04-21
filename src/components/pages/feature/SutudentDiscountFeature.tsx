import { memo, useCallback, useEffect, useState, VFC } from "react";
import { Feature } from "../../../enums/FeatureEnum";
import { ClinicApi } from "../../../hooks/api/ClinicApi";
import { ClinicNestPriceDto } from "../../../type/api/dto/ClinicNestPriceDto";
import { FeatureSearch } from "../../templete/FeatureSearch.tsx";

const numOfTake = 10;

export const SutudentDiscountFeature: VFC = memo(() => {
  return (
    <FeatureSearch
      title="学生料金（学割）のあるクリニック"
      take={numOfTake}
      featureName={Feature.sutudentDiscount}
    />
  );
});
