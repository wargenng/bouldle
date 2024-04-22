import grades from "../../scripts/grades";

export function groupByArea(json) {
    let groups = [];
    json.sort(
        (a, b) =>
            grades.grades.indexOf(a.grade) - grades.grades.indexOf(b.grade)
    );

    json.forEach((climb) => {
        if (!groups.map((group) => group.name).includes(climb.area)) {
            const area = { name: climb.area, options: [] };
            groups.push(area);
        }
        groups[
            groups.map((group) => group.name).indexOf(climb.area)
        ].options.push(climb);
    });

    return groups;
}
