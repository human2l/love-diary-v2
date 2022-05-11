import useSound from "use-sound";
import gaoBaiQiQiuSrc from "../assets/sounds/gaoBaiQiQiu.mp3";
import reAi105Src from "../assets/sounds/reAi105.mp3";
import wanYouYinLiSrc from "../assets/sounds/wanYouYinLi.mp3";
import xueMaoJiaoSrc from "../assets/sounds/xueMaoJiao.mp3";
import youDianTianSrc from "../assets/sounds/youDianTian.mp3";

const musicList = [
  {
    name: "告白气球",
    src: gaoBaiQiQiuSrc,
  },
  {
    name: "学猫叫",
    src: xueMaoJiaoSrc,
  },
  {
    name: "热爱105度的你",
    src: reAi105Src,
  },
  {
    name: "万有引力",
    src: wanYouYinLiSrc,
  },
  {
    name: "有点甜",
    src: youDianTianSrc,
  },
];

const useSoundLibrary = (musicName) => {
  const foundMusic = musicList.find((music) => {
    return music.name === musicName;
  });

  const musicControl = useSound(foundMusic.src, {
    volume: 0.5,
    interrupt: true,
  });

  return { musicList, musicControl };
};
export default useSoundLibrary;
