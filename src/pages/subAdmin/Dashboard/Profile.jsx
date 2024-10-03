import { useMe } from "../../../hooks/useMe"
import { useAdminLogin } from "../../../hooks/useAdminLogin";
import { useForm } from "react-hook-form"
import { useState ,useRef} from "react";
import Swal from "sweetalert2";

// import { useNavigate } from "react-router-dom";


const Profile = () => {

    // const navigate = useNavigate();

    // eslint-disable-next-line no-unused-vars
    const { user, loading, error } = useMe("subadmin");
    // eslint-disable-next-line no-unused-vars
    const { register,handleSubmit,formState: { errors },} = useForm();
    const [ profilePicture,setProfilePicture ] = useState(null);
    const fileUploadRef = useRef(null);
    // eslint-disable-next-line no-unused-vars
    const { updateProfile,logout } = useAdminLogin();

    const [ current_password          , SetCurrent_password          ]  = useState("");
    const [ new_password              , SetNew_password              ]  = useState("");
    const [ new_password_confirmation , SetNew_password_confirmation ]  = useState("");



    const uploadImageDisplay = async () => {
        const uploadedFile = fileUploadRef.current.files[0];
        setProfilePicture(uploadedFile);
    }




    const onSubmit = async (data) => {
        const token = localStorage.getItem("token");
    
        // Create a FormData object
        const formData = new FormData();
        
        // Append other form fields
        formData.append('name', data.name);
        formData.append('email', data.email);
    
        // Append the image file if available
        if (profilePicture) {
            formData.append('profile_picture', profilePicture); // Ensure profilePicture is a File object
        }
    
        try {
            const response = await fetch(`http://localhost:8000/api/subadmin/auth/update_profile/${user.id}`, {
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
    
            await Swal.fire("Profile updated successfully!");
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    };


    const PasswordSubmit = async(e)=>{
        e.preventDefault()
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append('current_password', current_password);
        formData.append('new_password', new_password);
        formData.append('new_password_confirmation', new_password_confirmation);

        try {
            const response = await fetch(`http://localhost:8000/api/subadmin/auth/update_password/${user.id}`, {
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
                    text: "Failed to update Password!",
                });
                return;
            }
    
            await Swal.fire("Password updated successfully!");
            await logout();
            // navigate('/admin');
            
        } catch (err) {
            console.log(err);
        }

    }




    

    return loading? <div>Loading...</div>: (
    <div className="p-5">
        <h3 className="text-center font-black font-mono text-2xl">Profile Page</h3>

        <form className="flex flex-col items-center" onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
            <div className="mt-10 w-[200px] h-[200px]">
                <img src={`http://localhost:8000/${user.profile_picture_url}`} className="rounded-full w-[200px] h-[200px]"/>
            </div>
            <div className="p-10 flex flex-col gap-5">
                            {/* Email */}
            <label htmlFor="email" className="flex flex-col gap-1">
                <span className="font-black font-mono text-xl">Email</span>
                <input defaultValue={user.email} {...register("email", { required: true })} type="email" name="email" id="email" className="border-2 w-96 h-10 rounded-md px-2"/>
            </label>
            {/* Name */}
            <label htmlFor="name" className="flex flex-col gap-1">
                <span className="font-black font-mono text-xl">Name</span>
                <input defaultValue={user.name} {...register("name", { required: true })} type="text" name="name" id="name" className="border-2 w-96 h-10 rounded-md px-2"/>
            </label>
            {/* Phone Number */}
            {/* <label htmlFor="phone_number" className="flex flex-col gap-1">
                <span className="font-black font-mono text-xl">Phone Number</span>
                <input defaultValue={user.phone_number} type="text" name="phone_number" id="phone_number" className="border-2 w-96 h-10 rounded-md"/>
            </label> */}
            {/* Profile Picture */}
            <label htmlFor="profile_picture" className="flex flex-col gap-1">
                <span className="font-black font-mono text-xl">Profile Picture</span>
                <input type="file" ref={fileUploadRef} onChange={uploadImageDisplay} className="border-2 w-96 h-10 rounded-md"/>
            </label>

            </div>

            <button type="submit" className="bg-blue-500 font-black font-mono text-slate-50 rounded-md px-10 py-3 text-xl hover:bg-blue-800">
                Update Profile
            </button>

        </form>


        <form onSubmit={PasswordSubmit} className="flex flex-col items-center gap-3 justify-center mt-20">
            <h6 className="font-mono font-black text-3xl underline">Change Password</h6>
            {/* Current Password */}
            <label htmlFor="current_password" className="flex flex-col gap-1 mt-11">
                <span className="font-black font-mono text-xl">Current Password</span>
                <input  type="password" value={current_password} onChange={(e)=>SetCurrent_password(e.target.value)} name="current_password" id="current_password" className="border-2 w-96 h-10 rounded-md px-2"/>
            </label>
            {/* New password */}
            <label htmlFor="new_password" className="flex flex-col gap-1">
                <span className="font-black font-mono text-xl">New Password</span>
                <input  type="password" value={new_password} onChange={(e)=>SetNew_password(e.target.value)} name="new_password" id="new_password" className="border-2 w-96 h-10 rounded-md px-2"/>
            </label>
            {/* new password confrimation */}
            <label htmlFor="new_password_confirmation" className="flex flex-col gap-1">
                <span className="font-black font-mono text-xl">New Password Confirmation</span>
                <input  type="password" value={new_password_confirmation} onChange={(e)=>SetNew_password_confirmation(e.target.value)} name="new_password_confirmation" id="new_password_confirmation" className="border-2 w-96 h-10 rounded-md px-2"/>
            </label>

            <button type="submit" className="bg-blue-500 mt-5 font-black font-mono text-slate-50 rounded-md px-10 py-3 text-xl hover:bg-blue-800">
                Update Password
            </button>
        </form>
    </div>
)
}

export default Profile