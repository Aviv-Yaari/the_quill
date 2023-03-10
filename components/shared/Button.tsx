import LoadingSpinner from '@/public/loading_spinner.svg';
import Image from 'next/image';

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    isBusy?: boolean;
    isActive?: boolean;
}

const Button = ({ isBusy, children, ...props }: Props) => {
  return (
    <button disabled={isBusy} {...props}>
      {isBusy ? <Image src={LoadingSpinner} width={16} height={16} alt="Loading" /> : children}
    </button>
  );
};

export default Button;
export type { Props as ButtonProps };