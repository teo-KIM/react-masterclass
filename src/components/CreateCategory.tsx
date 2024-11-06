import { useRecoilState, useSetRecoilState } from "recoil";
import { categoryState, currentCategoryState } from "../atoms";
import { useForm } from "react-hook-form";

interface IForm {
  category: string;
}

function CreateCategory() {
  const setCategory = useSetRecoilState(categoryState);
  const [currentCategory, setCurrentCategory] =
    useRecoilState(currentCategoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ category }: IForm) => {
    // category 추가
    // 단 기존에 있는 category와 중복되는 경우 추가하지 않음
    setCategory((prev) => {
      if (prev.find((item) => item === category)) {
        return prev;
      }
      return [category, ...prev];
    });

    // 현재 선택된 category가 없을 경우 추가한 category를 선택
    if (!currentCategory) {
      setCurrentCategory(category);
    }

    setValue("category", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("category", {
          required: "새로운 카테고리를 입력해 주세요",
        })}
        placeholder="Add a new category"
      ></input>
      <button type="submit">Add</button>
    </form>
  );
}
export default CreateCategory;
