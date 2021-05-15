import { ChangeEvent, memo, useState, VFC } from "react";

import { DefaultInputForm } from "../DefaultInputForm";
import { FoodLocation } from "../../../molecules/select/FoodLocation";

type Props = {
  location: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectFoodLocation: VFC<Props> = memo((props) => {
  const { location, onChange } = props;

  return (
    <DefaultInputForm
      label="保管場所"
      require="optional"
    >
      <FoodLocation
        selectedValue={location}
        onChange={onChange}
      />
    </DefaultInputForm>
  );
});
