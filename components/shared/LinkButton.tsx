import styled from "styled-components";
import Button, { ButtonProps } from "./Button";

const LinkButtonWrapper = styled.div<{isActive?: boolean}>`
button {
  padding: 1em 0;
  ${({ isActive, theme }) => isActive && `color: ${theme.text.link};`}
  &:hover {
    text-decoration: underline;
  }
}
`;

const LinkButton = ({ ...props }: ButtonProps) => (
  <LinkButtonWrapper isActive={props.isActive}>
    <Button {...props} />
  </LinkButtonWrapper>
);

export default LinkButton;
export { LinkButtonWrapper };