import { useSelector } from "react-redux";

const isMobile = () => {
  // const mobileView = useSelector((state) => state.isMobile);
  const mobileView = useSelector((state) => state.store?.isMobile) || false;
  // const mobileView = false;
  return [mobileView];
};

export default isMobile;