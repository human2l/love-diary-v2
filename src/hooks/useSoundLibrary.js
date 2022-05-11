import useSound from "use-sound";
import gaoBaiQiQiuSrc from "../assets/sounds/gaoBaiQiQiu.mp3";
import xueMaoJiaoSrc from "../assets/sounds/xueMaoJiao.mp3";

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
    name: "学猫叫",
    src: xueMaoJiaoSrc,
  },
  {
    name: "学猫叫",
    src: xueMaoJiaoSrc,
  },
  {
    name: "学猫叫",
    src: xueMaoJiaoSrc,
  },
];

const useSoundLibrary = (musicName) => {
  const foundMusic = musicList.find((music) => {
    return music.name === musicName;
  });

  const musicControl = useSound(foundMusic.src, {
    volume: 0.5,
  });
  return { musicList, musicControl };
};
export default useSoundLibrary;
