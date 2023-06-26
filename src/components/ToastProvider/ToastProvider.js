import React from 'react';

import useKeyDown from '../../hooks/use-keydown';

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

  const handleEscape = React.useCallback(() => {
    setToasts([]);
  }, []);

  useKeyDown('Escape', handleEscape);

  return (
    <ToastContext.Provider
      value={{ toasts, setToasts, handleCreateToast, handleDeleteToast }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
