import { useEffect, useState } from 'react';
import { GeolocationOptions } from '../components/GeolocationComponent';

const useGeolocation = (options: GeolocationOptions) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState<GeolocationCoordinates | null>(null);

  useEffect(() => {
    const handleSuccess = (position: GeolocationPosition) => {
      setData(position.coords);
      setIsLoading(false);
    };
    const handleError = (error: GeolocationPositionError) => {
      setError(error.message);
      setIsLoading(false);
    };

    const clearId = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      options
    );

    return () => {
      navigator.geolocation.clearWatch(clearId);
    };
  }, [options]);

  return { isLoading, error, data };
};

export default useGeolocation;
