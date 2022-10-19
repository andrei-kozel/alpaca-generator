import { alpacaSettings } from "../alpaca-settings";
import { Alpaca } from "../types";
interface Props {
  alpaca: Alpaca;
}

const setZIndex = (asset: string): string => {
  switch (asset) {
    case "accessories":
      return "z-10";
    case "backgrounds":
      return "z-1";
    case "ears":
      return "z-2";
    case "eyes":
      return "z-50";
    case "hair":
      return "z-9";
    case "leg":
      return "z-20";
    case "mouth":
      return "z-20";
    case "neck":
      return "z-5";
    case "nose":
      return "z-10";
    default:
      return "z-1";
  }
};

const AlpacaImage = ({ alpaca }: Props) => {
  return (
    <div className="w-[400px] h-[400px] relative" id="print">
      {Object.keys(alpaca).map((key: string) => (
        <img
          key={key}
          src={`./src/assets/alpaca/${key}/${
            alpaca[key as keyof typeof alpacaSettings]
          }.png`}
          className={`w-[400px] h-[400px] object-cover absolute rounded-lg ${setZIndex(
            key
          )}`}
        />
      ))}
    </div>
  );
};

export default AlpacaImage;
