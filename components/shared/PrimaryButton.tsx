import styled, { css } from "styled-components";
import Button, { ButtonProps } from "./Button";

const PrimaryButtonWrapper = styled.div`
 ${({ theme }) => css`
 button {
    background-color: ${ theme.button.primaryBg };
    color: ${theme.button.primaryText};
    padding: 1em;
    transition: background-color 200ms;

      &:hover {
        background-color: ${theme.button.primaryHoverBg}
      }
}
  `}

`;

const PrimaryButton = ({ ...props }: ButtonProps) => (
  <PrimaryButtonWrapper>
    <Button {...props} />
  </PrimaryButtonWrapper>
);

export default PrimaryButton;
export { PrimaryButtonWrapper };