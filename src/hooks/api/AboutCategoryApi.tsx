import axios from "axios";
import { useCallback } from "react";
import { AboutCategory, IdAndNameDto } from "../../type/api/ApiType";
import { baseURL, getAxios } from "./config/ApiConfig";

export const AboutCategoryApi = () => {
  const getAboutCategoryByOriginId = useCallback(
    async (originId: string): Promise<AboutCategory[]> => {
      return axios
        .get(baseURL + "about-category/originId/" + originId)
        .then((response) => {
          return response.data as AboutCategory[];
        })
        .catch((err) => {
          console.log(err);
          return [];
        });
    },
    []
  );

  const getAboutCategoryById = useCallback(
    async (id: string): Promise<AboutCategory | null> => {
      return axios
        .get(baseURL + "about-category/" + id)
        .then((response) => {
          return response.data as AboutCategory;
        })
        .catch((err) => {
          console.log(err);
          return null;
        });
    },
    []
  );

  const getAboutCategories = useCallback(
    async (
      originCategoryId: string,
      aboutCategoryId: string
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
