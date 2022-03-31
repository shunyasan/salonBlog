import {
	collection,
	doc,
	DocumentData,
	getDoc,
	getDocs,
} from "firebase/firestore";
import { useCallback } from "react";
import { db } from "../../../firebase";
import { OriginAboutParts } from "../../../type/api/FirebaseType";
import { ChangeFormatForView } from "./changeFormat/ChangeFormatForView";

export const OriginPartsFirestore = () => {
	const { changeFormatViewDataIdNameArray, changeFormatViewDataIdName } =
		ChangeFormatForView();

	const getCollectionOfOriginCategory = useCallback(() => {
		return collection(db, "parts", "category", "origin_category");
	}, []);

	const getOriginCategoryDocumentById = useCallback((originId: string) => {
		return doc(db, "parts", "category", "origin_category", originId);
	}, []);

	const getOneOriginCategory = useCallback(
		async (originId: string) => {
			const getOriginData = await getDoc(
				getOriginCategoryDocumentById(originId)
			);
			const data = getOriginData.data();
			if (data) {
				data["id"] = getOriginData.id;
				return newOriginCategory(data);
			}
			return null;
		},
		[getOriginCategoryDocumentById]
	);

	const getOneIdNameOrigin = useCallback(
		async (originId: string) => {
			const getData = await getOneOriginCategory(originId);
			return changeFormatViewDataIdName(getData);
		},
		[getOneOriginCategory, changeFormatViewDataIdName]
	);

	const getOriginCategory = useCallback(async () => {
		const docSnap = await getDocs(getCollectionOfOriginCategory());
		const insertData: OriginAboutParts[] = [];
		docSnap.forEach((snap) => {
			const data = snap.data();
			data["id"] = snap.id;
			insertData.push(newOriginCategory(data));
		});
		return insertData;
	}, [getCollectionOfOriginCategory]);

	const getOriginCategoryOrderByTargetId = useCallback(
		async (originId: string) => {
			const originData = await getOriginCategory();
			originData.forEach((origin, int) => {
				if (origin.id === originId) {
					originData.splice(int, 1);
					originData.unshift(origin);
				}
			});
			return await changeFormatViewDataIdNameArray(originData);
		},
		[getOriginCategory, changeFormatViewDataIdNameArray]
	);

	const newOriginCategory = (data: DocumentData): OriginAboutParts => {
		const originAboutPartsData: OriginAboutParts = {
			id: data.id,
			name: data.name,
			img_url_men: data.img_url_men,
			img_url_lady: data.img_url_lady,
		};
		return originAboutPartsData;
	};

	return {
		getOriginCategory,
		getOriginCategoryOrderByTargetId,
		getOneOriginCategory,
		getOneIdNameOrigin,
	};
};
