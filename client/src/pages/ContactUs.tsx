import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, Instagram, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

interface TeamMember {
  name: string;
  image: string;
  email: string;
  linkedin: string;
  instagram?: string;
  role: string;
}

export const ContactUs = (): JSX.Element => {
  const teamMembers: TeamMember[] = [
    {
      name: "Nihira Agrawal",
      image: "/figmaAssets/nihira.jpg",
      email: "agrawalnihira@gmail.com",
      linkedin: "https://www.linkedin.com/in/nihira-agrawal-587810290",
      instagram: "https://www.instagram.com/_nihiraa_",
      role: "UI/UX Designer"
    },
    {
      name: "Yash Sajwan",
      image: "/figmaAssets/yash.jpg", 
      email: "yashsajwan2004@gmail.com",
      linkedin: "https://www.linkedin.com/in/yash-sajwan-65a196328/",
      role: "Full Stack Developer"
    },
    {
      name: "Kshitij Singh",
      image: "/figmaAssets/kshitij.jpg",
      email: "kshitijsingh@gmail.com",
      linkedin: "https://www.linkedin.com/in/kshitij-singh-915579222/",
      instagram: "https://www.instagram.com/kshitijsingh066/",
      role: "Backend Developer"
    }
  ];

  return (
    <div className="bg-black min-h-screen relative overflow-hidden">
      <div className="relative w-full min-h-screen" style={{background: 'radial-gradient(50% 50% at 50% 8%, rgba(79, 26, 23, 1) 49%, rgba(0, 0, 0, 1) 53%)'}}>
        
        {/* Header navigation */}
        <div className="absolute top-6 left-8 z-10">
          <Link href="/">
            <Button 
              variant="outline"
              className="border border-[#ca6a34] text-[#ca6a34] hover:bg-[#ca6a34] hover:text-white rounded-[10px] transition-all duration-300 animate-glow hover:animate-pulse-glow hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Logo */}
        <div className="absolute top-8 right-8 z-10 animate-fade-in-scale">
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
            <div className="flex flex-col items-center mb-16">
              <h1 className="[font-family:'MuseoModerno',Helvetica] text-[84px] leading-[70.4px] font-semibold mb-6 animate-slide-in-up">
                <span className="text-white animate-text-glow">Contact </span>
                <span className="text-[#ca6a34] animate-pulse-glow">Our Team</span>
              </h1>

              <div className="space-y-1 mb-8 animate-fade-in-scale">
                <p className="[font-family:'Poppins',Helvetica] font-medium text-white text-[21px] animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
                  Meet the talented minds behind PDF Document Analyzer
                </p>
                <p className="[font-family:'Poppins',Helvetica] font-medium text-white text-[21px] animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
                  Building the future of document processing with AI
                </p>
              </div>
            </div>

            {/* Team Members Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  className="rounded-2xl overflow-hidden [background:radial-gradient(50%_50%_at_50%_8%,rgba(59,21,18,1)_0%,rgba(0,0,0,1)_100%)] border border-[#ca6a34]/20 relative animate-fade-in-scale hover:animate-border-flow hover:animate-hover-gradient transition-all duration-500 hover:scale-105 cursor-pointer"
                  style={{ animationDelay: `${0.6 + index * 0.2}s` }}
                >
                  <CardContent className="p-8 text-center">
                    {/* Profile Image */}
                    <div className="relative mb-6 mx-auto w-32 h-32">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover rounded-full border-2 border-[#ca6a34]/50 animate-pulse-glow"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#ca6a34]/20 to-transparent"></div>
                    </div>

                    {/* Name and Role */}
                    <h3 className="[font-family:'Inter',Helvetica] font-medium text-white text-2xl tracking-[-0.48px] leading-7 mb-2 animate-text-glow">
                      {member.name}
                    </h3>
                    <Badge className="bg-[#ca6a34]/20 text-[#ca6a34] border border-[#ca6a34]/30 mb-6 animate-glow">
                      {member.role}
                    </Badge>

                    {/* Contact Links */}
                    <div className="space-y-3">
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center justify-center gap-2 text-gray-300 hover:text-[#ca6a34] transition-all duration-300 hover:scale-105"
                      >
                        <Mail size={18} className="animate-pulse-glow" />
                        <span className="text-sm">{member.email}</span>
                      </a>
                      
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 text-gray-300 hover:text-blue-400 transition-all duration-300 hover:scale-105"
                      >
                        <Linkedin size={18} className="animate-pulse-glow" />
                        <span className="text-sm">LinkedIn Profile</span>
                      </a>
                      
                      {member.instagram && (
                        <a
                          href={member.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 text-gray-300 hover:text-pink-400 transition-all duration-300 hover:scale-105"
                        >
                          <Instagram size={18} className="animate-pulse-glow" />
                          <span className="text-sm">Instagram</span>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Project Info Section */}
            <div className="animate-slide-in-up" style={{ animationDelay: '1.4s' }}>
              <Card className="rounded-2xl overflow-hidden [background:radial-gradient(50%_50%_at_50%_8%,rgba(59,21,18,1)_0%,rgba(0,0,0,1)_100%)] border border-[#ca6a34]/20 relative hover:animate-border-flow hover:animate-hover-gradient transition-all duration-500 hover:scale-105 max-w-4xl mx-auto">
                <CardContent className="p-12 text-center">
                  <h2 className="[font-family:'Inter',Helvetica] font-medium text-white text-[44px] text-center tracking-[-0.44px] leading-[52.8px] mb-8 animate-text-glow">
                    About Our Project
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    <div>
                      <h3 className="text-[#ca6a34] text-xl font-semibold mb-4 animate-pulse-glow">Technology Stack</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li>• React + TypeScript</li>
                        <li>• Express.js Backend</li>
                        <li>• AI/ML Document Processing</li>
                        <li>• Modern UI with Tailwind CSS</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-[#ca6a34] text-xl font-semibold mb-4 animate-pulse-glow">Features</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li>• PDF Structure Extraction</li>
                        <li>• AI-Powered Analysis</li>
                        <li>• Real-time Processing</li>
                        <li>• Contextual Insights</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-[#ca6a34]/20">
                    <p className="text-gray-300 text-lg">
                      Have questions or want to collaborate? Reach out to any of our team members above!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};