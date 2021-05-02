import { memo, VFC } from "react";

import { DefaultSelect } from "../../atoms/input/DefaultSelect";
import { CustomizeSelect } from "../../../types/molecules/customizeSelect";

export const SelectCategory: VFC<CustomizeSelect> = memo((props) => {
  const { selectedValue = "", onChange, onBlur = () => {} } = props;
  const categoryOption = [
    { value: "米" },
    { value: "パン" },
    { value: "麺" },
    { value: "いも" },
    { value: "大豆" },
    { value: "肉" },
    { value: "魚介" },
    { value: "卵" },
    { value: "淡色野菜" },
    { value: "緑黄色野菜" },
    { value: "フルーツ" },
    { value: "海藻" },
    { value: "乳製品" },
    { value: "調味料" },
    { value: "飲み物" },
    { value: "お菓子" },
    { value: "お酒" },
    { value: "料理" },
  ];
  return (
    <DefaultSelect
      selectedValue={selectedValue}
      optionList={categoryOption}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
});
