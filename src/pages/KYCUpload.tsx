import { useState, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadCloud } from "lucide-react";

const KYCUpload = () => {
  const [kycFile, setKycFile] = useState<File | null>(null);
  const [kycError, setKycError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleKycUpload = () => {
    if (!kycFile) {
      setKycError("Please select a file.");
      return;
    }
    if (!kycFile.name.match(/\.(pdf|jpg|jpeg|png)$/i)) {
      setKycError("File must be PDF or image.");
      return;
    }
    setKycError(null);
    alert(`KYC file '${kycFile.name}' uploaded!`);
    setKycFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-6 bg-[#FAFAFA] min-h-screen font-sans flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-xl">KYC Upload</CardTitle>
        </CardHeader>
        <CardContent>
          <Label className="block mb-2">Upload PDF or Image</Label>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="mb-2"
            onChange={(e) => setKycFile(e.target.files?.[0] || null)}
          />
          {kycError && (
            <div className="text-red-600 text-xs mb-2">{kycError}</div>
          )}
          <Button
            className="bg-black text-white rounded-md px-4 py-2 w-full"
            onClick={handleKycUpload}
          >
            <UploadCloud className="inline w-4 h-4 mr-2" /> Upload
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default KYCUpload;
