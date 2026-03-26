import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/client";

export default function Post() {
  const { id } = useParams();

  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    async function loadPost() {
      const res = await api.get(`/posts/${id}`);
      setPost(res.data);
    }

    loadPost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>

      <p>Video: {post.videoUrl}</p>

      <h3>Recipe</h3>

      <p>Servings: {post.recipe.servings}</p>
      <p>Time: {post.recipe.timeMinutes} min</p>

      <h4>Ingredients</h4>

      <ul>
        {post.recipe.ingredients.map((i: any) => (
          <li key={i.name}>
            {i.name} — {i.quantity} {i.unit}
          </li>
        ))}
      </ul>

      <h4>Steps</h4>

      <ol>
        {post.recipe.steps.map((s: any) => (
          <li key={s.order}>{s.text}</li>
        ))}
      </ol>
    </div>
  );
}
