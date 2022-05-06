import zeroPng from "../assets/images/number/0.png";
import onePng from "../assets/images/number/1.png";
import twoPng from "../assets/images/number/2.png";
import threePng from "../assets/images/number/3.png";
import fourPng from "../assets/images/number/4.png";
import fivePng from "../assets/images/number/5.png";
import sixPng from "../assets/images/number/6.png";
import sevenPng from "../assets/images/number/7.png";
import eightPng from "../assets/images/number/8.png";
import ninePng from "../assets/images/number/9.png";

const pngArray = [
  zeroPng,
  onePng,
  twoPng,
  threePng,
  fourPng,
  fivePng,
  sixPng,
  sevenPng,
  eightPng,
  ninePng,
];

const CartoonNumbers = ({ numberString }) => {
  const numbersArray = numberString.split("");
  return (
    <div>
      {numbersArray.map((number, index) => {
        return (
          <img
            key={`cartoonNumber-${number}-${index}`}
            src={pngArray[Number(number)]}
            alt={number}
            style={{ maxHeight: 60, aspectRatio: "1/1" }}
          />
        );
      })}
    </div>
  );
};
export default CartoonNumbers;
