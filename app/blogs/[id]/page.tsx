import Comments from "@/app/components/Comments"
import CommentsForm from "@/app/components/CommentsForm"
import prisma from "@/app/lib/db"
import { FC } from "react"

interface BlogPageDeProps{
  params:{
    id:string
  }
}
const page :FC<BlogPageDeProps> = async ({params}) => {
  const post = await prisma.post.findFirst({
    where:{
      id:params.id
    }
  })
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className=" text-3xl font-bold">
        {post?.title}
      </h1>
      <p>Written BY : {post?.authorEmail}</p>
      <div className="mt-4">{post?.content}</div>
      <Comments postid={params.id} />
      <CommentsForm postid={params.id} />

    </div>
  )
}

export default page