import axios from "axios";
import { useCallback } from "react";
import { AboutCategory } from "../../type/api/AboutCategory";
import { IdAndNameDto } from "../../type/api/dto/IdAndNameDto";
import { getAxios } from "./config/ApiConfig";

export const AboutCategoryApi = () => {
  const getAboutCategoryByOriginId = useCallback(
    async (originId: string): Promise<AboutCategory[]> => {
      const data: AboutCategory[] = await getAxios(
        "about-category/originId/" + originId
      )
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
      const data: AboutCategory | null = await getAxios("about-category/" + id)
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
        "about-category/id-and-name/sort-selected?" +
        `originCategoryId=${originCategoryId}&`;

      const checkedUrl =
        !aboutCategoryId || aboutCategoryId === "none"
          ? url
          : url + `aboutCategoryId=${aboutCategoryId}`;

      const api = await getAxios(checkedUrl);
      const data: IdAndNameDto[] = api.data;
      return data;
    },
    []
  );

  return {
    getAboutCategoryByOriginId,
    getAboutCategoryById,
    getAboutCategories,
  };
};
