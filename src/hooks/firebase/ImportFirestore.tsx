import {
	collection,
	doc,
	getDocs,
	limit,
	query,
	setDoc,
	updateDoc,
	where,
} from "firebase/firestore";
import { useCallback } from "react";
// import insertData from "../data/price/data.json";
// import testData from "../firebase/data/test.json";
import { db } from "../../firebase";

export const ImportFirestore = () => {
	// const importData = useCallback(async () => {
	// 	const createData: any = insertData;
	// 	for (const data in createData) {
	// 		const formatData: any = {};
	// 		for (const secData in createData[data]) {
	// 			formatData[secData] = createData[data][secData];
	// 		}
	// 		const docRef = doc(db, "parts", "parts", "parts_four", data);
	// 		await setDoc(docRef, formatData)
	// 			.then((res) => {
	// 				console.log(res);
	// 			})
	// 			.catch((err) => {
	// 				console.log(err);
	// 			});
	// 	}
	// 	console.log("end");
	// }, []);
	// const updateData = useCallback(async () => {
	// 	const readData = await getDocs(collection(db, "prices", "tokyo", "time"));
	// 	//つぎはtimeから
	// 	readData.forEach(async (snap) => {
	// 		const data = snap.data();
	// 		if (!data.gender.length) {
	// 			const newGender = data.gender === 3 ? [1, 2] : [data.gender];
	// 			const updateData = await updateDoc(
	// 				doc(db, "prices", "tokyo", "time", snap.id),
	// 				{
	// 					gender: newGender,
	// 				}
	// 			);
	// 		}
	// 	});
	// 	console.log("next");
	// }, []);
	// return {
	// 	// importData,
	// 	updateData,
	// };
};

// ボタン設定の定型文
// const {importData} = ImportFirestore();

// const importFunc = useCallback(async() => {
// 	await importData();
// },[importData])

// <Button bg={"red"} onClick={importFunc}>import</Button>

// const updateFunc = useCallback(async () => {
// 	await updateData();
// }, [updateData]);
