import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
    href?: string;
}

const BackButton = ({ href }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    href ? router.push(href) : router.back();
  };
  
  return (
    <button onClick={handleClick}>
      ← Back
    </button>
  );
};

export default BackButton;