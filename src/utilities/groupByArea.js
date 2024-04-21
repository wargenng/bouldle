export function groupByArea(json) {
    let groups = [];

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
