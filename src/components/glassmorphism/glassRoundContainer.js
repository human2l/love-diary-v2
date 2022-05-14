const GlassRoundContainer = (props) => {
  return (
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
  );
};
export default GlassRoundContainer;
