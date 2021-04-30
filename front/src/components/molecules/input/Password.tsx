import { ChangeEvent, memo, useState, VFC } from "react";
import { IconButton, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { DefaultInput } from "../../atoms/input/DefaultInput";

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  focusBorderColor?: string;
};

export const Password: VFC<Props> = memo((props) => {
  const { value, onChange, placeholder = "パスワード", focusBorderColor = "#7FDC96" } = props;
  const [show, setShow] = useState(false);
  const onClickShow = () => setShow(!show);

  return (
    <>
      <InputGroup>
        <DefaultInput
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          focusBorderColor={focusBorderColor}
        />
        <InputRightElement>
          { show
            ? (
              <IconButton
                data-testid="view-officon"
                aria-label="Show password"
                bg="transparent"
                tabIndex={-1}
                onClick={onClickShow}
                icon={<ViewOffIcon />}
              />
            )
            : (
              <IconButton
                data-testid="view-icon"
                aria-label="Not Show password"
                bg="transparent"
                tabIndex={-1}
                onClick={onClickShow}
                icon={<ViewIcon />}
              />
            ) }
        </InputRightElement>
      </InputGroup>
    </>
  );
});
