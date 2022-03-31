import { Button } from "@chakra-ui/button";
import { memo, useCallback, VFC } from "react";
import { useHistory } from "react-router";

type Props = {
	text: string;
	path: string;
	size?: string;
	base?: string;
};

export const SearchButton: VFC<Props> = memo((props) => {
	const { text, path, size, base } = props;
	const history = useHistory();

	const onClickHistory = useCallback(() => {
		history.push(path);
	}, [history, path]);

	return (
		<Button
			variant={base || "base"}
			size={size && `${size}`}
			onClick={onClickHistory}
		>
			{text}
		</Button>
	);
});
