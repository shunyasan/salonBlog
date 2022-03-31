import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Center, HStack, Text } from "@chakra-ui/layout";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import softHair from "../../../../resorces/salon/hair/softHair.jpg";
import softHair2 from "../../../../resorces/salon/hair/softHair2.jpg";
import standardHair from "../../../../resorces/salon/hair/standardHair.jpg";
import hardHair from "../../../../resorces/salon/hair/hardHair.jpg";
import "../../../../App.css";

type Props = {
	// onClickNext: () => void;
	// onClickPrev: () => void;
	setHairData: (data: any) => void;
};

export const HairCard: VFC<Props> = memo((props) => {
	const [change, setChange] = useState<string>("fade");
	const [selected, setSelected] = useState<string>("");

	const { setHairData } = props;

	const selectProps = useCallback(
		(data: string) => {
			setHairData(data);
			setSelected(data);
		},
		[setHairData]
	);

	// const NextClick = useCallback(() => {
	// 	setChange("slide");
	// 	setTimeout(() => {
	// 		onClickNext();
	// 	}, 500);
	// }, [onClickNext]);

	// const PrevClick = useCallback(() => {
	// 	setChange("slide");
	// 	setTimeout(() => {
	// 		onClickPrev();
	// 	}, 500);
	// }, [onClickPrev]);

	return (
		<>
			<div className={change ? change : ""}>
				<Box m={6} textAlign="center">
					<Box>脱毛をする箇所の毛量を選択</Box>
					<Center m="16">
						<HStack spacing="10">
							<Box
								w="220px"
								shadow="xl"
								cursor="pointer"
								onClick={() => selectProps("産毛")}
								filter={
									selected === "産毛" ? "brightness(50%)" : "brightness(100%)"
								}
							>
								<Image src={softHair} />
								<Text p="5">細い（産毛）</Text>
							</Box>
							<Box
								w="220px"
								shadow="xl"
								cursor="pointer"
								onClick={() => selectProps("標準")}
								filter={
									selected === "標準" ? "brightness(50%)" : "brightness(100%)"
								}
							>
								<Image src={standardHair} />
								<Text p="5">標準</Text>
							</Box>
							<Box
								w="220px"
								shadow="xl"
								cursor="pointer"
								onClick={() => selectProps("太い")}
								filter={
									selected === "太い" ? "brightness(50%)" : "brightness(100%)"
								}
							>
								<Image src={hardHair} />
								<Text p="5">太い</Text>
							</Box>
						</HStack>
					</Center>
					{/* <Box m="14">
						<Button mx="7" onClick={PrevClick}>
							戻る
						</Button>
						<Button mx="7" onClick={NextClick}>
							次へ
						</Button>
					</Box> */}
				</Box>
			</div>
		</>
	);
});
