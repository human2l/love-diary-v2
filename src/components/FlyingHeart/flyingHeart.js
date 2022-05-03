import "./flyingHeart.css";

const FlyingHeart = () => {
  return (
    <div className="heart-box">
      <div className="heart animate-topright"></div>
      <div className="heart animate-bottomright"></div>
      <div className="heart animate-topleft"></div>
      <div className="heart animate-bottomleft"></div>
      <div className="heart animate-up"></div>
      <div className="heart animate-down"></div>
      <div className="heart animate-left"></div>
      <div className="heart animate-right"></div>
    </div>
  );
};
export default FlyingHeart;
