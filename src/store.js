import { defineStore } from "pinia";

export const useStore = defineStore("testStore", {
  state: () => {
    return {
      counter: 0,
      direct_counter: 0,
      patch_counter: 0,
    };
  },
});

export function initStore() {
  const store = useStore();

  store.$subscribe((mutation, state) => {
    console.log("mutation: %o", mutation);
    if (mutation.type === "direct" && mutation.events.key === "counter") {
      state.direct_counter++;
    }
    if (mutation.type === "patch object" && mutation.payload.counter) {
      state.patch_counter++;
    }
  });
}
export function testStore(useDirect = true, usePatch = true) {
  const store = useStore();

  if (useDirect) {
    store.counter++;
  }
  if (usePatch) {
    store.$patch({ counter: store.counter + 1 });
  }
}
