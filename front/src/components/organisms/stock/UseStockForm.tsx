import { ChangeEvent, memo, useState, VFC } from "react";

import { useCommonValidate } from "../../../hooks/validate/useCommonValidate";
import { useStockValidate } from "../../../hooks/validate/useStockValidate";

import { InputName } from "../input/common/InputName";
import { SelectFoodCategory } from "../input/common/SelectFoodCategory";
import { InputLimit } from "../input/stock/InputLimit";
import { InputQuantity } from "../input/stock/InputQuantity";
import { SelectFoodLocation } from "../input/stock/SelectFoodLocation";
import { InputNote } from "../input/common/InputNote";

type Props = {
  useType: string;
}

export const UseStockForm: VFC<Props> = memo((props) => {
  const { useType } = props;
  const {
    validateName,
    validateFoodCategory,
    validateNote,
  } = useCommonValidate();
  const { validateLimit } = useStockValidate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");

  const [nameInvalid, setNameInvalid] = useState(false);
  const [categoryInvalid, setCategoryInvalid] = useState(false);
  const [limitInvalid, setLimitInvalid] = useState(false);
  const [noteInvalid, setNoteInvalid] = useState(false);

  const [nameError, setNameError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [limitError, setLimitError] = useState("");
  const [noteError, setNoteError] = useState("");

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) =>
    setCategory(e.target.value);

  const onChangeLimit = (e: ChangeEvent<HTMLInputElement>) =>
    setLimit(e.target.value);

  const onChangeLocation = (e: ChangeEvent<HTMLSelectElement>) =>
    setLocation(e.target.value);

  const onChangeNote = (e: ChangeEvent<HTMLInputElement>) =>
    setNote(e.target.value);

  const onBlurName = () => {
    const { invalid, errorMsg } = validateName(name);
    setNameInvalid(invalid);
    setNameError(errorMsg);
  };

  const onBlurCategory = () => {
    const { invalid, errorMsg } = validateFoodCategory(category);
    setCategoryInvalid(invalid);
    setCategoryError(errorMsg);
  };

  const onBlurLimit = () => {
    const { invalid, errorMsg } = validateLimit(limit);
    setLimitInvalid(invalid);
    setLimitError(errorMsg);
  };

  const onBlurNote = () => {
    const { invalid, errorMsg } = validateNote(note);
    setNoteInvalid(invalid);
    setNoteError(errorMsg);
  };

  return (
    <>
      {useType === "料理" ? (
        <>
          <InputName
            name={name}
            onChange={onChangeName}
            invalid={nameInvalid}
            error={nameError}
            onBlur={onBlurName}
          />

          <SelectFoodCategory
            category={category}
            onChange={onChangeCategory}
            invalid={categoryInvalid}
            error={categoryError}
            onBlur={onBlurCategory}
          />

          <InputLimit
            limit={limit}
            onChange={onChangeLimit}
            invalid={limitInvalid}
            error={limitError}
            onBlur={onBlurLimit}
          />

          <InputQuantity
            quantity={quantity}
            onChange={setQuantity}
          />

          <SelectFoodLocation
            location={location}
            onChange={onChangeLocation}
          />
        </>
      ) : (
        <div />
      )}
      <InputNote
        note={note}
        onChange={onChangeNote}
        invalid={noteInvalid}
        error={noteError}
        onBlur={onBlurNote}
      />
    </>
  );
});
