import checkDateRelativeTime from "./checkDateRelativeTime";

// Function returns formatted date text
export default function returnDateTileText(stringDataToCheck: string): string {
    // Setting times
    var taskData = new Date(stringDataToCheck);

    // Setting time var
    const dateTime = checkDateRelativeTime(stringDataToCheck);

    // If dateTime equals 0 return "Today"
    if (dateTime == 0) return "Today";

    // Declaring months names
    const monthsNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    // Setting tommorows and yeasterdays date
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const tommorow = new Date();
    tommorow.setDate(tommorow.getDate() + 1);

    // Checking if date is tommorows or yeasterdays
    const isYesterday = yesterday.toDateString() === taskData.toDateString();
    const isTommorow = tommorow.toDateString() === taskData.toDateString();

    if (dateTime == -1) {
        // If isYesterday equals true, return "Yesterday"
        // Else return date
        if (isYesterday) return "Yesterday";
        else return taskData.getDate() + " " + monthsNames[taskData.getMonth()];
    } else if (dateTime == 1) {
        // If isTommorows equals true, return "Tommorow"
        // Else return date
        if (isTommorow) return "Tommorow";
        else return taskData.getDate() + " " + monthsNames[taskData.getMonth()];
    }
    // If dateTime is undefined return error
    else return "Error";
}