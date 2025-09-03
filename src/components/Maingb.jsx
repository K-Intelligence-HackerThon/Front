import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import LoginModal from "./LoginModal"; // Import LoginModal 컴포넌트

function MainPage() {
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  const navItems = [
    { text: "홈", onClick: () => toast("홈 페이지입니다! 🏠") },
    {
      text: "시작하기",
      onClick: () => toast.success("시작하기를 클릭했습니다! ✨"),
    },
    { text: "로그인", onClick: () => openModal("login") },
    { text: "회원가입", onClick: () => openModal("register") },
  ];

  const visions = [
    {
      title: "Vision One",
      text: "아이디어는 누구나 떠올릴 수 있다. 그러나 그것을 빠르게 정리하고 설득력 있게 전하는 것이 세상을 움직이는 진짜 힘이다.",
    },
    {
      title: "Vision Two",
      text: "우리는 단순한 할 일을 기록하는 도구가 아니다. 당신의 노력을 한 장의 스토리로 엮어, 세상을 설득하는 무대까지 함께 나아가는 동반자다.",
    },
    {
      title: "Vision Three",
      text: "복잡한 준비에 시간을 빼앗기지 말라. 당신의 생각에 집중하라. 우리가 그것을 강력한 메시지로 바꾸어줄 것이다.",
    },
  ];

  return (
    <div className="main-page">
      {/* Toaster 컴포넌트 - 토스트 메시지 표시 */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // 기본 설정
          className: "",
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
            fontSize: "14px",
            padding: "12px 16px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          },
          // 성공 토스트 스타일
          success: {
            style: {
              background: "#22c55e",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#22c55e",
            },
          },
          // 에러 토스트 스타일
          error: {
            style: {
              background: "#ef4444",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#ef4444",
            },
          },
        }}
      />

      <nav className="navbar">
        <div className="container nav-container">
          <a href="#home" className="logo">
            Project Name
          </a>
          <ul className="nav-links">
            {navItems.map((item, index) => (
              <li key={index}>
                <button className="nav-button" onClick={item.onClick}>
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <header className="hero">
        <div className="container hero-content">
          <h1 className="hero-title">Welcome</h1>
          <button
            className="cta-button"
            onClick={() =>
              toast.success("환영합니다! 🎉✨", {
                duration: 3000,
                style: {
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "#fff",
                  fontWeight: "bold",
                },
              })
            }
          >
            시작하기
          </button>
        </div>
      </header>

      <section className="features">
        <div className="container features-grid">
          {visions.map((vision, index) => (
            <div
              className="card"
              key={index}
              onClick={() => toast(`${vision.title}를 클릭했습니다! 💡`)}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body">
                <h3 className="card-title">{vision.title}</h3>
                <p className="card-text">{vision.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <small>© 2025 Project Name member(Seojku, Junseok, KyoungYun)</small>
        </div>
      </footer>

      {modalType === "login" && (
        <LoginModal show={true} onClose={closeModal} isRegister={false} />
      )}

      {modalType === "register" && (
        <LoginModal show={true} onClose={closeModal} isRegister={true} />
      )}
    </div>
  );
}

export default MainPage;
