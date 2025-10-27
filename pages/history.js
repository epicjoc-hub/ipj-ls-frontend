import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaSearch } from "react-icons/fa";

const API_URL = "https://present-alberta-ipjls-757d03fe.koyeb.app";

export default function History() {
  const [user, setUser] = useState(null);
  const [tests, setTests] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function bootstrap() {
      const res = await fetch(`${API_URL}/check-tester`, {
        credentials: "include",
      });
      const data = await res.json();

      if (!data.authenticated) {
        window.location.href = "/";
        return;
      }

      setUser(data);

      const h = await fetch(`${API_URL}/tests/history`);
      const t = await h.json();
      setTests(t.tests);
      setFiltered(t.tests);
    }
    bootstrap();
  }, []);
