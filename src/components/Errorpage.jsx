import { Link, useNavigate } from "react-router-dom";

function Error({
  code = 404,
  title = "페이지를 찾을 수 없어요",
  description = "요청하신 주소가 잘못되었거나 존재하지 않습니다.",
}) {
  const navigate = useNavigate();

  return (
    <main className="error-page">
      <section className="error-card">
        <h1 className="error-code">{code}</h1>
        <h2 className="error-title">{title}</h2>
        <p className="error-desc">{description}</p>

        <div className="error-actions">
          <Link to="/" className="btn btn-primary">
            홈으로
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Error;
