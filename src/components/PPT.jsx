import axios from "axios";
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
      const response = await axios.post(serverUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("파일이 성공적으로 업로드되었습니다.");
      } else {
        toast.error("파일 업로드에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("업로드 중 에러 발생:", error);
      toast.error(
        `네트워크 오류 또는 서버 오류가 발생했습니다: ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ppt-page-container">
      <Toaster
        position="top-center"
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
      <div className="upload-box-wrapper">
        <div className="upload-box-v2">
          <h2 className="upload-title">파일 업로드</h2>
          <p className="upload-subtitle">.pptx 또는 .xls 파일을 선택하세요.</p>
          <div className="file-input-wrapper">
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              className="file-input-v2"
            />
            <label htmlFor="file-upload" className="file-input-label">
              파일 선택
            </label>
          </div>
          {selectedFile && (
            <p className="file-info-v2">선택된 파일: {selectedFile.name}</p>
          )}
          <button
            onClick={handleFileUpload}
            disabled={!selectedFile || loading}
            className={`upload-button-v2 ${loading ? "loading" : ""}`}
          >
            {loading ? "생성중..." : "todo리스트 생성하기"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PptPage;
