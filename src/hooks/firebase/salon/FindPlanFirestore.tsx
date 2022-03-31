import {
	collection,
	doc,
	DocumentSnapshot,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
	QuerySnapshot,
	updateDoc,
	where,
} from "firebase/firestore";
import { useCallback } from "react";
import { db } from "../../../firebase";
import {
	FirestoreClinic,
	FirestoreClinicOption,
	FirestoreDataIdName,
	FirestoreOpeningHours,
	OrderPlan,
	Prices,
} from "../../../type/api/FirebaseType";
import {
	ClinicAndOption,
	OpeningHours,
	PriceAndClinics,
	SortPlanData,
} from "../../../type/api/ViewTypeFromFirebase";
import { AboutPartsFirestore } from "./AboutPartsFirestore";
import { ChangeFormatForView } from "./changeFormat/ChangeFormatForView";
import { ChangeFormatFirestore } from "./changeFormat/ChangrFormatFirestore";
import { ClinicHook } from "./ClinicHook";
import { PartsCardFirestore } from "./PartsCardFirestore";

export const FindPlanFirestore = () => {
	const { getOneAboutPartsCategory } = AboutPartsFirestore();
	const { getParts } = PartsCardFirestore();
	const { changeFormatPrices } = ChangeFormatFirestore();
	const { changeFormatToPriceAndClinics } = ChangeFormatForView();
	const { getClinicAndOptiondData } = ClinicHook();

	const getPartsCollection = useCallback((docName: string) => {
		return collection(db, "prices", "tokyo", docName);
	}, []);

	const createRandomNumber = useCallback((max: number): number => {
		return Math.floor(Math.random() * max);
	}, []);

	const randomSortNumbers = useCallback(
		(length: number) => {
			let nums = [...Array(length)].map((_, i) => i);
			const randomed = nums.map(() => {
				const tes = createRandomNumber(nums.length);
				const get = nums[tes];
				nums = nums.filter((i) => i !== get);
				return get;
			});
			return randomed;
		},
		[createRandomNumber]
	);

	const getPriceAndLimit = useCallback(
		async (
			docmentName: string,
			num: number,
			gender: number,
			sortColumn: string
		) => {
			const findData = query(
				getPartsCollection(docmentName),
				orderBy(sortColumn, "asc"),
				limit(num)
			);
			const docSnap = await getDocs(findData);
			const data = changeFormatPrices(docSnap);
			return data;
		},
		[getPartsCollection, changeFormatPrices]
	);

	const getPriceByPartsIdAndLimit = useCallback(
		async (
			docmentName: string,
			partsId: string,
			num: number,
			gender: number,
			sortColumn: string
		) => {
			const findData = query(
				getPartsCollection(docmentName),
				where("parts_id", "==", partsId),
				where("gender", "array-contains", gender),
				orderBy(sortColumn, "asc"),
				limit(num)
			);
			const docSnap = await getDocs(findData);
			const data = changeFormatPrices(docSnap);
			return data;
		},
		[getPartsCollection, changeFormatPrices]
	);

	const getPriceAndClinicData = useCallback(
		async (price: Prices) => {
			const clinic = await getClinicAndOptiondData(price.clinic_id);
			const data = changeFormatToPriceAndClinics(price, clinic);
			return data;
		},
		[getClinicAndOptiondData, changeFormatToPriceAndClinics]
	);

	const findPriceFromPartsId = useCallback(
		async (
			table: string,
			partsId: string,
			gender: number,
			sortData: SortPlanData
		) => {
			const priceData = await getPriceByPartsIdAndLimit(
				table,
				partsId,
				20,
				gender,
				sortData.paySystem
			);

			const priceAndClinic = Promise.all(
				priceData.map(async (price) => {
					return await getPriceAndClinicData(price);
				})
			);
			return priceAndClinic;
		},
		[getPriceByPartsIdAndLimit, getPriceAndClinicData]
	);

	const findPriceFromAboutParts = useCallback(
		async (table: string, gender: number, sortData: SortPlanData) => {
			const priceData = await getPriceAndLimit(table, 5, gender, "clinic_id");

			const priceAndClinic = Promise.all(
				priceData.map(async (price) => {
					return await getPriceAndClinicData(price);
				})
			);
			return priceAndClinic;
		},
		[getPriceAndLimit, getPriceAndClinicData]
	);

	const getTreatmentPlan = useCallback(
		async (orderPlan: OrderPlan) => {
			const notApplicableGenderNumber: number =
				orderPlan.gender === "男性" ? 2 : 1;
			const sortData: SortPlanData = {
				paySystem: orderPlan.paySystem === "総額" ? "price" : "once_price",
			};
			const aboutParts = await getOneAboutPartsCategory(orderPlan.aboutParts);

			if (!orderPlan.parts) {
				const partsFromAboutParts = await findPriceFromAboutParts(
					aboutParts.table_name,
					notApplicableGenderNumber,
					sortData
				);
				return partsFromAboutParts;
			} else {
				const partsFromAboutParts = findPriceFromPartsId(
					aboutParts.table_name,
					orderPlan.parts,
					notApplicableGenderNumber,
					sortData
				);
				return partsFromAboutParts;
			}
		},
		[findPriceFromAboutParts, findPriceFromPartsId, getOneAboutPartsCategory]
	);

	return { getTreatmentPlan };
};
