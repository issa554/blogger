import { FC } from "react"
import prisma from "../lib/db"
import { format } from 'date-fns';

interface CommentProps{
    postid:string
}

const Comments :FC<CommentProps> = async ({postid}) => {
    const comments = await prisma.comment.findMany({
        where:{
            postId:postid
        },
        include: {
          author: true,
        },
      })
  return (
    <div className="mt-8">
        <h2 className="text-2xl font-bold">Comments</h2>
        <ul>
            {comments.map((comment)=>(

            <li className="mb-4 bg-slate-300 p-2" key={comment.id}>
                <div className="flex mb-2 items-center">
                    <div className="text-blue-500 font-bold mr-2">
                        {comment.authorEmail} 
                    </div>
                    <div className="text-gray-500">
                    {format(comment.createdAt, 'MMMM d, yyyy')}

                        </div>
                </div>
                <p>
                    {comment.text}
                </p>
            </li>
            ))}
        </ul>
    </div>
  )
}

export default Comments