import { Select } from "@thisbeyond/solid-select";
import { createGroupedOptions } from "../utilities/createGroupedOptions";
import { groupByArea } from "../utilities/groupByArea";

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
                <svg
                    fill="currentColor"
                    stroke-width="0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    height="1.6rem"
                    width="1.6rem"
                    style="overflow: visible; color: currentcolor;"
                >
                    <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
                    <path d="M11.412 8.586c.379.38.588.882.588 1.414h2a3.977 3.977 0 0 0-1.174-2.828c-1.514-1.512-4.139-1.512-5.652 0l1.412 1.416c.76-.758 2.07-.756 2.826-.002z"></path>
                </svg>
            </button>
        </div>
    );
}
