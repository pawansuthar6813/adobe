import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const TextGraphicSection = (): JSX.Element => {
  // Feature card data for mapping
  const featureCards = [
    {
      title: "Structure Detection",
      description:
        "Automatically identifies document titles and heading hierarchy (H1, H2, H3) using advanced machine learning models.",
      iconSrc: "/figmaAssets/icon---primary.svg",
    },
    {
      title: "Fast Processing",
      description:
        "Optimized for speed with CPU-only inference. Processes 50-page documents in under 10 seconds.",
      iconSrc: "/figmaAssets/icon---primary-1.svg",
    },
    {
      title: "API Access",
      description:
        "Programmatic access available via REST API endpoint:\nPOST/api/process\nSend PDF files as multipart/form-data to get ISON responses",
      iconSrc: "/figmaAssets/icon---primary-2.svg",
    },
  ];

  return (
    <section id="TextGraphicSection" className="w-full relative rounded-2xl overflow-hidden [background:radial-gradient(50%_50%_at_50%_8%,rgba(48,16,15,1)_0%,rgba(0,0,0,1)_100%)]">
      <div className="flex flex-col items-center py-10 px-4">
        <h2 className="text-[44px] font-medium text-white text-center tracking-[-0.44px] leading-[52.8px] font-['Inter',Helvetica] mb-8">
          Structure Analysis
        </h2>

        <div className="flex flex-wrap justify-center gap-8 mt-6">
          {featureCards.map((card, index) => (
            <Card
              key={index}
              className="w-[360px] h-[297px] rounded-2xl overflow-hidden [background:radial-gradient(50%_50%_at_49%_-36%,rgba(48,16,15,1)_0%,rgba(0,0,0,1)_100%)] border-0"
            >
              <CardContent className="p-0">
                <div className="relative w-full h-full p-8 rounded-2xl [background:radial-gradient(50%_50%_at_50%_8%,rgba(48,16,15,1)_0%,rgba(0,0,0,1)_76%)]">
                  <img
                    className="w-[58px] h-[61px]"
                    alt="Icon primary"
                    src={card.iconSrc}
                  />

                  <div className="mt-8">
                    <h3 className="font-medium text-white text-2xl tracking-[-0.48px] leading-7 font-['Inter',Helvetica] mb-6">
                      {card.title}
                    </h3>

                    <p className="font-normal text-[#e6ecffb2] text-base tracking-[-0.32px] leading-[25.6px] font-['Inter',Helvetica] whitespace-pre-line">
                      {card.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-10 font-medium text-white text-[21px] text-center tracking-[0] leading-[25.6px] font-['Poppins',Helvetica]">
          Built for Hackathon 2025: "Connecting the Dots"
        </p>
      </div>
    </section>
  );
};
