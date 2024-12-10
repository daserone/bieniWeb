import { useCallback } from "react";
import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useToast = () => {
  const showToast = useCallback((message: string, options?: ToastOptions) => {
    toast(message, options);
  }, []);

  const showToastError = useCallback((message: string) => {
    toast.error(message);
  }, []);

  const showToastSuccess = useCallback((message: string) => {
    toast.success(message);
  }, []);

  return { showToast, showToastError, showToastSuccess };
};

export default useToast;
