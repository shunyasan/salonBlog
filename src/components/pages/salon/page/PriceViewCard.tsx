import { Button } from "@chakra-ui/button";
import { Box, Center, Text, HStack } from "@chakra-ui/layout";
import { memo, useCallback, useState, VFC } from "react";

type Props = {
	selectParamsData: (data: any) => void;
};

export const PriceViewCard: VFC<Props> = memo((props) => {
	const [change, setChange] = useState<string>("fade");
	const [selected, setSelected] = useState<string>("");
	const { selectParamsData } = props;

	const selectItem = useCallback(
		(data: string) => {
			selectParamsData(data);
			setSelected(data);
		},
		[selectParamsData]
	);

	return (
		<div className={change ? change : ""}>
			<Box m={6} textAlign="center">
				<Box>料金の表示タイプを選択</Box>
				<Center m="16">
					<HStack spacing="10">
						<Box
							w="20rem"
							shadow="xl"
							cursor="pointer"
							p="5"
							onClick={() => selectItem("総額")}
							bg={selected === "総額" ? "#aaa" : ""}
						>
							<Text as={"a"}>施術の</Text>
							<Text as={"a"} fontSize={"2rem"}>
								総額
							</Text>
							<Text as={"a"}>を表示</Text>
						</Box>
						<Box
							w="20rem"
							shadow="xl"
							cursor="pointer"
							p="5"
							onClick={() => selectItem("１回分")}
							bg={selected === "１回分" ? "#aaa" : ""}
						>
							<Text as={"a"}>施術の</Text>
							<Text as={"a"} fontSize={"2rem"}>
								１回分
							</Text>
							<Text as={"a"}>を表示</Text>
						</Box>
					</HStack>
				</Center>
			</Box>
		</div>
	);
});
