import { createEffect, createSignal } from "solid-js";

export default function createPersisted<T>(
    localStorageKey: string,
    defaultValue: T,
) {
    const storedVal = localStorage[localStorageKey];
    const [value, setValue] = createSignal(
        storedVal ? (JSON.parse(storedVal) as T) : defaultValue,
    );

    createEffect(() => {
        localStorage[localStorageKey] = JSON.stringify(value());
    });

    return [value, setValue];
}
