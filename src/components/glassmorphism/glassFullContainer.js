const GlassFullContainer = (props) => {
  return (
    <div
      style={{
        position: "fixed",
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        background: `rgba(255,255,255,0.3)`,
        // background: `rgba(0,0,0,0.5)`,
        // backdropFilter: "blur(1px)",
        boxShadow: "10px 10px 10px rgba(30,30,30,0.5)",
      }}
    >
      {props.children}
    </div>
  );
};
export default GlassFullContainer;
