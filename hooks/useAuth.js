import { useSelector } from "react-redux";

const useAuth = () => {
  const auth = useSelector((state) => state?.profile?.auth);
  return [auth];
};

export default useAuth;