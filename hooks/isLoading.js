import { useSelector } from "react-redux";

const isLoading = () => {
  // const mobileView = useSelector((state) => state.isMobile);
  const loading = useSelector((state) => state.store?.isLoading) || false;
  // const mobileView = false;
  return [loading];
};

export default isLoading;