import { defineStore } from "pinia";
import { reactive } from "vue";

export const useStore = defineStore("testStore", {
  state: () => {
    return {
      //counter: 0,
      direct_counter: 0,
      patch_counter: 0,
    };
  },
});

export const subscribeCounter = reactive({
  direct: 0,
  patch: 0,
});

export function initStore() {
  const store = useStore();
  store.$subscribe((mutation, state) => {
    console.log("mutation: %o", mutation);
    if (mutation.type === "direct") {
      subscribeCounter.direct++;
    }
    if (mutation.type === "patch object") {
      subscribeCounter.patch++;
    }
  });
}
export function testStore(useDirect = true, usePatch = true) {
  const store = useStore();
  if (useDirect) {
    store.direct_counter++;
  }
  if (usePatch) {
    store.$patch({ patch_counter: store.patch_counter + 1 });
  }
}

export function resetStore() {
  const store = useStore();
  store.$reset();
  subscribeCounter.direct = 0;
  subscribeCounter.patch = 0;
}
