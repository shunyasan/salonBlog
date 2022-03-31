import { type } from "os";

export type OpeningHours = {
	start_hours: string;
	end_hours: string;
	mon: boolean;
	thu: boolean;
	wed: boolean;
	thi: boolean;
	fri: boolean;
	sat: boolean;
	sun: boolean;
	hol: boolean;
	description: string;
};

export type PriceAndClinics = {
	id: string;
	clinic: ClinicAndOption;
	description: string;
	parts: string;
	price: number;
	once_price: number;
	times: number;
};

export type ClinicAndOption = {
	id: string;
	name: string;
	Interior: string;
	address: string;
	card_pay: string;
	medhical_loan: string;
	nearest_station: string;
	reserve: string;
	review: string;
	room_type: string;
	staff_gender: number;
	tax: string;
	tel: string;
	url: string;
	clinic_option: ClinicOption;
};

export type ClinicOption = {
	Irradiation_leakage: string;
	aftercare: string;
	anesthesia: string;
	campaign: string;
	contract_cancellation: string;
	first_visit_fees: string;
	shaving: string;
	student_discount: string;
	subsequent_visit_fees: string;
	trouble_treatment: string;
};

export type ViewDataIdName = {
	id: string;
	name: string;
};

export type orderPlanParts = {
	origin: string;
	aboutParts: string;
	parts: string;
};

export type ViewDataIdNameAndTitle = {
	title: string;
	value: ViewDataIdName[];
};

export type ConditionData = {
	title: string;
	value: string;
};

export type LocalConditionData = {
	title: string;
	orderData: string;
	texts: string[];
};

export type PlanResaerch = {
	local: LocalConditionData[];
	parts: ViewDataIdNameAndTitle[];
};

export type OrderPlanIdName = {
	gender: string;
	skinCollor: string;
	hair: string;
	paySystem: string;
	originParts: ViewDataIdName;
	aboutParts: ViewDataIdName;
	parts: ViewDataIdName | null;
};

export type SortPlanData = {
	paySystem: string;
};
