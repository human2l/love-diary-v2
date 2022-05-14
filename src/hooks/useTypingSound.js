import useSound from "use-sound";
import typing1Mp3 from "../assets/sounds/typing1.mp3";
import typing2Mp3 from "../assets/sounds/typing2.mp3";
import typing3Mp3 from "../assets/sounds/typing3.mp3";

const useTypingSound = () => {
  const [play1] = useSound(typing1Mp3, {
    volume: 0.5,
  });
  const [play2] = useSound(typing2Mp3, {
    volume: 0.5,
  });
  const [play3] = useSound(typing3Mp3, {
    volume: 0.5,
  });
  const soundsGroup = [play1, play2, play3];
  const playTypingSound = () => {
    soundsGroup[Math.floor(Math.random() * soundsGroup.length)]();
  };
  return [playTypingSound];
};
export default useTypingSound;
