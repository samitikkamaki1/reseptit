import { useParams } from "react-router-dom";

export default function Reseptit() {
  const { id } = useParams();
  return <h1>Resepti {id}</h1>;
}