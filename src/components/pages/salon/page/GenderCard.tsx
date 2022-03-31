import { Button } from "@chakra-ui/button";
import { Box, Center, HStack, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { transition } from "@chakra-ui/styled-system";
import { Slide, SlideFade } from "@chakra-ui/transition";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import menImg from "../../../../resorces/salon/men.jpg";
import ladyImg from "../../../../resorces/salon/lady.jpg";
import "../../../../App.css";

type Props = {
	// onClickNext: () => void;
	setGenderData: (data: string) => void;
	setAnimation: string;
};

export const GenderCard: VFC<Props> = memo((props) => {
	const { setGenderData, setAnimation } = props;
	const [change, setChange] = useState<string>("fade");
	const [selected, setSelected] = useState<string>("");

	const selectGender = useCallback(
		(data: string) => {
			setGenderData(data);
			setSelected(data);
		},
		[setGenderData]
	);

	useEffect(() => {
		setChange(setAnimation);
	}, [setAnimation]);

	return (
		<div className={change}>
			<Box m={6} textAlign="center">
				<Box>性別を選択</Box>
				<Center m="16">
					<HStack spacing="10">
						<Box
							w="20rem"
							shadow="xl"
							cursor="pointer"
							onClick={() => selectGender("男性")}
							filter={
								selected === "男性" ? "brightness(50%)" : "brightness(100%)"
							}
						>
							<Image src={menImg} />
							<Text p="5">男性</Text>
						</Box>
						<Box
							w="20rem"
							shadow="xl"
							cursor="pointer"
							onClick={() => selectGender("女性")}
							filter={
								selected === "女性" ? "brightness(50%)" : "brightness(100%)"
							}
						>
							<Image src={ladyImg} />
							<Text p="5">女性</Text>
						</Box>
					</HStack>
				</Center>
			</Box>
		</div>
	);
});
