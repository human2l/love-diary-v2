import Zoom from "@mui/material/Zoom";

const GlassRoundContainer = (props) => {
  return (
    <Zoom in timeout={500}>
      <div
        style={{
          borderRadius: 20,
          background: `rgba(255,255,255,0.8)`,
          backdropFilter: "blur(1px)",
          boxShadow: "10px 10px 10px rgba(30,30,30,0.5)",
        }}
      >
        {props.children}
      </div>
    </Zoom>
  );
};

export default GlassRoundContainer;
