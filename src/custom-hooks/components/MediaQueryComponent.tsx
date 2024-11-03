import useMediaQuery from '../hooks/useMediaQuery';

const MediaQueryComponent = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return <div>isSmallScreen : {isSmallScreen.toString()}</div>;
};

export default MediaQueryComponent;
