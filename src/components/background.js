import useFilestack from "../hooks/useFilestack";
import useWindowSize from "../hooks/useWindowSize";

const Background = ({ imgId, defaultImgId }) => {
  const { getBackgroundImgUrl } = useFilestack();
  const windowSize = useWindowSize("fixed");

  //use fixed size imgSrc base on window size
  const imgSrc =
    getBackgroundImgUrl(imgId, windowSize.height, windowSize.width) ??
    getBackgroundImgUrl(defaultImgId, windowSize.height, windowSize.width);

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
    >
      {console.log(imgSrc)}
    </div>
  );
};
export default Background;
