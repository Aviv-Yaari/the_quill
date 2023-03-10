import { TagLabelAndValue } from "@/types/Tag";
import Select from "react-select";
import styled from "styled-components";

interface Props {
    options: TagLabelAndValue[];
    onChange: (selected: readonly TagLabelAndValue[]) => any;
    value?: TagLabelAndValue[];
}

const TagSelect = ({ options, onChange, value }: Props) => {  
  return (
    <Container>
      <Select 
        options={options} 
        isMulti  
        classNames={{ control: (state) => 'input-select' + (state.isFocused ? ' focused' : '') }}
        onChange={onChange}
        value={value}
      />
    </Container>
  );
};

const Container = styled.div`
  .input-select {
    border: 1px dashed ${({ theme }) => theme.border.primary};
    border-radius: 0;
    box-shadow: none;
    transition: border-color 200ms;

    &:hover, &.focused {
      border: 1px dashed black; 
    }
  }
`;

export default TagSelect;