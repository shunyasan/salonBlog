import {
	Box,
	Button,
	Center,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Select,
	Stack,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { useHistory, useLocation } from "react-router-dom";
import CardName from "../../../enums/SalonEnums";
import { SearchResultHooks } from "../../../hooks/firebase/search/SearchResultHooks";
import { OrderPlan } from "../../../type/api/FirebaseType";
import {
	LocalConditionData,
	OrderPlanIdName,
	PlanResaerch,
	ViewDataIdName,
} from "../../../type/api/ViewTypeFromFirebase";
import { PartsSelect } from "../../atoms/select/PartsSelect";
import { ConditionText } from "../../atoms/text/ConditionText";

type Props = {
	OrderPlan: OrderPlanIdName;
	isOpen: boolean;
	onClose: () => void;
};

export const PlanResearchModal: VFC<Props> = memo((props) => {
	const { OrderPlan, isOpen, onClose } = props;
	const [orderData, setOrderData] = useState<OrderPlanIdName>();
	const [planResearchData, setPlanResearchData] = useState<PlanResaerch>();

	const { createResearchPartsData } = SearchResultHooks();
	const history = useHistory();

	const returnPartsConditionData = useCallback(
		async (orderParams: OrderPlanIdName) => {
			return await createResearchPartsData(orderParams);
		},
		[createResearchPartsData]
	);

	const returnLocalConditionData = useCallback(
		async (orderParams: OrderPlanIdName) => {
			const localData: LocalConditionData[] = [
				{
					title: "性別",
					orderData: orderParams.gender,
					texts: ["女性", "男性"],
				},
				{
					title: "肌色",
					orderData: orderParams.skinCollor,
					texts: ["白色", "薄茶色", "色黒"],
				},
				{
					title: "毛量",
					orderData: orderParams.hair,
					texts: ["産毛", "標準", "太い"],
				},
				{
					title: "料金体系",
					orderData: orderParams.paySystem,
					texts: ["総額", "１回分"],
				},
			];
			const partsData = await returnPartsConditionData(orderParams);
			setPlanResearchData({ local: localData, parts: partsData });
			setOrderData({
				gender: orderParams.gender,
				skinCollor: orderParams.skinCollor,
				hair: orderParams.hair,
				paySystem: orderParams.paySystem,
				originParts: orderParams.originParts,
				aboutParts: orderParams.aboutParts,
				parts: orderParams.parts,
			});
		},
		[returnPartsConditionData]
	);

	const checkNewAboutPartsData = useCallback(
		(newOrderData: OrderPlanIdName, key: string, name: string, id: string) => {
			if (key === "広域カテゴリ") {
				newOrderData["originParts"] = { id, name };
				newOrderData["aboutParts"] = { id, name };
				newOrderData["parts"] = null;
			} else if (key === "詳細カテゴリ") {
				newOrderData["aboutParts"] = { id, name };
				newOrderData["parts"] = null;
			} else if (key === "部位") {
				newOrderData["parts"] = { id, name };
			}
			return newOrderData;
		},
		[]
	);

	const getSetOrderData = useCallback(
		async (key: string, name: string, id?: string) => {
			if (orderData) {
				const newOrderData: OrderPlanIdName = {
					gender: key === "性別" ? name : orderData.gender,
					skinCollor: key === "肌色" ? name : orderData.skinCollor,
					hair: key === "毛量" ? name : orderData.hair,
					paySystem: key === "料金体系" ? name : orderData.paySystem,
					originParts: orderData.originParts,
					aboutParts: orderData.aboutParts,
					parts: orderData.parts,
				};
				const checkedParts: OrderPlanIdName = id
					? checkNewAboutPartsData(newOrderData, key, name, id)
					: newOrderData;
				await returnLocalConditionData(checkedParts);
				console.log(orderData);
			}
		},
		[returnLocalConditionData, orderData, checkNewAboutPartsData]
	);

	const createParam = useCallback((key: string, value: string) => {
		return `${key}=${value}&`;
	}, []);

	const checkNoneParameter = useCallback(
		(cardName: string, id: string) => {
			if (id === "none") {
				return "";
			} else {
				return createParam(cardName, id);
			}
		},
		[createParam]
	);

	const researchPlan = useCallback(async () => {
		if (orderData) {
			let newParams: string = "";
			newParams += createParam(CardName.first, orderData.gender);
			newParams += createParam(CardName.second, orderData.skinCollor);
			newParams += createParam(CardName.third, orderData.hair);
			newParams += createParam(CardName.fourth, orderData.paySystem);
			newParams += createParam(CardName.fifth, orderData.originParts.id);
			newParams += orderData.aboutParts
				? checkNoneParameter(CardName.sixth, orderData.aboutParts.id)
				: "";
			newParams += orderData.parts
				? checkNoneParameter(CardName.seventh, orderData.parts.id)
				: "";
			history.push({
				pathname: "/salon/search",
				search: `?${newParams}`,
			});
			onClose();
		}
	}, [history, createParam, checkNoneParameter, orderData, onClose]);

	useEffect(() => {
		returnLocalConditionData(OrderPlan);
		console.log("tes");
	}, [returnLocalConditionData, OrderPlan]);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalCloseButton />
				<ModalBody p={"2rem"}>
					<Stack m={"auto"} textAlign={"center"} spacing={"2rem"}>
						{planResearchData?.local.map((data, int) => (
							<ConditionText
								key={int}
								title={data.title}
								orderData={data.orderData}
								texts={data.texts}
								onClick={(name: string) => getSetOrderData(data.title, name)}
							/>
						))}
						{planResearchData?.parts.map((part, int) => (
							<Box key={int}>
								<Center
									w={"30%"}
									display={"inline-block"}
									border={"1px"}
									borderColor={"originBlack"}
								>
									{part.title}
								</Center>
								<Box w={"70%"} display={"inline-block"}>
									<PartsSelect
										data={part.value}
										noneValue={"未指定"}
										onChange={(name: string, id: string) =>
											getSetOrderData(part.title, name, id)
										}
									/>
								</Box>
							</Box>
						))}
					</Stack>
					<Center mt={"2rem"}>
						<Button
							w={"60%"}
							variant={"base"}
							size={"md"}
							onClick={researchPlan}
						>
							再検索
						</Button>
					</Center>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
});
