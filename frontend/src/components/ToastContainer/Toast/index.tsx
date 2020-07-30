import React, { useEffect } from 'react';
import { FiAlertCircle, FiInfo, FiCheckCircle, FiX } from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../hooks/toast';

import { Container } from './styles';

interface ToastProps {
  toast: ToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={25} />,
  error: <FiAlertCircle size={25} />,
  success: <FiCheckCircle size={25} />,
};

const Toast: React.FC<ToastProps> = ({ toast, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 3500);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, toast.id]);

  return (
    <Container
      type={toast.type}
      hasDescription={Number(!!toast.description)}
      style={style}
    >
      {icons[toast.type || 'info']}
      <div>
        <strong>{toast.title}</strong>
        <p>{toast.description}</p>
      </div>
      <button onClick={() => removeToast(toast.id)}>
        <FiX size={20} />
      </button>
    </Container>
  );
};

export default Toast;
