// import React from 'react'
// import { useEditor, EditorContent } from '@tiptap/react'
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
            
            // Include special components if required.
            // import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
            // import FroalaEditorA from 'react-froala-wysiwyg/FroalaEditorA';
            // import FroalaEditorButton from 'react-froala-wysiwyg/FroalaEditorButton';
            // import FroalaEditorImg from 'react-froala-wysiwyg/FroalaEditorImg';
            // import FroalaEditorInput from 'react-froala-wysiwyg/FroalaEditorInput';

import FroalaEditorComponent from 'react-froala-wysiwyg';
import { Input } from "@/components/ui/input"
import { useState } from "react";
import {CloudUpload ,Trash2,ArrowBigLeft} from 'lucide-react'
import {Link} from 'react-router-dom'

const CreateArticles = () => {
  // const editor = useEditor()
  const [files, setFiles] = useState([]);
  function handleChange(e) {
      console.log(e.target.files);
      setFiles([...files,URL.createObjectURL(e.target.files[0])]);
  }
  return (
    <div>
        <Link to="/dashboard/articles" className="flex items-center"><ArrowBigLeft size={80} className="p-2"/> <span className="font-mono font-black text-2xl">Back</span></Link>
      
        <h2 className="text-center text-xl font-mono font-black p-4">Create new article Page</h2>
        <form className="m-10 flex flex-col gap-3">
            {/* title */}
            <label htmlFor="title" className="flex flex-col justify-start gap-2">
              <span className="text-lg font-black font-mono">Title</span>
              <Input type="text" id="title" name="title" placeholder="Title" />
            </label>
            {/* slug */}
            <label htmlFor="slug" className="flex flex-col justify-start gap-2">
              <span className="text-lg font-black font-mono">Slug</span>
              <Input type="text" id="slug" name="slug" placeholder="Slug" />
            </label>
            {/* Image */}
            <label htmlFor="image" className="flex gap-2 bg-gray-800 hover:bg-gray-700 text-white text-base px-5 py-3 outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]">
                <CloudUpload />
                <span className="font-mono">Upload Images</span>
                <input type="file" id='image' className="hidden" onChange={handleChange}/>
            </label>
            {/* Display Image */}
            {files.length > 0 && <div className="grid grid-cols-4 border-solid border-2 border-black p-1">
              {files.map((val,index)=>(
                <div key={index} className="relative">
                  <img  src={files[index]} className="w-[300px] h-[200px] mx-auto mt-5"/>
                  <Trash2 size={40} color={"white"} className="absolute top-[25px] left-[260px] bg-red-600 p-1 rounded-full cursor-pointer"/>
                </div>
              ))}
            </div> }

            {/* Description */}
            <label htmlFor="description" className="text-lg font-black font-mono">Description</label>
            <FroalaEditorComponent tag='textarea' value="kdkdkkd" id="description"/>


            <button type="submit" className="bg-green-500 self-center text-xl font-mono font-black px-10 py-2 text-slate-50 mt-5 hover:bg-green-800">Submit</button>

    



        </form>

        

        
        
        
    </div>
  )
}

export default CreateArticles