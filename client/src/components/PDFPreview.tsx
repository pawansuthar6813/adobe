import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { FileText, Brain, Loader2, CheckCircle, Download, Eye } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Document } from "@shared/schema";

interface PDFPreviewProps {
  document: Document;
}

export const PDFPreview: React.FC<PDFPreviewProps> = ({ document }) => {
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const analyzeMutation = useMutation({
    mutationFn: async (): Promise<Document> => {
      const response = await fetch(`/api/documents/${document.id}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`);
      }

      return response.json();
    },
    onSuccess: (updatedDocument: Document) => {
      setAnalysisProgress(100);
      toast({
        title: "Analysis Complete",
        description: "PDF document has been analyzed successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/documents"] });
      queryClient.invalidateQueries({ queryKey: ["/api/documents", document.id] });
    },
    onError: (error: any) => {
      toast({
        title: "Analysis Failed", 
        description: error.message || "Failed to analyze PDF document.",
        variant: "destructive",
      });
      setAnalysisProgress(0);
    },
  });

  const handleAnalyze = () => {
    setAnalysisProgress(10);
    analyzeMutation.mutate();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const analysisResult = document.analysisResult ? JSON.parse(document.analysisResult) : null;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Document Info Card */}
      <Card className="bg-white/5 backdrop-blur-sm border border-gray-600">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FileText size={48} className="text-[#ca6a34]" />
              <div>
                <CardTitle className="text-white text-xl">{document.filename}</CardTitle>
                <div className="flex items-center space-x-4 text-sm text-gray-300 mt-2">
                  <span>{formatFileSize(document.fileSize)}</span>
                  <span>•</span>
                  <span>Uploaded {formatDate(document.uploadedAt)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {document.analyzed ? (
                <Badge className="bg-green-600 text-white">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Analyzed
                </Badge>
              ) : (
                <Badge className="bg-gray-600 text-white">
                  Pending Analysis
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* PDF Preview Placeholder */}
          <div className="bg-gray-800 rounded-lg p-8 mb-6 min-h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-gray-600">
            <FileText size={80} className="text-gray-500 mb-4" />
            <h3 className="text-white text-lg font-semibold mb-2">PDF Preview</h3>
            <p className="text-gray-400 text-center mb-4">
              {document.filename}
            </p>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Eye className="w-4 h-4 mr-2" />
                View PDF
              </Button>
              <Button 
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>

          {/* Analysis Section */}
          {!document.analyzed ? (
            <div className="text-center">
              {analyzeMutation.isPending ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2 text-[#ca6a34]">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="text-lg">Analyzing document...</span>
                  </div>
                  <Progress value={analysisProgress} className="h-3 max-w-md mx-auto" />
                  <p className="text-gray-400 text-sm">
                    Using advanced AI/ML models to extract document structure
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-300 mb-6">
                    Ready to analyze your PDF document using advanced AI/ML models
                  </p>
                  <Button
                    onClick={handleAnalyze}
                    className="bg-[#ca6a34] text-white hover:bg-[#b85a2e] rounded-[10px] px-8 py-3 text-lg"
                  >
                    <Brain className="mr-2 h-5 w-5" />
                    Analyze Document
                  </Button>
                </div>
              )}
            </div>
          ) : (
            analysisResult && (
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-green-400 justify-center">
                  <CheckCircle className="w-6 h-6" />
                  <span className="text-lg font-semibold">Analysis Complete</span>
                </div>

                {/* Document Structure */}
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Document Structure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {analysisResult.structure.sections.map((section: any, index: number) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                          <span className="text-white font-medium">{section.title}</span>
                          <Badge variant="outline" className="text-gray-300">
                            Pages {section.pages.join(', ')}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* AI Insights */}
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">AI Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysisResult.insights.map((insight: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-[#ca6a34] rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Summary */}
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed">{analysisResult.summary}</p>
                  </CardContent>
                </Card>
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
};