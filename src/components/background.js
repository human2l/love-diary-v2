import { useMemo } from "react";
import useFilestack from "../hooks/useFilestack";

const Background = ({ imgId, defaultImgId, onLoadMethod }) => {
  const { getBackgroundImgUrl } = useFilestack();
  const imgSrc = useMemo(
    () =>
      getBackgroundImgUrl(imgId, window.innerHeight, window.innerWidth) ??
      getBackgroundImgUrl(defaultImgId, window.innerHeight, window.innerWidth),
    [defaultImgId, getBackgroundImgUrl, imgId]
  );

  return (
    <div
      style={{
        top: 0,
        left: 0,
        position: "fixed",
        zIndex: -1,
        height: "100vh",
        width: "100vw",
        backgroundSize: "cover",
        backgroundImage: `url(${imgSrc})`,
      }}
    ></div>
  );
};
export default Background;
