import { atom, selector } from "recoil";

export interface IToDo {
  id: number;
  text: string;
  category: string;
  isDone?: boolean;
}

export const currentCategoryState = atom<string>({
  key: "currentCategory",
  default: "",
});

export const categoryState = atom<string[]>({
  key: "category",
  default: localStorage.getItem("category")
    ? JSON.parse(localStorage.getItem("category")!)
    : [],
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newCategories) => {
        localStorage.setItem("category", JSON.stringify(newCategories));
      });
    },
  ],
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: localStorage.getItem("toDo")
    ? JSON.parse(localStorage.getItem("toDo")!)
    : [],
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newToDos) => {
        localStorage.setItem("toDo", JSON.stringify(newToDos));
      });
    },
  ],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(currentCategoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
