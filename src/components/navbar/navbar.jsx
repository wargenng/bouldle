import Theme from "./components/theme";
import Info from "../../assets/info";

export default function NavBar(props) {
    return (
        <navbar class="w-full flex border-b border-primary/20 mb-6 bg-background">
            <div class="p-4 flex w-full">
                <h1 class="text-2xl font-bold">bouldle.</h1>
                <div class="grow" />
                <Theme />
                <button
                    onclick={() => {
                        props.setShowDialog(true);
                    }}
                >
                    <Info />
                </button>
            </div>
        </navbar>
    );
}
