import useOnlineStatus from '../hooks/useOnlineStatus';

const OnlineStatusComponent = () => {
  const status = useOnlineStatus();

  return (
    <div className="online-status-container">
      <p className="status">{status ? 'online' : 'offline'}</p>
    </div>
  );
};

export default OnlineStatusComponent;
