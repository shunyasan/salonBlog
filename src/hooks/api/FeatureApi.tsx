import axios from "axios";
import { useCallback } from "react";
import { Feature } from "../../enums/FeatureEnum";
import { ClinicNestPriceDto } from "../../type/api/dto/ClinicNestPriceDto";
import { FeatureDto } from "../../type/api/dto/FeatureDto";
import { getAxios } from "./config/ApiConfig";

export const FeatureApi = () => {
  const featureValidation = useCallback((val: string) => {
    const feature: string[] = [
      Feature.anesthesia,
      Feature.installments,
      Feature.interior,
      Feature.privateRoom,
      Feature.sutudentDiscount,
      Feature.visitFee,
    ];
    const check = feature.includes(val);
    return check;
  }, []);

  const getAllFeature = useCallback(async (): Promise<FeatureDto> => {
    const api = await getAxios("feature");
    const data: FeatureDto = api.data;
    return data;
  }, []);

  const getFeature = useCallback(
    async (
      feature: string,
      take: number,
      skip: number
    ): Promise<ClinicNestPriceDto[]> => {
      const check = featureValidation(feature);
      if (!check) {
        throw new Error("featureがありません");
      }
      const query = `take=${take}&skip=${skip}`;
      const data: ClinicNestPriceDto[] = await getAxios(
        `feature/${feature}?` + query
      )
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
        });

      return data;
    },
    [featureValidation]
  );

  const getCountFeature = useCallback(
    async (feature: string): Promise<number> => {
      const check = featureValidation(feature);
      if (!check) {
        throw new Error("featureがありません");
      }
      const data: number = await getAxios(`feature/count/${feature}`)
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
        });

      return data;
    },
    [featureValidation]
  );

  return {
    getAllFeature,
    getFeature,
    getCountFeature,
  };
};
