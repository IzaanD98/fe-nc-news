import { getUsers } from "../utils/api";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const UserInfo = () => {
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const handleUserSwitch = (user) => {
    setUser(user);
    alert(`Switched User to ${user.username}`);
    navigate("/");
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <section className="userInfo my-5 text-center">
        <p>Logged In as:</p>
        <img
          src={user.avatar_url}
          alt={user.username}
          style={{ width: "200px" }}
        />
        <h2>{user.username}</h2>
        <p>{user.name}</p>
      </section>
      {loading && <h3 className="text-center">Loading....</h3>}
      <div className="container my-5">
        <div className="row row-cols-lg-2 row-cols-xl-3 justify-content-center g-3">
          {users.map((user) => {
            return (
              <div key={user.username} className="col">
                <Card>
                  <Card.Img
                    variant="top"
                    src={user.avatar_url}
                    alt={user.username}
                    style={{ width: "100%", maxHeight: "400px" }}
                  />
                  <Card.Body className="d-flex flex-column card-body-height">
                    <div className="mb-2 article-info">
                      <div>
                        <Card.Text> {user.username}</Card.Text>
                        <Card.Text>{user.name}</Card.Text>
                      </div>
                      <div className="card-buttons">
                        <Button
                          variant="danger"
                          onClick={() => handleUserSwitch(user)}
                        >
                          Switch User
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
