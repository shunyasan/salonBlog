import { DocumentSnapshot, QuerySnapshot } from "firebase/firestore";
import { useCallback } from "react";
import {
	FirestoreClinic,
	FirestoreClinicOption,
	FirestoreOpeningHours,
	Prices,
} from "../../../../type/api/FirebaseType";

export const ChangeFormatFirestore = () => {
	const changeFormatPrices = useCallback((data: QuerySnapshot) => {
		const parts: Prices[] = [];
		data.forEach((snap: any) => {
			const getData = snap.data();
			getData["id"] = snap.id;
			parts.push(getData);
		});
		return parts;
	}, []);

	const changeFormatOpeningHoursData = useCallback((data: QuerySnapshot) => {
		const parts: FirestoreOpeningHours[] = [];
		data.forEach((snap: any) => {
			const getData = snap.data();
			getData["id"] = snap.id;
			parts.push(getData);
		});
		return parts;
	}, []);

	const changeFormatClinicOptionsData = useCallback((data: QuerySnapshot) => {
		const parts: FirestoreClinicOption[] = [];
		data.forEach((snap: any) => {
			const getData = snap.data();
			getData["id"] = snap.id;
			parts.push(getData);
		});
		return parts;
	}, []);

	const changeFormatClinicData = useCallback((data: QuerySnapshot) => {
		const firebaseOpeninghours: FirestoreClinic[] = [];
		data.forEach((snap: any) => {
			const getData = snap.data();
			getData["id"] = snap.id;
			firebaseOpeninghours.push(getData);
		});
		return firebaseOpeninghours;
	}, []);

	const changeFormatClinic = useCallback((data: DocumentSnapshot) => {
		const getData = data.data();
		const clinic: FirestoreClinic = {
			id: data.id,
			name: getData?.name,
			Interior: getData?.Interior,
			address: getData?.address,
			area_id: getData?.area_id,
			card_pay: getData?.card_pay,
			medhical_loan: getData?.medhical_loan,
			nearest_station: getData?.nearest_station,
			reserve: getData?.reserve,
			review: getData?.review,
			room_type: getData?.room_type,
			staff_gender: getData?.staff_gender,
			tax: getData?.tax,
			tel: getData?.tel,
			url: getData?.url,
		};
		return clinic;
	}, []);

	return {
		changeFormatPrices,
		changeFormatOpeningHoursData,
		changeFormatClinicOptionsData,
		changeFormatClinicData,
		changeFormatClinic,
	};
};
