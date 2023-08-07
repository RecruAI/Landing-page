export default function SortAndCompareLists(listA: DataListType, listB: DataListType) {
	const dateA = new Date(listA.date_created);
	const dateB = new Date(listB.date_created);

	if (dateB.getTime() > dateA.getTime()) return 1;
	else if (dateB.getTime() < dateA.getTime()) return -1;
	else return listB.name < listA.name ? 1 : -1;
}
