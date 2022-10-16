import React,{useState} from "react"
import {ref,uploadBytesResumable,getDownloadURL} from "firebase/storage"
 import { storage } from "../firebase/fireabseConfig";
    // State to store uploaded file
    function UploadImage () {
    const [file, setFile] = useState("");
 
    // progress
    const [percent, setPercent] = useState(0);
 
    function handleImageChange(event) {
        setFile(event.target.files[0]);
    }
 
    const handleUpload = () => {
        if (!file) {
            alert("Please upload an image first!");
        }
        const storageRef = ref(storage, `/images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        console.log("Upload Task",uploadTask)
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log("Download URL",url);
                });
            }
        );
    };
 
    return (
        <div>
            <input type="file" onChange={handleChange} accept="/image/*" />
            <button onClick={handleUpload}>Upload to Firebase</button>
            <p>{percent} "% done"</p>
        </div>
    );
}
 
export default UploadImage