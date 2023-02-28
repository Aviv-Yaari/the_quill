import { useAppDispatch, useAppSelector } from "@/store";
import { resetError, selectError } from "@/store/slices/app.slice";
import Toast from "./shared/Toast";

const AppError = () => {
  const appError = useAppSelector(selectError);
  const dispatch = useAppDispatch();
  
  const resetAppError = () => {
    dispatch(resetError());
  };

  if (!appError) {
    return <></>;
  }

  return (
    <Toast onClose={resetAppError}>{appError}</Toast>
  );
};

export default AppError;