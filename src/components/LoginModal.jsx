import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function LoginModal({ show, onClose, isRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [timer, setTimer] = useState(180);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  useEffect(() => {
    let countdown;
    if (showCodeInput && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(countdown);
      toast.error("인증 시간이 만료되었습니다.", {
        className: "toast-error toast-error-bar",
      });
      setShowCodeInput(false);
      setIsCodeSent(false);
      setTimer(180);
    }
    return () => clearInterval(countdown);
  }, [showCodeInput, timer]);

  useEffect(() => {
    if (!show) {
      setEmail("");
      setPassword("");
      setPasswordCheck("");
      setVerificationCode("");
      setShowCodeInput(false);
      setIsCodeSent(false);
      setTimer(180);
      setLoading(false);
      setEmailLoading(false);
    }
  }, [show]);

  if (!show) return null;

  const handleEmailVerification = async () => {
    if (!email || !email.includes("@")) {
      toast.error("유효한 이메일을 입력하세요.", {
        className: "toast-error toast-error-bar",
      });
      return;
    }
    if (isRegister) {
      if (email === "" || password === "" || passwordCheck === "") {
        toast.error("모든 입력창을 채워주세요", {
          className: "toast-error toast-error-bar",
        });
        return;
      }
    } else if (!isRegister) {
      if (email === "" || password === "") {
        toast.error("모든 입력창을 채워주세요", {
          className: "toast-error toast-error-bar",
        });
        return;
      }
    }

    setEmailLoading(true);

    try {
      const res = await fetch(
        "https://081cf51a74f8.ngrok-free.app/email/send",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!res.ok) {
        throw new Error("이메일 발송 실패");
      }

      toast.success("인증번호가 이메일로 전송되었습니다.", {
        className: "toast-success toast-success-bar",
      });
      setShowCodeInput(true);
      setIsCodeSent(true);
      setTimer(180);
    } catch (err) {
      console.error(err);
      if (err instanceof TypeError) {
        toast.error("서버에 연결할 수 없습니다. 나중에 다시 시도해주세요.", {
          className: "toast-error toast-error-bar",
        });
      } else {
        toast.error(`에러 발생: ${err.message} ❌`, {
          className: "toast-error toast-error-bar",
        });
      }
    } finally {
      setEmailLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (isRegister) {
        if (password !== passwordCheck) {
          toast.error("비밀번호가 일치하지 않습니다.", {
            className: "toast-error toast-error-bar",
          });
          return;
        }

        if (!verificationCode) {
          toast.error("인증번호를 입력하세요.", {
            className: "toast-error toast-error-bar",
          });
          return;
        }

        const signupRes = await fetch(
          "https://081cf51a74f8.ngrok-free.app/auth/signup",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, verificationCode }),
          }
        );

        if (!signupRes.ok) {
          const errorData = await signupRes.json();
          throw new Error(errorData.message || "회원가입 실패");
        }

        toast.success("회원가입 성공!", {
          className: "toast-success toast-success-bar",
        });
      } else {
        const res = await fetch(
          "https://081cf51a74f8.ngrok-free.app/auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "로그인 실패");
        }

        toast.success(`로그인 성공!`, {
          className: "toast-success toast-success-bar",
        });
      }

      onClose();
    } catch (err) {
      if (err instanceof TypeError) {
        toast.error("서버에 연결할 수 없습니다. 나중에 다시 시도해주세요.", {
          className: "toast-error toast-error-bar",
        });
      } else {
        toast.error(`에러 발생: ${err.message}`, {
          className: "toast-error toast-error-bar",
        });
      }
    } finally {
      setLoading(false);
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
            required
            disabled={isCodeSent}
          />
          {isRegister && !isCodeSent && (
            <button
              className={`auth-button ${emailLoading ? "loading" : ""}`}
              onClick={handleEmailVerification}
              disabled={emailLoading || email === ""}
            >
              {emailLoading ? "전송 중..." : "이메일 인증"}
            </button>
          )}
          {isRegister && isCodeSent && (
            <>
              <input
                type="text"
                className="input-field"
                placeholder="인증번호 (6자리)"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
                required
              />
              <div className="timer-text">남은 시간: {formatTime(timer)}</div>
            </>
          )}
          <input
            type="password"
            className="input-field"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {isRegister && (
            <input
              type="password"
              className="input-field"
              placeholder="비밀번호 확인"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              required
            />
          )}
          <button
            className={`submit-button ${loading ? "loading" : ""}`}
            onClick={handleSubmit}
            disabled={loading || (isRegister && !isCodeSent)}
          >
            {loading ? "처리 중..." : isRegister ? "가입하기" : "로그인"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
