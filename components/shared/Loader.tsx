import LoadingSpinner from '@/public/loading_spinner.svg';
import Image from 'next/image';
import styled from 'styled-components';

const Loader = () => {
  return (
    <Container>
      <Image style={{ filter: 'invert(1)' }} src={LoadingSpinner} alt="Loading" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Loader;