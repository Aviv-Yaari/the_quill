import LoadingSpinner from '@/assets/loading_spinner.svg';
import Image from 'next/image';

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    isBusy?: boolean;
}

const Button = ({ isBusy, children }: Props) => {
  return (
    <button disabled={isBusy}>
      {isBusy ? <Image src={LoadingSpinner} alt="Loading" /> : children}
    </button>
  );
};

export default Button;
export type { Props as ButtonProps };