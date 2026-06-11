import { useEffect, useState } from "react";

import { Icon } from "@components/shared/Icon/Icon";

interface BatteryManager extends EventTarget {
  level: number;
  addEventListener(
    type: "levelchange",
    listener: () => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener(
    type: "levelchange",
    listener: () => void,
    options?: boolean | EventListenerOptions
  ): void;
}

interface NavigatorWithBattery extends Navigator {
  getBattery?: () => Promise<BatteryManager>;
}

export const BatteryLife = () => {
  const [level, setLevel] = useState<number | null>(null);

  useEffect(() => {
    const navigatorWithBattery = navigator as NavigatorWithBattery;

    if (!navigatorWithBattery.getBattery) {
      return;
    }

    let battery: BatteryManager | null = null;

    const handleLevelChange = () => {
      if (battery) {
        setLevel(Math.round(battery.level * 100));
      }
    };

    void navigatorWithBattery.getBattery().then(batteryManager => {
      battery = batteryManager;
      setLevel(Math.round(batteryManager.level * 100));
      batteryManager.addEventListener("levelchange", handleLevelChange);
    });

    return () => {
      battery?.removeEventListener("levelchange", handleLevelChange);
    };
  }, []);

  return (
    <div className="flex items-center mr-4 gap-x-1">
      <span className="text-xs font-bold cursor-pointer dark:text-white">
        {level !== null ? `${level}%` : "N/A"}
      </span>
      <Icon icon="battery-life" className="w-[20px]" />
    </div>
  );
};
