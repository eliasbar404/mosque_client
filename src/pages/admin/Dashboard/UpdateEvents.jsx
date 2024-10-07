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
import {Trash2,X,Check} from "lucide-react"
            


import FroalaEditorComponent from 'react-froala-wysiwyg';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useState ,useRef} from "react";
import {CloudUpload,ArrowBigLeft} from 'lucide-react'








import { useParams } from "react-router-dom";
import { useEffect} from "react";
import { Input } from "@/components/ui/input"

const UpdateEvents = () => {
    let { EventId } = useParams();
    const [event, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    
        const [title,setTitle] = useState("");
        const [slug,setSlug]   = useState("");
        const [description,setDescription] = useState("");
        const [start_time,setStart_time]   = useState("");
        const [end_time,setEnd_time]       = useState("");
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
            const Event_id = event.id
        // Create a FormData object
            const formData = new FormData();
            // formData.append('id',article.id)
            formData.append('title', title);
            formData.append('slug', slug);
            formData.append('image', image);
            formData.append('description', description);
            formData.append('start_time', start_time);
            formData.append('end_time', end_time);

            try {
                axios.post(
                    `http://localhost:8000/api/events/${Event_id}/update`,
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
                const response = await fetch(`http://localhost:8000/api/events/${EventId}`, {
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
                setStart_time(data.start_time)
                setEnd_time(data.end_time)
                
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (EventId) {
            fetchArticleData();
        }
    }, [EventId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <Link to="/dashboard/events" className="flex items-center"><ArrowBigLeft size={80} className="p-2"/> <span className="font-mono font-black text-2xl">Retour</span></Link>
            
            {event ? <span></span> : <span>Aucun événement trouvé</span>}
            {event &&     <div>
                

    
        <h2 className="text-center text-xl font-mono font-black p-4">Mettre à jour l'événement {event.id}</h2>
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
                        {/* Start Time */}
                        <label htmlFor="start_time" className="flex flex-col justify-start gap-2">
              <span className="text-lg font-black font-mono">Heure de début</span>
              <Input type="text" value={start_time} onChange={(e)=>setStart_time(e.target.value)} id="start_time" name="start_time" placeholder="Like That : 2024-09-14 12:34:56" />
            </label>
             {/* End Time */}
            <label htmlFor="end_time" className="flex flex-col justify-start gap-2">
                <span className="text-lg font-black font-mono">Heure de fin</span>
                <Input type="text" value={end_time} onChange={(e)=>setEnd_time(e.target.value)} id="end_time" name="end_time" placeholder="Like That : 2024-09-14 20:34:56" />
            </label>
            {/* Image */}
            <label htmlFor="image" className="flex gap-2 bg-gray-800 hover:bg-gray-700 text-white text-base px-5 py-3 outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]">
                <CloudUpload />
                <span className="font-mono">Télécharger des images</span>
                <input type="file" ref={fileUploadRef} id='image' className="hidden" onChange={uploadImageDisplay}/>
            </label>
            {/* Display Image */}
            { imageUrl && <img  src={imageUrl} className="w-[600px] h-[300px] mx-auto mt-5"/> }


            {/* Description */}
            <label htmlFor="description" className="text-lg font-black font-mono">Description</label>
            <FroalaEditorComponent tag='textarea'  id="description" model={description}  onModelChange={setDescription}/>


            <button type="submit" className="bg-green-500 self-center text-xl font-mono font-black px-10 py-2 text-slate-50 mt-5 hover:bg-green-800">
            Mise à jour</button>

        </form>


        <MembersList EventId={EventId}/>

    </div>}

</div>
    );
};

export default UpdateEvents;











const MembersList = ({EventId})=>{
    const [eventMembers,setEventMembers] = useState([]);


    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line no-unused-vars
    const [articlesPerPage, setArticlesPerPage] = useState(10);

            // Calculate the users to display based on pagination
            const indexOfLastUser = currentPage * articlesPerPage;
            const indexOfFirstUser = indexOfLastUser - articlesPerPage;
            const currentArticles = eventMembers.slice(indexOfFirstUser, indexOfLastUser);
        
            const totalPages = Math.ceil(eventMembers.length / articlesPerPage);
                    // Handle page change
        const paginate = (pageNumber) => setCurrentPage(pageNumber);

    
    useEffect(() => {
        FetchComments()

    }, [EventId]);

    // Fetch comments function
    const FetchComments = async()=>{
        const response = await fetch(`http://localhost:8000/api/events/${EventId}/join/members`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        setEventMembers(data[0]["members"]);
        // console.log(data[0]["members"])
    }

    // delete  comment

    const EventMemberStatus = async(EventMemberID,data)=>{
        const response = await fetch(`http://localhost:8000/api/events/join/${EventMemberID}/status`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: data
            })
        });

        if(response.ok){
            window.location.reload()
        }

    }


    
    return(
        <div className='font-[sans-serif] overflow-x-auto w-[90%] mx-auto'>
            <h4 className='font-mono font-extrabold text-center text-xl m-3'>membres inscrits à l'événement</h4>
        <table className="min-w-full bg-white">
            <thead className="whitespace-nowrap">
                <tr>
                    <th className="p-4 text-left text-sm font-semibold text-black">Nom</th>
                    <th className="p-4 text-left text-sm font-semibold text-black">Note</th>
                    <th className="p-4 text-left text-sm font-semibold text-black">Statut</th>
                    <th className="p-4 text-left text-sm font-semibold text-black">Actes</th>
                </tr>
            </thead>
    
            <tbody className="whitespace-nowrap">
                {
                    eventMembers.map((val, index) => (
                        <tr key={index} className="odd:bg-blue-50">
                                    <td className="p-4 text-sm">
                                        <div className="flex items-center cursor-pointer w-max">
                                            <img src={`http://localhost:8000/${val.profile_picture_url}`} className="w-9 h-9 rounded-full shrink-0" />
                                            <div className="ml-4">
                                                <p className="text-sm text-black">{val.first_name} {val.last_name}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">{val.phone_number}</p>
                                            </div>
                                        </div>
                                    </td>

                            <td className="p-4 text-sm">
                                <div className="flex items-center cursor-pointer w-max">
                                {val.pivot.note}
                                </div>
                            </td>

                            <td className="p-4 text-sm">
                                <div className="flex items-center cursor-pointer w-max">
                                {val.pivot.status == "pending"?"en attente":val.pivot.status == "rejected"?"rejeté":"accepté"}
                                </div>
                            </td>


                            <td className="p-4 flex gap-1 mt-4">
                            {/* <X /> */}
                            {
                                (val.pivot.status == "pending" || val.pivot.status == "accepted") && <button title="reject" onClick={()=>EventMemberStatus(val.pivot.id,"rejected")}><X color='red' size={30}/></button>
                            }
                                
                            {
                                (val.pivot.status == "pending" || val.pivot.status == "rejected") && <button title="accept" onClick={()=>EventMemberStatus(val.pivot.id,"accepted")}><Check color='green' size={30}/></button>
                            }

                                {/* <button title="Delete" onClick={()=>DeleteComment(val.id)}>
                                    <Trash2 color='red' size={30}/>
                                </button> */}
    
    
                            </td>
                        </tr>
                    ))
                }
    
                {currentArticles.length === 0 && (
                    <tr>
                        <td colSpan="4" className="p-4 text-sm text-center text-gray-500">
                        Aucun commentaire trouvé.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>

                {/* Pagination Controls */}
                <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500">Affichage {indexOfFirstUser + 1} à {Math.min(indexOfLastUser, eventMembers.length)} de {eventMembers.length} entrées</p>
            
            <ul className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                    <li
                        key={index + 1}
                        className={`cursor-pointer text-sm px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => paginate(index + 1)}
                    >
                        {index + 1}
                    </li>
                ))}
            </ul>
        </div>
        </div>
    )
}