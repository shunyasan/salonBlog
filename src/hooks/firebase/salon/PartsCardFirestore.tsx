import {
	collection,
	doc,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
	QuerySnapshot,
	where,
} from "firebase/firestore";
import { useCallback } from "react";
import { db } from "../../../firebase";
import { FirestoreDataIdName } from "../../../type/api/FirebaseType";
import { ChangeFormatForView } from "./changeFormat/ChangeFormatForView";

export const PartsCardFirestore = () => {
	const { changeFormatViewDataIdNameArray, changeFormatViewDataIdName } =
		ChangeFormatForView();

	const getCollectionOfPartsOne = useCallback(() => {
		return collection(db, "parts", "parts", "parts_one");
	}, []);

	const getPartsOneDocumentById = useCallback((partsId: string) => {
		return doc(db, "parts", "parts", "parts_one", partsId);
	}, []);

	const changeFormatPartsData = useCallback(async (data: QuerySnapshot) => {
		const parts: FirestoreDataIdName[] = [];
		data.forEach((snap: any) => {
			const data = snap.data();
			data["id"] = snap.id;
			parts.push(newParts(data));
		});
		return parts;
	}, []);

	const getOnePartsOne = useCallback(
		async (partsId: string) => {
			const getOriginData = await getDoc(getPartsOneDocumentById(partsId));
			const data = getOriginData.data();
			if (data) {
				data["id"] = getOriginData.id;
				return newParts(data);
			}
			return null;
		},
		[getPartsOneDocumentById]
	);

	const getOneIdNameParts = useCallback(
		async (partsId: string) => {
			const getData = await getOnePartsOne(partsId);
			return changeFormatViewDataIdName(getData);
		},
		[getOnePartsOne, changeFormatViewDataIdName]
	);

	/**
	 * parts_oneを全件取得
	 * @returns FirestoreDataIdName[]
	 */
	const getParts = useCallback(
		async (category_id: string): Promise<FirestoreDataIdName[]> => {
			const findData = query(
				getCollectionOfPartsOne(),
				where("category_id", "==", category_id),
				orderBy("name", "asc")
			);
			const docSnap = await getDocs(findData);

			const data = changeFormatPartsData(docSnap);
			return data;
		},
		[changeFormatPartsData, getCollectionOfPartsOne]
	);

	const getPartsOrderByTargetId = useCallback(
		async (aboutPartsId: string, partsId: string) => {
			const partsData = await getParts(aboutPartsId);
			partsData.forEach((parts, int) => {
				if (parts.id === partsId) {
					partsData.splice(int, 1);
					partsData.unshift(parts);
				}
			});
			return await changeFormatViewDataIdNameArray(partsData);
		},
		[getParts, changeFormatViewDataIdNameArray]
	);

	const newParts = (data: any): FirestoreDataIdName => {
		const PartsData: FirestoreDataIdName = {
			id: data.id,
			name: data.name,
		};
		return PartsData;
	};

	return {
		getParts,
		getPartsOrderByTargetId,
		getOnePartsOne,
		getOneIdNameParts,
	};
};
