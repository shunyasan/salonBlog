import { useCallback } from "react";
import {
	FirestoreClinic,
	FirestoreClinicOption,
	OrderPlan,
	Prices,
} from "../../../../type/api/FirebaseType";
import {
	ClinicAndOption,
	ClinicOption,
	PriceAndClinics,
	ViewDataIdName,
} from "../../../../type/api/ViewTypeFromFirebase";

export const ChangeFormatForView = () => {
	const changeFormatOrderPlan = useCallback(
		(
			orderPlan: OrderPlan,
			originParts: string,
			aboutParts?: string,
			parts?: string
		) => {
			const res: OrderPlan = {
				gender: orderPlan.gender,
				skinCollor: orderPlan.skinCollor,
				hair: orderPlan.hair,
				paySystem: orderPlan.paySystem,
				originParts: originParts,
				aboutParts: aboutParts || "",
				parts: parts || "",
			};
			return res;
		},
		[]
	);

	const changeFormatClinicOption = useCallback(
		(option: FirestoreClinicOption) => {
			const clinicOption: ClinicOption = {
				Irradiation_leakage: option.Irradiation_leakage || "不明",
				aftercare: option.aftercare || "不明",
				anesthesia: option.anesthesia || "不明",
				campaign: option.campaign || "不明",
				contract_cancellation:
					option.contract_cancellation === "なし" ||
					!option.contract_cancellation
						? "不明"
						: option.contract_cancellation,
				first_visit_fees: option.first_visit_fees || "不明",
				shaving: option.shaving || "不明",
				student_discount: option.student_discount || "不明",
				subsequent_visit_fees: option.subsequent_visit_fees || "不明",
				trouble_treatment: option.trouble_treatment || "不明",
			};

			return clinicOption;
		},
		[]
	);

	const changeFormatClinicAndOption = useCallback(
		async (clinic: FirestoreClinic, option: FirestoreClinicOption) => {
			const changedOption = changeFormatClinicOption(option);
			const clinicData: ClinicAndOption = {
				id: clinic.id,
				name: clinic.name || "不明",
				Interior: clinic.Interior || "不明",
				address: clinic.address || "不明",
				card_pay: clinic.card_pay || "不明",
				medhical_loan: clinic.medhical_loan || "不明",
				nearest_station: clinic.nearest_station || "不明",
				reserve: clinic.reserve || "不明",
				review: clinic.review || "不明",
				room_type: clinic.room_type || "不明",
				staff_gender: clinic.staff_gender,
				tax: clinic.tax || "不明",
				tel: clinic.tel || "不明",
				url: clinic.url || "不明",
				clinic_option: changedOption,
			};
			return clinicData;
		},
		[changeFormatClinicOption]
	);

	const changeFormatViewDataIdName = useCallback((data: any) => {
		const getId = data["id"] || "";
		const getName = data["name"] || "";
		const changed: ViewDataIdName = { id: getId, name: getName };
		return changed;
	}, []);

	const changeFormatViewDataIdNameArray = useCallback(
		async (targetData: any) => {
			const viewData: ViewDataIdName[] = await Promise.all(
				targetData.map((data: any) => {
					return changeFormatViewDataIdName(data);
				})
			);
			return viewData;
		},
		[changeFormatViewDataIdName]
	);

	const changeFormatToPriceAndClinics = useCallback(
		(price: Prices, clinic: ClinicAndOption) => {
			const changedPrice: PriceAndClinics = {
				id: price.id,
				clinic: clinic,
				description: price.description,
				parts: price.name,
				once_price: price.once_price,
				price: price.price,
				times: price.times,
			};
			return changedPrice;
		},
		[]
	);

	return {
		changeFormatClinicAndOption,
		changeFormatOrderPlan,
		changeFormatViewDataIdName,
		changeFormatViewDataIdNameArray,
		changeFormatToPriceAndClinics,
	};
};
