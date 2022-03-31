export type AboutParts = {
	id: string;
	name: string;
	set: boolean;
	origin: string;
	img_url_men: string;
	img_url_lady: string;
	table_name: string;
};

export type OriginAboutParts = {
	id: string;
	name: string;
	img_url_men: string;
	img_url_lady: string;
};

export type FirestoreDataIdName = {
	id: string;
	name: string;
};

export type OrderPlan = {
	gender: string;
	skinCollor: string;
	hair: string;
	paySystem: string;
	originParts: string;
	aboutParts: string;
	parts: string | null;
};

export type Prices = {
	id: string;
	clinic_id: string;
	description: string;
	gender: number;
	name: string;
	parts_id: string;
	price: number;
	once_price: number;
	times: number;
};

export type FirestoreOpeningHours = {
	start_hours: string;
	end_hours: string;
	mon: boolean;
	thu: boolean;
	wed: boolean;
	thir: boolean;
	fri: boolean;
	sat: boolean;
	sun: boolean;
	hol: boolean;
	clinic_id: string;
	description: string;
};

export type FirestoreClinic = {
	id: string;
	name: string;
	Interior: string;
	address: string;
	area_id: string;
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
};

export type FirestoreClinicOption = {
	id: string;
	Irradiation_leakage: string;
	aftercare: string;
	anesthesia: string;
	campaign: string;
	clinic_id: string;
	contract_cancellation: string;
	first_visit_fees: string;
	shaving: string;
	student_discount: string;
	subsequent_visit_fees: string;
	trouble_treatment: string;
};
