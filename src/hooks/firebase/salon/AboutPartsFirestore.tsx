import { useCallback, useEffect, useState } from "react";
import { db } from "../../../firebase";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	setDoc,
	where,
} from "firebase/firestore";
import { AboutParts, OriginAboutParts } from "../../../type/api/FirebaseType";
import { ChangeFormatForView } from "./changeFormat/ChangeFormatForView";

export const AboutPartsFirestore = () => {
	const { changeFormatViewDataIdNameArray, changeFormatViewDataIdName } =
		ChangeFormatForView();

	const getCollectionOfPartsCategory = useCallback(() => {
		return collection(db, "parts", "category", "parts_category");
	}, []);

	const getPartsCategoryDocumentById = useCallback((aboutPartsId: string) => {
		return doc(db, "parts", "category", "parts_category", aboutPartsId);
	}, []);

	const getOneAboutPartsCategory = useCallback(
		async (aboutPartsId: string) => {
			const getAboutPartsData = await getDoc(
				getPartsCategoryDocumentById(aboutPartsId)
			);
			const data = getAboutPartsData.data();
			if (data) {
				data["id"] = getAboutPartsData.id;
				return newPartsCategory(data);
			}
			throw Error(`not found id:${aboutPartsId}`);
		},
		[getPartsCategoryDocumentById]
	);

	const getOneIdNameAboutParts = useCallback(
		async (aboutPartsId: string) => {
			const getData = await getOneAboutPartsCategory(aboutPartsId);
			return changeFormatViewDataIdName(getData);
		},
		[getOneAboutPartsCategory, changeFormatViewDataIdName]
	);

	/**
	 * partsCategotyを全件取得
	 * @returns AboutParts[]
	 */
	const getPartsCategoryById = useCallback(
		async (originId: string): Promise<AboutParts[]> => {
			const findData = query(
				getCollectionOfPartsCategory(),
				where("origin_id", "==", originId)
			);
			const docSnap = await getDocs(findData);

			const insertData: AboutParts[] = [];
			docSnap.forEach((snap) => {
				const data = snap.data();
				data["id"] = snap.id;
				insertData.push(newPartsCategory(data));
			});
			return insertData;
		},
		[getCollectionOfPartsCategory]
	);

	const getAboutPartsCategoryOrderByTargetId = useCallback(
		async (originId: string, aboutPartsId: string) => {
			const aboutPartsData = await getPartsCategoryById(originId);
			aboutPartsData.forEach((aboutParts, int) => {
				if (aboutParts.id === aboutPartsId) {
					aboutPartsData.splice(int, 1);
					aboutPartsData.unshift(aboutParts);
				}
			});
			return await changeFormatViewDataIdNameArray(aboutPartsData);
		},
		[getPartsCategoryById, changeFormatViewDataIdNameArray]
	);

	/**
	 * データ型の変更
	 * @param data
	 * @returns AboutParts
	 */
	const newPartsCategory = (data: any): AboutParts => {
		const aboutPartsData: AboutParts = {
			id: data.id,
			name: data.name,
			set: data.set,
			origin: data.origin,
			img_url_men: data.img_url_men,
			img_url_lady: data.img_url_lady,
			table_name: data.table_name,
		};
		return aboutPartsData;
	};

	return {
		getPartsCategoryById,
		getOneAboutPartsCategory,
		getAboutPartsCategoryOrderByTargetId,
		getOneIdNameAboutParts,
	};
};
