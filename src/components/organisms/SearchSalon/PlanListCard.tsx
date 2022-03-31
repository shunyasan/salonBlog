import {
	Box,
	Button,
	color,
	Flex,
	HStack,
	Image,
	Link,
	Stack,
	Text,
} from "@chakra-ui/react";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import {
	OrderPlanIdName,
	PriceAndClinics,
} from "../../../type/api/ViewTypeFromFirebase";
import clinicImg from "../../../resorces/clinic.jpg";
import { OptionServiceCard } from "../../molecules/OptionServiceCard";
import { useHistory } from "react-router-dom";
import { StaffGenderText } from "../../atoms/text/StaffGenderText";
import { OptionServiceText, OptionText } from "../../../type/app/BaseType";

type Props = {
	plan: PriceAndClinics;
	orderDataIdName: OrderPlanIdName;
};
export const PlanListCard: VFC<Props> = memo((props) => {
	const { plan, orderDataIdName } = props;
	const [detailViewState, setDetailViewState] = useState<boolean>(false);
	const [detailViewClass, setDetailViewClass] =
		useState<string>("defaultDisplayNone");
	const [optionService, setOptionService] = useState<OptionText[]>();
	const [medicalFee, setMedicalFee] = useState<OptionText[]>();
	const [payment, setPayment] = useState<OptionText[]>();
	const history = useHistory();

	const newOptionFunc = useCallback(() => {
		const irradiation: OptionText = {
			name: "照射漏れ",
			text: plan.clinic.clinic_option.Irradiation_leakage,
		};
		const anesthesia: OptionText = {
			name: "麻酔",
			text: plan.clinic.clinic_option.anesthesia,
		};
		const aftercare: OptionText = {
			name: "アフターケア",
			text: plan.clinic.clinic_option.aftercare,
		};
		const shaving: OptionText = {
			name: "剃毛",
			text: plan.clinic.clinic_option.shaving,
		};
		const trouble: OptionText = {
			name: "肌トラブル",
			text: plan.clinic.clinic_option.trouble_treatment,
		};
		const firstVisit: OptionText = {
			name: "初診料",
			text: plan.clinic.clinic_option.first_visit_fees,
		};
		const subsequentVisit: OptionText = {
			name: "再診料",
			text: plan.clinic.clinic_option.subsequent_visit_fees,
		};
		const studentDiscount: OptionText = {
			name: "学割",
			text: plan.clinic.clinic_option.student_discount,
		};
		const cardPay: OptionText = {
			name: "カード払い",
			text: plan.clinic.card_pay,
		};
		const medhicalLoan: OptionText = {
			name: "医療ローン",
			text: plan.clinic.medhical_loan,
		};
		const contractCancel: OptionText = {
			name: "途中解約",
			text: plan.clinic.clinic_option.contract_cancellation,
		};
		setOptionService([irradiation, anesthesia, aftercare, shaving, trouble]);
		setMedicalFee([firstVisit, subsequentVisit, studentDiscount]);
		setPayment([cardPay, medhicalLoan, contractCancel]);
	}, [plan]);

	const detailOpen = useCallback(() => {
		if (!detailViewState) {
			setDetailViewClass("detailServiceOpen");
		} else {
			setDetailViewClass("detailServiceClose");
		}
		setDetailViewState(!detailViewState);
	}, [detailViewState]);

	useEffect(() => {
		newOptionFunc();
	}, [newOptionFunc]);

	return (
		<Box
			p={"2rem"}
			my={"3rem"}
			borderRadius={8}
			shadow={"0 4px 8px 2px rgb(180,180,180)"}
			// border="2px"
			// borderColor="#00188b"
		>
			<HStack h={"15rem"}>
				<Box w={"50%"} h={"100%"} pl={"2rem"} textAlign={"left"}>
					<Box h={"10%"}>{plan.clinic.name}</Box>
					<Image maxH={"80%"} src={clinicImg} />
					<Box minH={"10%"} pt={"0.5rem"}>
						<Text fontSize={"0.7rem"}>住所：{plan.clinic.address}</Text>
						<Text fontSize={"0.7rem"}>
							最寄り駅：{plan.clinic.nearest_station}
						</Text>
					</Box>
				</Box>
				<Box w={"50%"} h={"100%"} textAlign={"center"}>
					<Box h={"50%"}>
						<Box>
							<Text display={"inline"} fontSize={"0.4rem"}>
								({plan.clinic.tax})
							</Text>
							{orderDataIdName.paySystem !== "総額" ? (
								<>
									<Text display={"inline"} fontSize={"2rem"}>
										￥{plan.once_price.toLocaleString()}
									</Text>
									<Text display={"inline"}>/{plan.times}回</Text>
								</>
							) : (
								<Text display={"inline"} fontSize={"2rem"}>
									￥{plan.price.toLocaleString()}
								</Text>
							)}
						</Box>
						{orderDataIdName.paySystem !== "総額" && (
							<Box fontSize={"0.5rem"}>
								<Text as="a">総額</Text>
								<Text as="a">￥{plan.price.toLocaleString()}</Text>
							</Box>
						)}
						<Flex pt={3} justifyContent={"center"}>
							<Box mr={"1rem"}>
								<Text
									p={"0.2rem 0.5rem"}
									display={"inline-block"}
									border={"1px"}
									borderRadius={"0.8rem"}
									fontSize={"0.7rem"}
								>
									部位
								</Text>

								<Text my={1}>{plan.parts}</Text>
							</Box>
							<Box ml={"1rem"}>
								<Text
									p={"0.2rem 0.5rem"}
									display={"inline-block"}
									border={"1px"}
									borderRadius={"0.8rem"}
									fontSize={"0.7rem"}
								>
									回数
								</Text>
								<Text my={1}>{plan.times}回</Text>
							</Box>
						</Flex>
					</Box>
					<Box w={"100%"} h={"50%"}>
						<Box
							w={"50%"}
							mx={"auto"}
							mt={"0.5rem"}
							// bg={"#f6f6f6"}
							p={"0.5rem 1rem"}
						>
							<HStack
								my={1}
								px={2}
								justifyContent={"space-between"}
								borderBottom={"1px"}
								borderColor={"#black"}
							>
								<Text display={"inline"} fontSize={"0.7rem"}>
									予約
								</Text>
								<Text display={"inline"} fontSize={"0.9rem"}>
									{plan.clinic.reserve}
								</Text>
							</HStack>
							<HStack
								my={1}
								px={2}
								justifyContent={"space-between"}
								borderBottom={"1px"}
								borderColor={"#black"}
							>
								<Text display={"inline"} fontSize={"0.7rem"}>
									内装
								</Text>
								<Text display={"inline"} fontSize={"0.9rem"}>
									{plan.clinic.Interior}
								</Text>
							</HStack>
							<HStack
								my={1}
								px={2}
								justifyContent={"space-between"}
								borderBottom={"1px"}
								borderColor={"#black"}
							>
								<Text display={"inline"} fontSize={"0.7rem"}>
									施術室
								</Text>
								<Text display={"inline"} fontSize={"0.9rem"}>
									{plan.clinic.room_type}
								</Text>
							</HStack>
							{plan.clinic.staff_gender !== 0 && (
								<StaffGenderText staffGender={plan.clinic.staff_gender} />
							)}
						</Box>
					</Box>
				</Box>
			</HStack>
			<Box borderBottom={"1px"} borderColor={"black"} mt={"1.5rem"}></Box>
			<Box pt={"2rem"} pb={"1rem"}>
				<Link
					href={plan.clinic.url}
					_hover={{ textDecoration: "none" }}
					isExternal
				>
					<Button mr={"1.5rem"} size={"lg"} variant="base">
						公式サイト
					</Button>
				</Link>
				<Button ml={"1.5rem"} size={"lg"} variant={"secBase"}>
					詳細を開く
				</Button>
			</Box>
			<Link display={"inline-block"} fontSize={"0.7rem"} onClick={detailOpen}>
				{detailViewState ? "閉じる" : "もっと見る"}
			</Link>
			<Box className={detailViewClass}>
				{optionService && (
					<OptionServiceCard
						topTitle={"オプションサービス"}
						datas={optionService}
					/>
				)}
				{medicalFee && (
					<OptionServiceCard topTitle={"診察料"} datas={medicalFee} />
				)}
				{payment && (
					<OptionServiceCard topTitle={"契約/支払い"} datas={payment} />
				)}
			</Box>
		</Box>
	);
});
