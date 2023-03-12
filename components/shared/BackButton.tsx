import { useRouter } from "next/router";
import LinkButton from "./LinkButton";

interface Props {
    href?: string;
}

const BackButton = ({ href }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    href ? router.push(href) : router.push('/');
  };
  
  return (
    <LinkButton onClick={handleClick}>
      ← Back
    </LinkButton>
  );
};

export default BackButton;