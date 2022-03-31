import { Box, Center, Text } from "@chakra-ui/layout";
import { memo, useEffect, useState, VFC } from "react";
import "../../../App.css";

type Props = {
	number: number;
	selected: boolean;
};

export const CompleteBadge: VFC<Props> = memo((props) => {
	const { number, selected } = props;
	const [anime, setAnime] = useState<string>();

	useEffect(() => {
		if (selected) {
			setAnime("showBadge");
		} else if (!selected) {
			setAnime("");
		}
	}, [selected]);
	return (
		<Center
			className={anime}
			w="40px"
			h="40px"
			backgroundColor={selected ? "" : "inherit"}
			borderRadius="50%"
		>
			<Text className="showNumber" color={selected ? "" : "originBlack"}>
				{number}
			</Text>
		</Center>
	);
});
