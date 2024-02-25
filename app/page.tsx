import Image from "next/image";
import NewPostForm from "./components/NewPostForm";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto my-5">
      <NewPostForm />
    </main>
  );
}
