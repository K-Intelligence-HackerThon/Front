import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Card,
  Col,
  Container,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";

function MainPage() {
  return (
    <>
      {/* 네비게이션 바 */}
      <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="#home" className="fw-bold">
            ???
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">홈</Nav.Link>
              <Nav.Link href="#features">소개</Nav.Link>
              <Nav.Link href="#contact">문의</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 메인 Hero 섹션 */}
      <div className="bg-primary text-white text-center py-5">
        <Container>
          <h1 className="display-4 fw-bold">환영합니다 👋</h1>
          <p className="lead mt-3">파란색과 흰색 테마로 꾸며진 메인 페이지</p>
          <Button variant="light" className="mt-3 fw-bold px-4">
            시작하기
          </Button>
        </Container>
      </div>

      {/* 카드 섹션 */}
      <Container className="my-5">
        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="text-center">
                <Card.Title className="fw-bold text-primary">
                  ✨ 기능 1
                </Card.Title>
                <Card.Text>
                  사용자 친화적인 인터페이스로 편리하게 사용할 수 있습니다.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="text-center">
                <Card.Title className="fw-bold text-primary">
                  🚀 기능 2
                </Card.Title>
                <Card.Text>
                  빠르고 안정적인 성능으로 매끄럽게 작동합니다.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="text-center">
                <Card.Title className="fw-bold text-primary">
                  🔒 기능 3
                </Card.Title>
                <Card.Text>안전한 보안 기능을 제공합니다.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* 푸터 */}
      <footer className="bg-primary text-white text-center py-3 mt-auto">
        <Container>
          <small>© 2025 대소나무. All rights reserved.</small>
        </Container>
      </footer>
    </>
  );
}

export default MainPage;
