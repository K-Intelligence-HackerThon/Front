import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function PptPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.name.endsWith(".pptx") || file.name.endsWith(".xls"))) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      toast.error(
        "유효하지 않은 파일 형식입니다. .pptx 또는 .xls 파일만 선택 가능합니다."
      );
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast.error("파일을 선택해 주세요.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    const serverUrl = "https://your-placeholder-server.com/upload";
    try {
      const response = await fetch(serverUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("파일이 성공적으로 업로드되었습니다.");
      } else {
        toast.error("파일 업로드에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("업로드 중 에러 발생:", error);
      toast.error("네트워크 오류 또는 서버 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ppt-page-container">
      <Toaster
        position="top-right"
        toastOptions={{
          className: "custom-toast",
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
            fontSize: "14px",
            padding: "12px 16px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          },
          success: {
            duration: 3000,
            style: {
              background: "#22c55e",
              color: "#fff",
            },
          },
          error: {
            duration: 3000,
            style: {
              background: "#ef4444",
              color: "#fff",
            },
          },
        }}
      />

      <div className="upload-box">
        <h2 className="upload-title">파일 업로드</h2>
        <p className="upload-subtitle">.pptx 또는 .xls 파일을 선택하세요.</p>

        <input type="file" onChange={handleFileChange} className="file-input" />

        {selectedFile && (
          <p className="file-info">선택된 파일: {selectedFile.name}</p>
        )}

        <button
          onClick={handleFileUpload}
          disabled={!selectedFile || loading}
          className="upload-button"
        >
          {loading ? "업로드 중..." : "서버로 전송"}
        </button>
      </div>
    </div>
  );
}

export default PptPage;
