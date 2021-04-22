import { ChangeEvent, memo, useState, VFC } from "react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  focusBorderColor?: string;
};

export const Password: VFC<Props> = memo((props) => {
  const { value, onChange, placeholder, focusBorderColor="blue.500" } = props;
  const [ show, setShow ] = useState(false);
  const onClickShow = () => setShow(!show);

  return (
    <>
      <InputGroup>
        <Input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          focusBorderColor={focusBorderColor}
          variant="flushed"
        />
        <InputRightElement>
          { show ?
              <ViewOffIcon onClick={onClickShow} data-testid="view-officon" /> :
              <ViewIcon onClick={onClickShow} data-testid="view-icon" />
          }
        </InputRightElement>
      </InputGroup>
    </>
  );
});
