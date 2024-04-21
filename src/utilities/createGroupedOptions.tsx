import { Select, createOptions } from "@thisbeyond/solid-select";

interface Group {
    name: string;
    options: { label: string }[];
}

export const createGroupedOptions = (groups: Group[]) => {
    const values = groups.reduce((values, group) => {
        values.push(
            ...group.options.map((item) => ({ ...item, group: group.name }))
        );
        return values;
    }, []);

    const props = createOptions(values, { key: "label" });
    const originalOptions = props.options;

    props.options = (inputValue) => {
        const options = originalOptions(inputValue);

        const grouped = options.reduce((result, item) => {
            const group = item.value.group;
            if (!result.has(group)) result.set(group, []);
            result.get(group).push(item);
            return result;
        }, new Map());

        const groupedOptions = [];
        for (const [groupName, options] of grouped.entries()) {
            groupedOptions.push({
                label: <span class="text-sm uppercase">{groupName}</span>,
                value: groupName,
                disabled: true,
            });
            groupedOptions.push(...options);
        }

        return groupedOptions;
    };

    return props;
};
