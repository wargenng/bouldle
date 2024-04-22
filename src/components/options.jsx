import { Select } from "@thisbeyond/solid-select";
import { createGroupedOptions } from "../utilities/createGroupedOptions";
import { groupByArea } from "../utilities/groupByArea";

export default function Options(props) {
    return (
        <div class="flex gap-2 text-primary bg-background px-6">
            <Select
                class="custom h-12 w-full"
                {...createGroupedOptions(
                    groupByArea(
                        props.climbData.climbs.map((climb) => {
                            climb.label = `${climb.route} ${climb.grade}`;
                            return climb;
                        })
                    )
                )}
                onChange={props.setCurrentGuess}
                placeholder="type a climb..."
                format={(item, type) =>
                    type === "option" ? item.label : item.route
                }
            />
            <button
                class="bg-slate-500 text-white py-3 px-4 rounded-lg text-sm font-bold"
                onclick={props.submitGuess}
            >
                enter
            </button>
        </div>
    );
}
