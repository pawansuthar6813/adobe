import React from "react";
import { MacbookAirSection } from "./sections/MacbookAirSection";
import { TextGraphicSection } from "./sections/TextGraphicSection";

export const Frame = (): JSX.Element => {
  return (
    <div id="Frame" className="bg-black flex flex-col w-full min-h-screen">
      <MacbookAirSection />
      <TextGraphicSection />
    </div>
  );
};
