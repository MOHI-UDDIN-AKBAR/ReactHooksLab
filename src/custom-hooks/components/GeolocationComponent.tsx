import useGeolocation from '../hooks/useGeolocation';

export type GeolocationOptions = {
  enableHighAccuracy: boolean;
  timeout: number;
  maximumAge: number;
};

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
};

const GeolocationComponent = () => {
  const { isLoading, error, data } = useGeolocation(geolocationOptions);
  console.log(data);
  return (
    <div className="geo-location">
      <div className="status">
        <p className="loader">isLoading : {isLoading.toString()}</p>
        {error && <p className="error-message">{error}</p>}
      </div>
      <div className="location">
        {data?.latitude} x {data?.longitude}
      </div>
    </div>
  );
};

export default GeolocationComponent;
