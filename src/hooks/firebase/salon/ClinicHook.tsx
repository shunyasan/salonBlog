import {
	collection,
	doc,
	getDoc,
	getDocs,
	limit,
	query,
	where,
} from "firebase/firestore";
import { useCallback } from "react";
import { db } from "../../../firebase";
import { ChangeFormatForView } from "./changeFormat/ChangeFormatForView";
import { ChangeFormatFirestore } from "./changeFormat/ChangrFormatFirestore";

export const ClinicHook = () => {
	const {
		changeFormatOpeningHoursData,
		changeFormatClinicOptionsData,
		changeFormatClinic,
	} = ChangeFormatFirestore();

	const { changeFormatClinicAndOption } = ChangeFormatForView();

	const getClinicOptionCollection = useCallback(() => {
		return collection(db, "clinic", "tokyo", "clinic_option");
	}, []);

	const getOpeningHoursCollection = useCallback(() => {
		return collection(db, "clinic", "tokyo", "opening_hours");
	}, []);

	const getClinicDocumentById = useCallback((clinicId: string) => {
		return doc(db, "clinic", "tokyo", "clinic", clinicId);
	}, []);

	const getClinicData = useCallback(
		async (clinicId: string) => {
			const getClinicData = await getDoc(getClinicDocumentById(clinicId));
			const changedClinicData = changeFormatClinic(getClinicData);
			return changedClinicData;
		},
		[changeFormatClinic, getClinicDocumentById]
	);

	const getClinicOptiondData = useCallback(
		async (clinicId: string) => {
			const getOptionData = await getDocs(
				query(
					getClinicOptionCollection(),
					where("clinic_id", "==", clinicId),
					limit(1)
				)
			);
			const changedClinicOptionData =
				changeFormatClinicOptionsData(getOptionData);
			return changedClinicOptionData;
		},
		[getClinicOptionCollection, changeFormatClinicOptionsData]
	);

	const getClinicOpeninghoursData = useCallback(
		async (clinicId: string) => {
			const getOpeningHoursData = await getDocs(
				query(getOpeningHoursCollection(), where("clinic_id", "==", clinicId))
			);
			const changedData = changeFormatOpeningHoursData(getOpeningHoursData);
			return changedData;
		},
		[changeFormatOpeningHoursData, getOpeningHoursCollection]
	);

	const getClinicAndOptiondData = useCallback(
		async (clinicId: string) => {
			const clinicData = await getClinicData(clinicId);
			const clinicOptionData = await getClinicOptiondData(clinicId);
			if (clinicOptionData.length === 1) {
				const clinicAndOption = await changeFormatClinicAndOption(
					clinicData,
					clinicOptionData[0]
				);
				return clinicAndOption;
			}
			throw new Error();
		},
		[getClinicData, getClinicOptiondData, changeFormatClinicAndOption]
	);

	return { getClinicAndOptiondData };
};
