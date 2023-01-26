import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Card,
  CloseButton,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (text.trim()) {
      if (!todos.filter((item) => item.text === text).length) {
        setTodos((last) => [...last, { text, status: false }]); //key va object yekiye ,text
        toast.success("you are done",
        {position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"})
      } else {
        toast.error("added befor",
        {position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"})
      }
    }
    setText("");
  };
  const removeTodo = (index) => {
    
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setTodos((last) => {
          const help = [...last];
          help.splice(index, 1);
          return [...help];
        });
        // Swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )
        toast.success("you are done",
        {position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"})
      }
    })
    
  };

  const chengeStatus = (index) => {
    setTodos((last) => {
      const help = JSON.parse(JSON.stringify(last)); //use strict gozashtam
      // const help=[...last];
      help[index].status = !help[index].status;
      return [...help];
    });
  };

  return (
    <div className="App">
      <ToastContainer />
      <Form onSubmit={(e) => e.preventDefault()}>
        <Container>
          <Row>
            <Col sm="8">
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter todos"
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                  value={text}
                />
              </Form.Group>
            </Col>
            <Col sm={{ offset: 0, span: 2 }}>
              <Button variant="primary" type="submit" onClick={addTodo}>
                Submit
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>

     
      <Container>
        <Row >
        {todos.map((item, index) => {
          return (
              <Col xs="4" key={index}>
              <Card bg={item.status ? "success":"danger"} style={{ width: "12rem" }} className="mb-2">
                <Card.Body>
                  <Card.Text>{item.text}</Card.Text>
                  <CloseButton onClick={()=>removeTodo(index)}/>
                  <Button variant={item.status ? "danger":"success"}
                  onClick={()=>chengeStatus(index)}
                  >
                    {item.status ? "undone":"done"}</Button>
                </Card.Body>
              </Card>
              </Col>
          );
        })}
            </Row>
      </Container>
    </div>
  );
}

export default App;
