import { Select } from "@thisbeyond/solid-select";
import { createGroupedOptions } from "../utilities/createGroupedOptions";
import { groupByArea } from "../utilities/groupByArea";
import Search from "../assets/search";

export default function Options(props) {
    return (
        <div class="flex gap-2 text-primary bg-background px-2 border mx-6 rounded border-primary/20">
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
            <button onclick={props.submitGuess}>
                <Search />
            </button>
        </div>
    );
}
