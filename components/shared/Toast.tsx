import { DetailedHTMLProps, HTMLAttributes } from "react";
import styled from "styled-components";
import CloseIcon from '@/public/close_icon.svg';
import Image from "next/image";

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    onClose: () => void;
}

const Toast = ({ onClose, children }: Props) => {
  return (
    <StyledToast>
      {children}
      <button onClick={onClose}>
        <Image src={CloseIcon} alt="Close" style={{ filter: 'invert(1)' }} width={25} height={25} />
      </button>
    </StyledToast>
  );
};

const StyledToast = styled.div`
  background-color: black;
  color: white;
  position: absolute;
  left: 50px;
  bottom: 50px;
  display: flex;
  align-items: center;
  gap: 1em;
  padding: 1em;
`;

export default Toast;