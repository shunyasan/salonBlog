import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useCallback } from "react";
import { db } from "../../../firebase";
import { Prices } from "../../../type/api/FirebaseType";
import { ChangeFormatForView } from "../salon/changeFormat/ChangeFormatForView";
import { ChangeFormatFirestore } from "../salon/changeFormat/ChangrFormatFirestore";
import { ClinicHook } from "../salon/ClinicHook";

export const FindFeatureClinic = () => {
	const { changeFormatPrices } = ChangeFormatFirestore();
	const { changeFormatToPriceAndClinics } = ChangeFormatForView();
	const { getClinicAndOptiondData } = ClinicHook();

	const getPartsCollection = useCallback((docName: string) => {
		return collection(db, "prices", "tokyo", docName);
	}, []);

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

	const getPriceAndClinicData = useCallback(
		async (price: Prices) => {
			const clinic = await getClinicAndOptiondData(price.clinic_id);
			const data = changeFormatToPriceAndClinics(price, clinic);
			return data;
		},
		[getClinicAndOptiondData, changeFormatToPriceAndClinics]
	);

	const findPriceFromAboutParts = useCallback(
		async (table: string, gender: number) => {
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

	return { findPriceFromAboutParts };
};
