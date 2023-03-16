import { DetailedHTMLProps, HTMLAttributes, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import CloseIcon from '@/public/close_icon.svg';
import Image from "next/image";

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    onClose: () => void;
    autoCloseTime?: number;
}

const Toast = ({ onClose, autoCloseTime = 2000, children }: Props) => {
  useEffect(() => {
    const timeout = setTimeout(onClose, autoCloseTime);
    return () => clearTimeout(timeout);
  }, [onClose, autoCloseTime]);

  return (
    <StyledToast autoCloseTime={autoCloseTime}>
      {children}
      <button onClick={onClose}>
        <Image src={CloseIcon} alt="Close" style={{ filter: 'invert(1)' }} width={25} height={25} />
      </button>
    </StyledToast>
  );
};

const fadeOut = keyframes`
  75% { opacity: 1; bottom: 50px; }
  100% { opacity: 0; bottom: 40px; }
`;

const StyledToast = styled.div<{autoCloseTime: number}>`
  background-color: black;
  color: white;
  position: absolute;
  left: 50px;
  bottom: 50px;
  display: flex;
  align-items: center;
  gap: 1em;
  padding: 1em;
  animation: ${fadeOut} ${props => props.autoCloseTime}ms;
`;

export default Toast;