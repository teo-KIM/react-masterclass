import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  categoryState,
  currentCategoryState,
  IToDo,
  toDoState,
} from "../atoms";

function ToDo({ id, text, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoryState);
  const currentCategory = useRecoilValue(currentCategoryState);

  const onClick = (newCategory: IToDo["category"]) => {
    setToDos((prev) => {
      return prev.map((toDo) => {
        if (toDo.id === id) {
          return { ...toDo, category: newCategory };
        }
        return toDo;
      });
    });
  };

  const handleDelete = () => {
    setToDos((prev) => prev.filter((toDo) => toDo.id !== id));
  };

  return (
    <li>
      <div>
        <span>{text}</span>
        {categories.length !== 0 &&
          categories.map((category) => {
            if (currentCategory === category) {
              return null;
            }
            return (
              <button key={category} onClick={() => onClick(category)}>
                {category}
              </button>
            );
          })}

        <button onClick={handleDelete}>Delete</button>
      </div>
    </li>
  );
}

export default ToDo;
