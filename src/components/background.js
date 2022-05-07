import { useContext } from "react";
import { settingsContext } from "../app";
import useFilestack from "../hooks/useFilestack";

const Background = (props) => {
  const { appSettings } = useContext(settingsContext);

  const { getBackgroundImgUrl } = useFilestack();

  const imgUrl =
    getBackgroundImgUrl(
      appSettings.backgroundImage,
      window.innerHeight,
      window.innerWidth
    ) ??
    getBackgroundImgUrl(
      appSettings.defaultBackgroundImage,
      window.innerHeight,
      window.innerWidth
    );

  const imgSrc = `url(${imgUrl})`;

  return (
    <div
      style={{
        position: "fixed",
        height: "100%",
        width: "100%",
        backgroundSize: "cover",
        backgroundImage: `${imgSrc}`,
      }}
    >
      {props.children}
    </div>
  );
};
export default Background;
