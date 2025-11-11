// src/app/page.tsx

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "./components/Button";
import "./components/result.css";

// おみくじの結果と画像の対応マップ
const fortunesMap: { [key: string]: string } = {
  大吉: "/omikuji_daikichi.png",
  中吉: "/omikuji_chuukichi.png",
  小吉: "/omikuji_syoukichi.png",
  吉: "/omikuji_kichi.png",
  末吉: "/omikuji_suekichi.png",
  凶: "/omikuji_kyou.png",
  大凶: "/omikuji_daikyou.png",
};

export default function Home() {
  const [resultImage, setResultImage] = useState<string | null>(null);
  // 新しいstateを追加: おみくじを引いたかどうかを管理
  const [isDrawn, setIsDrawn] = useState<boolean>(false);

  const drawOmikuji = () => {
    // 既に引かれている場合は、何もしないで関数を終了
    if (isDrawn) {
      return;
    }

    const fortunes = Object.keys(fortunesMap);
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    const resultKey = fortunes[randomIndex];

    const imagePath = fortunesMap[resultKey];

    // stateを更新
    setResultImage(imagePath);
    // おみくじを引いたことを示すstateをtrueに更新
    setIsDrawn(true);
  };

  return (
    <div>
      <h1>結果は...</h1>

      {resultImage ? (
        <Image src={resultImage} alt="おみくじの結果" width={230} height={400} className="result-image" />
      ) : (
        <p></p>
      )}

      {/* Buttonコンポーネントにdisabledプロパティを渡し、isDrawnがtrueなら無効にする */}
      <Button onClick={drawOmikuji}  />
    </div>
  );
}

function OmikujiResult(result: string) {
  throw new Error("Function not implemented.");
}