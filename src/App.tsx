import { useState } from "react";
import html2canvas from "html2canvas";

import AlpacaImage from "./components/AlpacaImage";
import Settings from "./components/Settings";
import { Alpaca } from "./types";
import { alpacaSettings } from "./alpaca-settings";

function App() {
  const [alpaca, setAlpaca] = useState<Alpaca>({
    accessories: "earings",
    backgrounds: "blue50",
    ears: "default",
    eyes: "default",
    hair: "default",
    leg: "default",
    mouth: "default",
    neck: "default",
    nose: "default",
  });

  const randomize = () => {
    let newAlpaca: Alpaca = { ...alpaca };
    Object.keys(alpaca).map((key) => {
      newAlpaca = { ...newAlpaca, [key]: getRandomValue(key) };
    });
    setAlpaca({ ...newAlpaca });
  };

  const getRandomValue = (key: string): string => {
    return alpacaSettings[key as keyof typeof alpaca][
      Math.floor(
        Math.random() * alpacaSettings[key as keyof typeof alpaca].length
      )
    ];
  };

  const saveImage = async () => {
    const element = document.getElementById("print");
    const canvas = await html2canvas(element!);
    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");

    link.href = data;
    link.download = "downloaded-image.jpg";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-neutral-600">
      <p className="mb-10 text-white font-bold uppercase text-4xl">
        Alpaca Generator
      </p>
      <div className="flex flex-row gap-4">
        <AlpacaImage alpaca={alpaca} />
        <Settings setAlpaca={setAlpaca} alpaca={alpaca} />
      </div>
      <div className="flex items-start gap-5 mt-10">
        <button
          onClick={randomize}
          className="px-4 py-2 bg-emerald-500 rounded-md text-white hover:bg-emerald-600"
        >
          Randomize
        </button>
        <button
          onClick={saveImage}
          className="px-4 py-2 bg-amber-500 rounded-md text-white hover:bg-amber-600"
        >
          Save image
        </button>
      </div>
    </div>
  );
}

export default App;
