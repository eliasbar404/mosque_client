// import React from 'react'
// import { useEditor, EditorContent } from '@tiptap/react'
import Swal from 'sweetalert2';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
// Import all Froala Editor plugins;
import 'froala-editor/js/plugins.pkgd.min.js';
// Import a single Froala Editor plugin.
import 'froala-editor/js/plugins/align.min.js';
// Import a language file.
import 'froala-editor/js/languages/de.js';
// Import a third-party plugin.
import 'froala-editor/js/third_party/image_tui.min.js';
import 'froala-editor/js/third_party/embedly.min.js';
import 'froala-editor/js/third_party/spell_checker.min.js';
// Include font-awesome css if required.
// install using "npm install font-awesome --save"
import 'font-awesome/css/font-awesome.css';
import 'froala-editor/js/third_party/font_awesome.min.js';


import FroalaEditorComponent from 'react-froala-wysiwyg';
import { Input } from "@/components/ui/input"
import { useState ,useRef} from "react";
import {CloudUpload ,ArrowBigLeft} from 'lucide-react'
import {Link} from 'react-router-dom'

const CreateArticles = () => {
  // const editor = useEditor()
  const [title,setTitle] = useState("");
  const [slug,setSlug]   = useState("");
  const [description,Setdescription] = useState("");
  const fileUploadRef = useRef(null);
  const [image, setImage] = useState(null);

  const [imageUrl ,setImageUrl] = useState("")

  const uploadImageDisplay = async (e) => {
    const uploadedFile = fileUploadRef.current.files[0];
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    setImage(uploadedFile);
}

  const onSubmit = async(e)=>{
    e.preventDefault()
    const token = localStorage.getItem("token");
    
    // Create a FormData object
    const formData = new FormData();
    formData.append('title', title);
    formData.append('slug', slug);
    formData.append('image', image);
    formData.append('description', description);

    try {
      const response = await fetch(`http://localhost:8000/api/articles`, {
          method: "POST",
          headers: {
              Authorization: `Bearer ${token}`,  // Authorization header
              // Do not manually set Content-Type, let fetch handle it
          },
          body: formData,  // Use formData as the request body
      });

      if (!response.ok) {
          Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Failed to update profile!",
          });
          return;
      }

      Swal.fire("Create Article successfully!");
      setTitle("")
      setImageUrl("")
      setSlug("")
      Setdescription("")
      
  } catch (err) {
      console.log(err);
  }





    console.log(description)
  }
  return (
    <div>
        <Link to="/dashboard/articles" className="flex items-center"><ArrowBigLeft size={80} className="p-2"/> <span className="font-mono font-black text-2xl">Back</span></Link>
      
        <h2 className="text-center text-xl font-mono font-black p-4">Create new article Page</h2>
        <form className="m-10 flex flex-col gap-3" onSubmit={onSubmit}>
            {/* title */}
            <label htmlFor="title" className="flex flex-col justify-start gap-2">
              <span className="text-lg font-black font-mono">Title</span>
              <Input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} id="title" name="title" placeholder="Title" />
            </label>
            {/* slug */}
            <label htmlFor="slug" className="flex flex-col justify-start gap-2">
              <span className="text-lg font-black font-mono">Slug</span>
              <Input type="text" value={slug} onChange={(e)=>setSlug(e.target.value)} id="slug" name="slug" placeholder="Slug" />
            </label>
            {/* Image */}
            <label htmlFor="image" className="flex gap-2 bg-gray-800 hover:bg-gray-700 text-white text-base px-5 py-3 outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]">
                <CloudUpload />
                <span className="font-mono">Upload Images</span>
                <input type="file" ref={fileUploadRef} id='image' className="hidden" onChange={uploadImageDisplay}/>
            </label>
            {/* Display Image */}

              {
                imageUrl && <img  src={imageUrl} className="w-[600px] h-[300px] mx-auto mt-5"/>
              }


            {/* </div>  */}

            {/* Description */}
            <label htmlFor="description" className="text-lg font-black font-mono">Description</label>
            <FroalaEditorComponent tag='textarea'  id="description" model={description} onModelChange={Setdescription} />


            <button type="submit" className="bg-green-500 self-center text-xl font-mono font-black px-10 py-2 text-slate-50 mt-5 hover:bg-green-800">Submit</button>

    



        </form>

        

        
        
        
    </div>
  )
}

export default CreateArticles