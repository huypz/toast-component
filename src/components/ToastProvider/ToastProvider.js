import React from 'react';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  function handleCreateToast(event, message, variant) {
    event.preventDefault();

    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      },
    ];

    setToasts(nextToasts);
  }

  function handleDeleteToast(event, id) {
    event.preventDefault();

    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });

    setToasts(nextToasts);
  }

  return (
    <ToastContext.Provider
      value={{ toasts, handleCreateToast, handleDeleteToast }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
