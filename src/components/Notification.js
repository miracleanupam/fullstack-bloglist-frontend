import React from 'react';

const Notification = ({ msg }) => {
  return (
    <div>
      {msg.text !== '' ? (
        <div className={msg.isError === true ? 'error' : 'success'}>
          <h2>{msg.text}</h2>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Notification;