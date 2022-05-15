import { Howl } from "howler";
import { useEffect, useState } from "react";
import gaoBaiQiQiuSrc from "../assets/sounds/gaoBaiQiQiu.mp3";
import mianHuaTangSrc from "../assets/sounds/mianHuaTang.mp3";
import qingNingSrc from "../assets/sounds/qingNing.mp3";
import reAi105Src from "../assets/sounds/reAi105.mp3";
import wanYouYinLiSrc from "../assets/sounds/wanYouYinLi.mp3";
import xiaoShiGuangSrc from "../assets/sounds/xiaoShiGuang.mp3";
import xiaoXingXingSrc from "../assets/sounds/xiaoXingXing.mp3";
import xueMaoJiaoSrc from "../assets/sounds/xueMaoJiao.mp3";
import youDianTianSrc from "../assets/sounds/youDianTian.mp3";
import youHeBuKeSrc from "../assets/sounds/youHeBuKe.mp3";
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
  {
    name: "小时光",
    src: xiaoShiGuangSrc,
  },
  {
    name: "有何不可",
    src: youHeBuKeSrc,
  },
  {
    name: "棉花糖",
    src: mianHuaTangSrc,
  },
  {
    name: "小星星",
    src: xiaoXingXingSrc,
  },
  {
    name: "青柠",
    src: qingNingSrc,
  },
];

const useSoundLibrary = () => {
  const [music, setMusic] = useState("");
  const [musicPlayer, setMusicPlayer] = useState(null);

  useEffect(() => {
    const foundMusic = musicList.find((listMusic) => {
      return listMusic.name === music;
    });
    if (foundMusic) {
      setMusicPlayer(
        new Howl({
          src: [foundMusic.src],
          loop: true,
          autoplay: true,
          volume: 0.5,
        })
      );
    } else {
      setMusicPlayer(null);
    }
  }, [music]);

  return { musicList, musicPlayer, music, setMusic };
};
export default useSoundLibrary;
