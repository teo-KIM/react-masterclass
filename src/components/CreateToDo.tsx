import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, currentCategoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const currentCategory = useRecoilValue(currentCategoryState);

  const handleValid = ({ toDo }: IForm) => {
    if (categories.length === 0) {
      alert("카테고리를 먼저 추가해 주세요");
      return;
    }

    if (!currentCategory) {
      alert("카테고리를 선택해 주세요");
      return;
    }

    console.log(toDo);
    setToDos((prev) => [
      {
        id: Date.now(),
        text: toDo,
        category: currentCategory,
      },
      ...prev,
    ]);
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", { required: "todo를 입력해 주세요" })}
        placeholder="Add a new task"
      ></input>
      <button type="submit">Add</button>
    </form>
  );
}

export default CreateToDo;
