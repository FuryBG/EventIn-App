import { usetToastConext } from "../context/ToastContext";
export const useToast = () => {
    const toastContext = usetToastConext();
    return toastContext.setToaster;
};