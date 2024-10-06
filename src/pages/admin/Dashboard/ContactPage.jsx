import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import {ArrowBigLeft} from 'lucide-react'

const ContactPage = () => {
    let { ContactId } = useParams();
    // eslint-disable-next-line no-unused-vars
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName]   = useState("");
    const [phoneNumber,setPhoneNumber]   = useState("");
    const [email,setEmail]   = useState("");
    const [message,setMessage]   = useState("");
    const [createAt,setCreateAt]   = useState("");


    useEffect(() => {
        const fetchContactData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/contacts/${ContactId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch Articles');
                }

                const data = await response.json();
                setContact(data);
                setFirstName(data.first_name)
                setLastName(data.last_name)
                setPhoneNumber(data.phone_number)
                setEmail(data.email)
                setMessage(data.message)
                setCreateAt(data.created_at)

                
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (ContactId) {
            fetchContactData();
        }
    }, [ContactId]);


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    return (
        <div>
            <Link to="/dashboard/contacts" className="flex items-center"><ArrowBigLeft size={80} className="p-2"/> <span className="font-mono font-black text-2xl">Retour</span></Link>
            <div className="py-16 px-5 mt-10 flex flex-col gap-3">
            <h4 className="font-black text-3xl">Nom et Prénom:</h4>
            <h4 className="font-black text-3xl text-slate-400">{firstName+" "+lastName}</h4>
            <h4 className="font-black text-3xl">E-mail:</h4>
            <h4 className="font-black text-3xl text-slate-400">{email}</h4>
            <h4 className="font-black text-3xl">Numéro de téléphone:</h4>
            <h4 className="font-black text-3xl text-slate-400">{phoneNumber}</h4>

            <h4 className="font-black text-3xl">Message:</h4>
            <p className="font-bold text-slate-600 p-2 border-solid border-2">{message}</p>


            <h4 className="font-extrabold">{createAt}</h4>
            
        </div>
        </div>

    )
}

export default ContactPage