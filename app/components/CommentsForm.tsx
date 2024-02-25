"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FC, FormEvent, useState } from "react"

interface CommentsFormProps{
    postid:string
}

const  CommentsForm :FC<CommentsFormProps> = ({postid})=> {
    const { data } = useSession()
    const router = useRouter();

    const [comment,setComment]=useState<string>('')

    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault()
        setComment(e.target.value)
    }
    const submitComment = async () =>{
        if(comment.trim() !== ''){    
            try {
            
                const newComment = await axios.post('/api/comment', {
                    postId:postid,
                    text: comment,
                  });
                  if (newComment.status === 200) {
                    router.refresh();
                  }
        
            } catch (error) {
              console.error(error);
            }
        }

    }
  return (
    <div>
        <div className="mt-2">
            <label htmlFor="comment" className="text-gray-700 block mb-2 font-bold text-sm">
                Add Comment
            </label>
            <input 
            value={comment}
            onChange={handleChange}
            type="text" className='w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300' name="comment" placeholder="Enter the comment"
            />
            <button onClick={submitComment} disabled={!data?.user?.email} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 my-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 disabled:bg-gray-400 " 
         type="submit">
            Submit Comment
        </button>
        </div>
    </div>
  )
}


export default CommentsForm