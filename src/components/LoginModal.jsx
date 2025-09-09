import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function LoginModal({ show, onClose, isRegister, onLoginSuccess }) {
  // ===== 상태 관리 =====
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [authNum, setAuthNum] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [timer, setTimer] = useState(180);
  const [loading, setLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  // ===== 타이머 관리: 이메일 인증 코드 유효 시간 카운트다운 =====
  useEffect(() => {
    let countdown;
    if (isCodeSent && timer > 0 && !isCodeVerified) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0 && !isCodeVerified) {
      toast.error("인증 시간이 만료되었습니다.");
      resetEmailVerification();
    }
    return () => clearInterval(countdown);
  }, [isCodeSent, timer, isCodeVerified]);

  // ===== 모달 초기화: 모달이 닫힐 때 모든 상태를 초기화 =====
  useEffect(() => {
    if (!show) resetAllStates();
  }, [show]);

  // ===== 유틸리티 함수들 =====
  const resetAllStates = () => {
    setEmail("");
    setPassword("");
    setPasswordCheck("");
    setAuthNum("");
    setIsCodeSent(false);
    setIsCodeVerified(false);
    setTimer(180);
    setLoading(false);
    setEmailLoading(false);
  };

  const resetEmailVerification = () => {
    setIsCodeSent(false);
    setTimer(180);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // ===== API 호출 함수들 =====
  const sendVerificationEmail = async () => {
    if (!email || !email.includes("@")) {
      toast.error("유효한 이메일을 입력하세요.");
      return;
    }

    setEmailLoading(true);
    try {
      await axios.post("http://10.80.161.151:8080/email/send", {
        email,
      });
      toast.success("인증번호가 이메일로 전송되었습니다.");
      setIsCodeSent(true);
      setTimer(180);
    } catch (err) {
      handleApiError(err);
    } finally {
      setEmailLoading(false);
    }
  };

  const verifyCode = async () => {
    if (!authNum) {
      toast.error("인증번호를 입력하세요.");
      return;
    }

    setEmailLoading(true);
    try {
      await axios.post("http://10.80.161.151:8080/email/check", {
        email,
        authNum,
      });
      toast.success("인증번호가 확인되었습니다!");
      setIsCodeVerified(true);
    } catch (err) {
      handleApiError(err);
    } finally {
      setEmailLoading(false);
    }
  };

  const login = async () => {
    if (!email || !password) {
      toast.error("모든 입력창을 입력하세요.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://10.80.161.151:8080/auth/login", {
        email,
        password,
      });
      onLoginSuccess(email);
      onClose();
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  const register = async () => {
    if (!email || !password || !passwordCheck || !authNum) {
      toast.error("모든 입력창을 입력하세요.");
      return;
    }
    if (password !== passwordCheck) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://10.80.161.151:8080/auth/signup", {
        email,
        password,
        authNum,
      });
      onLoginSuccess(email);
      onClose();
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };
  const handleApiError = (err) => {
    const errorMessage = err.response?.data?.message || err.message;
    if (err.response?.status === 400) {
      toast.error("비밀번호나 이메일을 다시한번 확인해주세요.");
    } else if (errorMessage.includes("already exists")) {
      toast.error("이미 가입된 이메일입니다.");
    } else if (errorMessage.includes("invalid code")) {
      toast.error("인증번호가 올바르지 않습니다.");
    } else {
      toast.error(`에러가 발생했습니다. 잠시 후 다시 시도해주세요.`);
      console.error(err);
    }
  };

  // ===== 메인 제출 함수 =====
  const handleSubmit = () => {
    if (isRegister) {
      register();
    } else {
      login();
    }
  };

  // 모달이 닫혀있으면 렌더링하지 않음
  if (!show) return null;

  // ===== JSX 렌더링 =====
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>
          &times;
        </span>

        <h2 className="modal-title">{isRegister ? "회원가입" : "로그인"}</h2>

        <div className="form-container">
          {/* 이메일 입력 */}
          <input
            type="email"
            className="input-field"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isCodeSent && isRegister}
          />

          {/* 회원가입 시에만 보이는 이메일 인증 */}
          {isRegister && (
            <>
              {/* 인증번호 전송 버튼 */}
              {!isCodeSent && (
                <button
                  className={`auth-button ${emailLoading ? "loading" : ""}`}
                  onClick={sendVerificationEmail}
                  disabled={emailLoading || !email}
                >
                  {emailLoading ? "전송 중..." : "이메일 인증"}
                </button>
              )}

              {/* 인증번호 입력 및 확인 */}
              {isCodeSent && !isCodeVerified && (
                <>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="인증번호 (6자리)"
                    value={authNum}
                    onChange={(e) => setAuthNum(e.target.value)}
                    maxLength={6}
                  />
                  <div className="timer-text">
                    남은 시간: {formatTime(timer)}
                  </div>
                  <button
                    className={`auth-button ${emailLoading ? "loading" : ""}`}
                    onClick={verifyCode}
                    disabled={emailLoading || !authNum}
                  >
                    {emailLoading ? "확인 중..." : "인증번호 확인"}
                  </button>
                </>
              )}

              {/* 인증 완료 메시지 */}
              {isCodeVerified && (
                <div className="verification-success">
                  이메일 인증이 완료되었습니다.
                </div>
              )}
            </>
          )}

          {/* 비밀번호 입력 */}
          <input
            type="password"
            className="input-field"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* 회원가입 시에만 보이는 비밀번호 확인 */}
          {isRegister && (
            <input
              type="password"
              className="input-field"
              placeholder="비밀번호 확인"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
          )}

          {/* 제출 버튼 */}
          <button
            className={`submit-button ${loading ? "loading" : ""}`}
            onClick={handleSubmit}
            disabled={loading || (isRegister && !isCodeVerified)}
          >
            {loading ? "처리 중..." : isRegister ? "가입하기" : "로그인"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
