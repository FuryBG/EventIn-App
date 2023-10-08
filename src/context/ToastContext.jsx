import React, { useContext, useRef } from 'react'
import { Toast } from 'primereact/toast';
const ToastContext = React.createContext();

export function usetToastConext() {
  return useContext(ToastContext);
}

export default function ToastContextProvider({ children }) {
    const toasterRef = useRef(null);

    function setToaster(value) {
        toasterRef.current.show({ ...value, life: 3000 });
    }

  return (
    <ToastContext.Provider value={{ setToaster }}>
        <Toast ref={toasterRef} position='top-center'></Toast>
      {children}
    </ToastContext.Provider>
  )
}
