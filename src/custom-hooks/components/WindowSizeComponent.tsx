import useWindowSize from '../hooks/useWindowSize';

const WindowSizeComponent = () => {
  const { size } = useWindowSize();
  return (
    <div>
      {size.width} x {size.height}
    </div>
  );
};

export default WindowSizeComponent;
