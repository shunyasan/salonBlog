import axios from "axios";
import { useCallback } from "react";
import { AboutCategory } from "../../type/api/AboutCategory";
import { IdAndNameDto } from "../../type/api/dto/IdAndNameDto";
import { baseURL, getAxios } from "./config/ApiConfig";

export const AboutCategoryApi = () => {
  const getAboutCategoryByOriginId = useCallback(
    async (originId: string): Promise<AboutCategory[]> => {
      const data: AboutCategory[] = await axios
        .get(baseURL + "about-category/originId/" + originId)
        .then((response) => {
          return response.data as AboutCategory[];
        })
        .catch((err) => {
          return [];
        });

      return data;
    },
    []
  );

  const getAboutCategoryById = useCallback(
    async (id: string): Promise<AboutCategory | null> => {
      const data: AboutCategory | null = await axios
        .get(baseURL + "about-category/" + id)
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          return null;
        });

      return data;
    },
    []
  );

  const getAboutCategories = useCallback(
    async (
      originCategoryId: string,
      aboutCategoryId?: string
    ): Promise<IdAndNameDto[]> => {
      const url =
        baseURL +
        "about-category/id-and-name/sort-selected?" +
        `originCategoryId=${originCategoryId}&`;

      const checkedUrl =
        !aboutCategoryId || aboutCategoryId === "none"
          ? url
          : url + `aboutCategoryId=${aboutCategoryId}`;

      const getData: IdAndNameDto[] = await getAxios(checkedUrl);
      return getData;
    },
    []
  );

  return {
    getAboutCategoryByOriginId,
    getAboutCategoryById,
    getAboutCategories,
  };
};
