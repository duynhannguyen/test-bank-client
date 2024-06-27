import { createContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const StoreContext = createContext();

const MyStoreContext = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [contextError, setContextError] = useState(null);
  const [changPage, setChangePage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const value = {
    loading,
    setLoading,
    contextError,
    setContextError,
    changPage,
    setChangePage,
    navigate,
    dispatch
  };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export default MyStoreContext;
