import { Box, Button, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import {
	ConditionData,
	OrderPlanIdName,
} from "../../../type/api/ViewTypeFromFirebase";
import { PlanResearchModal } from "../../organisms/SearchSalon/PlanResearchModal";

type Props = {
	orderPlan: OrderPlanIdName;
};

export const SearchResultCard: VFC<Props> = memo((props) => {
	const { orderPlan } = props;
	const [orderData, setOrderData] = useState<ConditionData[]>([]);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const getOrderData = useCallback(async () => {
		const data: ConditionData[] = [
			{
				title: "性別",
				value: orderPlan.gender,
			},
			{
				title: "肌の色",
				value: orderPlan.skinCollor,
			},
			{
				title: "毛量",
				value: orderPlan.hair,
			},
			{
				title: "料金体系",
				value: orderPlan.paySystem,
			},
			{
				title: "広域カテゴリ",
				value: orderPlan.originParts ? orderPlan.originParts.name : "未指定",
			},
			{
				title: "詳細カテゴリ",
				value: orderPlan.aboutParts ? orderPlan.aboutParts.name : "未指定",
			},
			{
				title: "部位",
				value: orderPlan.parts ? orderPlan.parts.name : "未指定",
			},
		];
		setOrderData(data);
	}, [orderPlan]);

	useEffect(() => {
		getOrderData();
	}, [getOrderData]);

	return (
		<>
			<Box m={"auto"} w={"100%"} border={"1px"} py={"1rem"}>
				<Stack m={"auto"} justifyContent={"center"} w={"70%"} spacing={"2px"}>
					{orderData.map((data, int) => (
						<Box key={int} fontSize={"0.7rem"}>
							<Text
								w={"50%"}
								textAlign={"center"}
								display={"inline-block"}
								borderBottom={"1px"}
								borderColor={"originGray"}
							>
								{data.title}
							</Text>
							<Text w={"50%"} textAlign={"center"} display={"inline-block"}>
								{data.value}
							</Text>
						</Box>
					))}
					<Box>
						<Button
							onClick={onOpen}
							mt={"0.5rem"}
							w={"70%"}
							variant={"secBase"}
							size={"xs"}
						>
							条件を変更
						</Button>
					</Box>
				</Stack>
			</Box>
			{orderPlan && (
				<PlanResearchModal
					OrderPlan={orderPlan}
					isOpen={isOpen}
					onClose={onClose}
				/>
			)}
		</>
	);
});
