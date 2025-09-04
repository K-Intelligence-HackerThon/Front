import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function LoginModal({ show, onClose, isRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [timer, setTimer] = useState(180);
  const [loading, setLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  useEffect(() => {
    let countdown;
    if (isCodeSent && timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      clearInterval(countdown);
      toast.error("인증 시간이 만료되었습니다.");
      setIsCodeSent(false);
      setTimer(180);
    }
    return () => clearInterval(countdown);
  }, [isCodeSent, timer]);

  useEffect(() => {
    if (!show) {
      setEmail("");
      setPassword("");
      setPasswordCheck("");
      setVerificationCode("");
      setIsCodeSent(false);
      setIsCodeVerified(false);
      setTimer(180);
      setLoading(false);
      setEmailLoading(false);
    }
  }, [show]);

  if (!show) return null;

  const handleEmailVerification = async () => {
    if (!email || !email.includes("@")) {
      toast.error("유효한 이메일을 입력하세요.");
      return;
    }
    setEmailLoading(true);
    try {
      const res = await axios.post(
        "https://b30f0aba73c8.ngrok-free.app/email/send",
        { email }
      );
      toast.success("인증번호가 이메일로 전송되었습니다.");
      setIsCodeSent(true);
      setTimer(180);
    } catch (err) {
      toast.error(`에러 발생: ${err.response?.data?.message || err.message}`);
    } finally {
      setEmailLoading(false);
    }
  };

  const handleVerificationCheck = async () => {
    if (!verificationCode) {
      toast.error("인증번호를 입력하세요.");
      return;
    }
    setEmailLoading(true);
    try {
      const res = await axios.post(
        "https://b30f0aba73c8.ngrok-free.app/email/check",
        { email, verificationCode }
      );
      toast.success("인증번호가 확인되었습니다!");
      setIsCodeVerified(true);
    } catch (err) {
      toast.error(`에러 발생: ${err.response?.data?.message || err.message}`);
    } finally {
      setEmailLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("모든 입력창을 입력하세요.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "https://b30f0aba73c8.ngrok-free.app/auth/login",
        { email, password }
      );
      toast.success("로그인 성공!");
      onClose();
    } catch (err) {
      toast.error(`에러 발생: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!email || !password || !passwordCheck || !verificationCode) {
      toast.error("모든 입력창을 입력하세요.");
      return;
    }
    if (password !== passwordCheck) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "hhttps://b30f0aba73c8.ngrok-free.app/auth/signup",
        { email, password, verificationCode }
      );
      toast.success("회원가입 성공!");
      onClose();
    } catch (err) {
      toast.error(`에러 발생: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (isRegister) {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2 className="modal-title">{isRegister ? "회원가입" : "로그인"}</h2>
        <div className="form-container">
          <input
            type="email"
            className="input-field"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isCodeSent && isRegister}
          />

          {isRegister && (
            <>
              {!isCodeSent && (
                <button
                  className={`auth-button ${emailLoading ? "loading" : ""}`}
                  onClick={handleEmailVerification}
                  disabled={emailLoading || !email}
                >
                  {emailLoading ? "전송 중..." : "이메일 인증"}
                </button>
              )}
              {isCodeSent && !isCodeVerified && (
                <>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="인증번호 (6자리)"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength={6}
                  />
                  <div className="timer-text">
                    남은 시간: {formatTime(timer)}
                  </div>
                  <button
                    className={`auth-button ${emailLoading ? "loading" : ""}`}
                    onClick={handleVerificationCheck}
                    disabled={emailLoading || !verificationCode}
                  >
                    {emailLoading ? "확인 중..." : "인증번호 확인"}
                  </button>
                </>
              )}
            </>
          )}

          <input
            type="password"
            className="input-field"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isRegister && (
            <input
              type="password"
              className="input-field"
              placeholder="비밀번호 확인"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
          )}
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
