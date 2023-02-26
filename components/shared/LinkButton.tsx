import styled from "styled-components";
import Button, { ButtonProps } from "./Button";

const LinkButtonWrapper = styled.div`
button {
  padding: 1em 0;
  &:hover {
    text-decoration: underline;
  }
}
`;

const LinkButton = ({ ...props }: ButtonProps) => (
  <LinkButtonWrapper>
    <Button {...props} />
  </LinkButtonWrapper>
);

export default LinkButton;
export { LinkButtonWrapper };