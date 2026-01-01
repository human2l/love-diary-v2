import useWindowSize from "../hooks/useWindowSize";

const Background = ({ src }) => {
  const windowSize = useWindowSize("fixed");

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
        backgroundPosition: "center center",
        backgroundImage: `url(${src})`,
      }}
    ></div>
  );
};
export default Background;
