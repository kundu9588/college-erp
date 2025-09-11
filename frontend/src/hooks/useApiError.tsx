import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { clearError } from '../features/auth/actions';

export const useApiError = () => {
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.auth.error);

  const clearApiError = () => {
    dispatch(clearError());
  };

  return { error, clearApiError };
};