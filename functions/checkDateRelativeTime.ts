	// Function returs 0 if present, -1 if past and 1 if future
	export default function checkDateRelativeTime(stringDataToCheck: string): number {
		// Setting dates
		// Getting just date from both
		const dateToCheck = new Date(stringDataToCheck);
		const dateNow = new Date(new Date().toDateString());

		// Setting time to 00:00
		dateToCheck.setHours(0, 0, 0, 0);
		dateNow.setHours(0, 0, 0, 0);

		// Past
		if (dateToCheck.getTime() < dateNow.getTime()) return -1;
		// Future
		else if (dateToCheck.getTime() > dateNow.getTime()) return 1;
		// Present
		else return 0;
	}