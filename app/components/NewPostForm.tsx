"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize"
import { FormData } from "../types/blog";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { useSession } from "next-auth/react";

const inputClass=
'w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300'
export default function NewPostForm() {
  const { data } = useSession()
    const router = useRouter();

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        e.preventDefault()
        const {name , value} = e.target
        setFormData({
            ...formData,
            [name]:value
        })
    }
    const [formData,setFormData] = useState<FormData>({
        title:"",
        content:""
    })

    const handleSubmit = async (e : FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        try {
          const response = await axios.post('api/post', formData);
    
          if (response.status === 200) {
            router.push(`/blogs/${response.data.newPost.id}`);
          }
        } catch (error) {
          console.error(error);
        }

    }

  return (
    <form className="max-w-md mx-auto p-4 " onSubmit={handleSubmit}>
        <div className="mb-4">
            <input type="text" className={inputClass} name="title" placeholder="Enter the title"
            onChange={handleChange}
            />
        </div>
        
        <div className="mb-4">
            <ReactTextareaAutosize name="content" minRows={5}
            className={inputClass} placeholder="Enter the content"
            onChange={handleChange}

            />
        </div>
        <button disabled={!data?.user?.email}  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 disabled:bg-gray-400 w-full " 
         type="submit">
            Post
        </button>
    </form>
  )
}
