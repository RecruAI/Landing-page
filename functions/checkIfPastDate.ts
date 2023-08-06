	// Function check if date if past relative to current date
export default function checkIfPastDate(date: string): boolean {
		// Setting dates
		// Getting just date from both
		const dateToCheck = new Date(date);
		const dateNow = new Date(new Date().toDateString());

		// Setting time to 00:00
		dateToCheck.setHours(0, 0, 0, 0);
		dateNow.setHours(0, 0, 0, 0);

		return dateToCheck.getTime() < dateNow.getTime();
	}