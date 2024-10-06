import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/languages/de.js';
import 'froala-editor/js/third_party/image_tui.min.js';
import 'froala-editor/js/third_party/embedly.min.js';
import 'froala-editor/js/third_party/spell_checker.min.js';
import 'font-awesome/css/font-awesome.css';
import 'froala-editor/js/third_party/font_awesome.min.js';

import axios from 'axios';
            


import FroalaEditorComponent from 'react-froala-wysiwyg';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useState ,useRef} from "react";
import {CloudUpload,ArrowBigLeft} from 'lucide-react'








import { useParams } from "react-router-dom";
import { useEffect} from "react";
import { Input } from "@/components/ui/input"

const UpdateArticles = () => {
    let { ArticleId } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    
        const [title,setTitle] = useState("");
        const [slug,setSlug]   = useState("");
        const [description,setDescription] = useState("");
        const fileUploadRef = useRef(null);
        const [image, setImage] = useState(null);

        const [imageUrl ,setImageUrl] = useState("")

        const uploadImageDisplay = async (e) => {
            const uploadedFile = fileUploadRef.current.files[0];
            setImageUrl(URL.createObjectURL(e.target.files[0]));
            setImage(uploadedFile);
        }
    
    const OnUpdate = async(e)=>{
        e.preventDefault()
        
        const token = localStorage.getItem("token");
            const Article_id = article.id
        // Create a FormData object
            const formData = new FormData();
            // formData.append('id',article.id)
            formData.append('title', title);
            formData.append('slug', slug);
            formData.append('image', image);
            formData.append('description', description);

            try {
                axios.post(
                    `http://localhost:8000/api/articles/${Article_id}/update`,
                    formData,  // Send data directly, Axios will handle JSON conversion
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,  // Authorization header
                        },
                    }
                );
            
                Swal.fire("Update Article successfully!");
            
            } catch (err) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to update Article!",
                });
                console.log(err);
            }


    }

    useEffect(() => {
        const fetchArticleData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/articles/${ArticleId}`, {
                    method: 'GET',
                    headers: {
                        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch Articles');
                }

                const data = await response.json();
                setArticle(data);
                setTitle(data.title)
                setDescription(data.description)
                setSlug(data.slug)
                setImageUrl(`http://localhost:8000/${data.image}`)
                
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (ArticleId) {
            fetchArticleData();
        }
    }, [ArticleId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <Link to="/dashboard/articles" className="flex items-center"><ArrowBigLeft size={80} className="p-2"/> <span className="font-mono font-black text-2xl">Retour</span></Link>
            
            {article ? <span></span> : <span>No article found</span>}
            {article &&     <div>
                

    
        <h2 className="text-center text-xl font-mono font-black p-4">Mettre à jour l'article {article.id}</h2>
        <form className="m-10 flex flex-col gap-3" onSubmit={OnUpdate}>
            {/* title */}
            <label htmlFor="title" className="flex flex-col justify-start gap-2">
                <span className="text-lg font-black font-mono">Titre</span>
                <Input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}  id="title" name="title" placeholder="Title" />
            </label>
            {/* slug */}
            <label htmlFor="slug" className="flex flex-col justify-start gap-2">
                <span className="text-lg font-black font-mono">Slug</span>
                <Input type="text" value={slug} onChange={(e)=>setSlug(e.target.value)} id="slug" name="slug" placeholder="Slug" />
            </label>
            {/* Image */}
            <label htmlFor="image" className="flex gap-2 bg-gray-800 hover:bg-gray-700 text-white text-base px-5 py-3 outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]">
                <CloudUpload />
                <span className="font-mono">Télécharger une image</span>
                <input type="file" ref={fileUploadRef} id='image' className="hidden" onChange={uploadImageDisplay}/>
            </label>
            {/* Display Image */}
            { imageUrl && <img  src={imageUrl} className="w-[600px] h-[300px] mx-auto mt-5"/> }


            {/* Description */}
            <label htmlFor="description" className="text-lg font-black font-mono">Description</label>
            <FroalaEditorComponent tag='textarea'  id="description" model={description}  onModelChange={setDescription}/>


            <button type="submit" className="bg-green-500 self-center text-xl font-mono font-black px-10 py-2 text-slate-50 mt-5 hover:bg-green-800">Mise à jour</button>

        </form>

    </div>}

</div>
    );
};

export default UpdateArticles;
