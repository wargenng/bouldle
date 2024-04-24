import { createSignal } from "solid-js";
import { blurAmountList } from "../../utilities/blurAmountList";
import Toolbar from "./components/toolbar";

const allowedGuesses = blurAmountList.length;

export default function Blurry(props) {
    const [showImage, setShowImage] = createSignal(true);
    const [isExpanded, setIsExpanded] = createSignal(false);
    return (
        <>
            <div class={`w-full items-center justify-center my-4 flex`}>
                <div
                    class={`pointer-events-none ${
                        showImage() && isExpanded()
                            ? "h-96"
                            : showImage()
                            ? "h-60"
                            : "h-0"
                    } ${
                        isExpanded() ? "w-96" : "w-60"
                    } flex items-center justify-center object-cover transition-all duration-500`}
                >
                    <div class='overflow-hidden shadow-lg'>
                        <img
                            class={`min-w-full ${
                                props.state !== "playing"
                                    ? "blur-[0px]"
                                    : blurAmountList[
                                          props.submittedGuessesLength
                                      ]
                            }`}
                            src={props.image}
                        />
                    </div>
                </div>
            </div>
            <Toolbar
                state={props.state}
                submittedGuessesLength={props.submittedGuessesLength}
                allowedGuesses={allowedGuesses}
                showImage={showImage()}
                setShowImage={setShowImage}
                setIsExpanded={setIsExpanded}
                isExpanded={isExpanded()}
            />
        </>
    );
}
