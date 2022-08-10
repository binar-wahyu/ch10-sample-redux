import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getAccessToken } from "../context/auth";

function ArticleDetail() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState();

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      setLoading(true);
      const response = await fetch(
        `http://localhost:4000/articles/${params.id}`,
        {
          headers: new Headers({
            Authorization: getAccessToken(),
          }),
        }
      );
      const data = await response.json();

      if (ignore) return;

      setLoading(false);
      setArticle(data);
    }

    fetchData();

    return () => {
      ignore = true;
    };
  }, [params.id]);

  return (
    <Container className="mt-3">
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <h1>{article.title}</h1>
          <p>{article.body}</p>
        </>
      )}
    </Container>
  );
}

export default ArticleDetail;
