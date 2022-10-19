import { useEffect, useState } from "react";
import { alpacaSettings } from "../alpaca-settings";
import { Alpaca } from "../types";

interface Props {
  alpaca: Alpaca;
  setAlpaca: React.Dispatch<React.SetStateAction<Alpaca>>;
}

const Settings = ({ alpaca, setAlpaca }: Props) => {
  const [activeAccessor, setActiveAccessor] = useState<string>("backgrounds");
  const [activeStyle, setActiveStyle] = useState<string>(
    alpaca[activeAccessor as keyof typeof alpaca]
  );

  useEffect(() => {
    setActiveStyle(alpaca[activeAccessor as keyof typeof alpaca]);
  }, [activeAccessor]);

  const handleStyleChange = (style: string) => {
    setActiveStyle(style);
    setAlpaca({ ...alpaca, [activeAccessor]: style });
  };

  return (
    <div className="w-[400px]">
      <p className="text-white uppercase text-sm font-bold mb-4">
        Accessorize the alpaca's
      </p>
      <div className="flex flex-wrap gap-2">
        {Object.keys(alpacaSettings).map((key) => (
          <span
            key={key}
            onClick={() => {
              setActiveAccessor(key);
            }}
            className={`px-4 py-2 border-2  rounded-full capitalize border-green-500 bg-white cursor-pointer hover:bg-green-500 hover:text-white transition-all ${
              activeAccessor === key ? "bg-green-500 text-white" : ""
            }`}
          >
            {key}
          </span>
        ))}
      </div>

      <p className="text-white uppercase text-sm font-bold my-4">Style</p>
      <div className="flex flex-wrap gap-2">
        {alpacaSettings[activeAccessor as keyof typeof alpacaSettings].map(
          (style: string) => (
            <span
              key={style}
              onClick={() => handleStyleChange(style)}
              className={`px-4 py-2 border-2  rounded-full capitalize border-green-500 bg-white cursor-pointer hover:bg-green-500 hover:text-white transition-all ${
                activeStyle === style ? "bg-green-500 text-white" : ""
              }`}
            >
              {style.split("-").join(" ")}
            </span>
          )
        )}
      </div>
    </div>
  );
};

export default Settings;
