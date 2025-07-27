import React, { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PDFUpload } from "@/components/PDFUpload";
import { PDFPreview } from "@/components/PDFPreview";
import { SimpleUpload } from "@/components/SimpleUpload";
import { Link } from "wouter";
import type { Document } from "@shared/schema";

export const MacbookAirSection = (): JSX.Element => {
  const [uploadedDocument, setUploadedDocument] = useState<Document | null>(null);
  const [showUpload, setShowUpload] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadComplete = (document: Document) => {
    setUploadedDocument(document);
    setShowUpload(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      console.log("File selected:", file.name);
      // Mock upload for now - create a document object
      const mockDocument = {
        id: Date.now(),
        filename: file.name,
        fileSize: file.size,
        uploadedAt: new Date(),
        analyzed: false,
        analysisResult: null
      };
      handleUploadComplete(mockDocument);
    }
  };

  const handleUploadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // If we already have an uploaded document, reset to upload state
    if (uploadedDocument) {
      setShowUpload(true);
      setUploadedDocument(null);
    } else {
      // Otherwise, open file dialog
      fileInputRef.current?.click();
    }
  };

  // Card data for the contextual insights section
  const insightCards = [
    {
      title: "What is AI?",
      content:
        'This is the header of the page showing the current section the user is viewing in detail. It uses the actual heading text ("What is AI?") from the extracted document outline.',
    },
    {
      title: "Section Overview",
      content:
        "A brief breakdown of sub-points or a paraphrased summary of the section's content.\nUseful for:\nQuickly scanning what this section talks about.\nHelping users decide if this is relevant to their task.",
    },
    {
      title: "AI Insights",
      content:
        "AI-powered or semantic insights generated from this section. These could be:\nKeywords or entities mentioned often.\nExtractive or abstractive summary.\nCritical points for research or revision.",
    },
    {
      title: "Navigation Options",
      content:
        "Allows users to:\nJump directly to the page inside the PDF where this section appears.\nGo back to the full outline/sidebar to explore other sections.\nThis gives fast, fluid control over long or technical documents.",
    },
  ];

  return (
    <section id="MacbookAirSection" className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* Hidden file input for top upload button */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <div className="relative w-full min-h-screen" style={{background: 'radial-gradient(50% 50% at 50% 8%, rgba(79, 26, 23, 1) 49%, rgba(0, 0, 0, 1) 53%)'}}>
        {/* Header navigation - increased z-index and added pointer-events */}
        <div className="absolute top-6 right-8 z-50 pointer-events-auto">
          <div className="flex items-center gap-4">
            <Link href="/contact">
              <Button variant="link" className="text-[#e6ecffb2] text-base animate-text-glow hover:text-[#ca6a34] transition-all duration-300 pointer-events-auto">
                Contact Us
              </Button>
            </Link>
            <Button 
              onClick={handleUploadClick}
              className="bg-[#531f17] text-white hover:bg-[#3f1711] rounded-[10px] shadow-[0px_0px_0px_1px_#0055ff1f] hover:animate-glow transition-all duration-300 hover:scale-105 pointer-events-auto"
            >
              {uploadedDocument ? 'New Upload' : 'Upload'}
            </Button>
          </div>
        </div>

        {/* Logo - increased z-index */}
        <div className="absolute top-8 left-8 z-40 animate-fade-in-scale pointer-events-auto">
          <img
            className="w-[138px] h-[79px] object-cover hover:animate-glow transition-all duration-300 hover:scale-105"
            alt="Adobe Logo"
            src="/figmaAssets/image-removebg-preview-1.png"
          />
        </div>

        <div className="flex flex-col w-full items-center justify-center min-h-screen px-4 pt-[120px]">

          {/* Main content */}
          <div className="relative w-full max-w-7xl text-center">
            {/* Title section */}
            <div className="flex flex-col items-center mb-12">
              <h1 className="[font-family:'MuseoModerno',Helvetica] text-[84px] leading-[70.4px] font-semibold mb-6 animate-slide-in-up">
                <span className="text-white animate-text-glow">PDF </span>
                <span className="text-[#ca6a34]">Document</span>
                <br />
                <span className="text-white animate-text-glow">Analyzer</span>
              </h1>

              <div className="space-y-1 mb-8 animate-fade-in-scale">
                <p className="[font-family:'Poppins',Helvetica] font-medium text-white text-[21px] animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
                  Extract document structure using advanced AI/ML models
                </p>
                <p className="[font-family:'Poppins',Helvetica] font-medium text-white text-[21px] animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
                  Lightweight. CPU-Optimized Offline Processing
                </p>
              </div>
            </div>

            {/* PDF Upload/Preview Section - added pointer-events and z-index */}
            <div className="relative w-full max-w-4xl mx-auto z-30 pointer-events-auto">
              {showUpload || !uploadedDocument ? (
                <SimpleUpload 
                  onFileSelect={(file) => {
                    console.log("File selected:", file.name);
                    // Mock upload for now - create a document object
                    const mockDocument = {
                      id: Date.now(),
                      filename: file.name,
                      fileSize: file.size,
                      uploadedAt: new Date(),
                      analyzed: false,
                      analysisResult: null
                    };
                    handleUploadComplete(mockDocument);
                  }} 
                />
              ) : (
                <PDFPreview document={uploadedDocument} />
              )}
            </div>

            {/* Benefits badge */}
            <div className="flex justify-center mt-8 animate-fade-in-scale" style={{ animationDelay: '0.6s' }}>
              <Badge className="bg-black backdrop-blur-[34px] rounded-[26px] px-4 py-2 hover:animate-glow transition-all duration-300 hover:scale-110">
                <span className="bg-[linear-gradient(128deg,rgba(144,79,45,1)_22%,rgba(171,122,90,1)_100%)] [-webkit-background-clip:text] bg-clip-text text-transparent [font-family:'Inter',Helvetica] text-base">
                  BENEFITS
                </span>
              </Badge>
            </div>

            {/* Contextual Insights section */}
            <div className="mt-16 animate-slide-in-up" style={{ animationDelay: '0.8s' }}>
              <h2 className="[font-family:'Inter',Helvetica] font-medium text-white text-[44px] text-center tracking-[-0.44px] leading-[52.8px] mb-12 animate-text-glow">
                Contextual Insights
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {insightCards.map((card, index) => (
                  <Card
                    key={index}
                    className="rounded-2xl overflow-hidden [background:radial-gradient(50%_50%_at_50%_8%,rgba(59,21,18,1)_0%,rgba(0,0,0,1)_100%)] border border-[#ca6a34]/20 relative animate-fade-in-scale hover:animate-border-flow hover:animate-card-glow transition-all duration-500 hover:scale-105 cursor-pointer"
                    style={{ animationDelay: `${1 + index * 0.2}s` }}
                  >
                    <CardContent className="p-8">
                      <h3 className="[font-family:'Inter',Helvetica] font-medium text-white text-2xl tracking-[-0.48px] leading-7 mb-6 animate-text-glow">
                        {card.title}
                      </h3>
                      <p className="[font-family:'Inter',Helvetica] font-normal text-[#e6ecffb2] text-base tracking-[-0.32px] leading-[25.6px] whitespace-pre-line">
                        {card.content}
                      </p>
                    </CardContent>
                    <div className="absolute w-full h-[127px] bottom-0 left-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_100%)] opacity-[0.63]" />
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Background vector - reduced z-index to ensure it stays behind */}
        <img
          className="absolute w-full h-auto top-0 left-0 z-0 pointer-events-none"
          alt="Vector"
          src="/figmaAssets/vector.svg"
        />
      </div>
    </section>
  );
};