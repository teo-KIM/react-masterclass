import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, currentCategoryState } from "../atoms";
import { useEffect } from "react";

function SelectCategory() {
  const [currentCategory, setCurrentCategory] =
    useRecoilState(currentCategoryState);
  const categories = useRecoilValue<string[]>(categoryState);

  const onInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.currentTarget.value);
    setCurrentCategory(e.currentTarget.value);
  };

  useEffect(() => {
    if (categories.length !== 0) {
      setCurrentCategory(categories[0]);
    }
  }, [categories, setCurrentCategory]);

  return (
    <>
      {categories.length !== 0 ? (
        <select onInput={onInput} value={currentCategory}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      ) : (
        <span>No category</span>
      )}
    </>
  );
}
export default SelectCategory;
