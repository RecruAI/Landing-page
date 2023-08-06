export default function SortAndCompareDos(doA: DataDoType, doB: DataDoType)  {
    if (doB.done == doA.done) {
        if (doB.due_date < doA.due_date) return 1;
        else if (doB.due_date > doA.due_date) return -1;
        else return doB.name < doA.name ? 1 : -1;
    }
    else if (!doB.done && doA.done) return 1;
    else if (doB.done && !doA.done) return -1;
    else return 0;
}