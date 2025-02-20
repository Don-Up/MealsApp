"use client"

import classes from "./index.module.css"
import React, {useRef, useState} from "react";
import Image from "next/image";

export default function ImagePicker({label, name}: {label: string, name: string}){
    const [pickedImage, setPickedImage] = useState<string | ArrayBuffer | null>(null)
    const imageInputRef = useRef<HTMLInputElement>(null)
    function handlePickClick(){
        imageInputRef.current?.click()
    }

    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>){
        const file = event.target.files?.[0]
        if(!file){
            return 
        }
        
        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPickedImage(fileReader.result)
        }
        fileReader.readAsDataURL(file)
    }

    return <div className={classes.picker}>
        <label htmlFor={name}>{label}</label>
        <div className={classes.controls}>
            <div className={classes.preview}>
                {!pickedImage && <p>No Image Picked</p>}
                {pickedImage && <Image src={pickedImage as string} alt={"Preview"} fill/>}
            </div>
            <input
                className={classes.input}
                type={"file"}
                id={name}
                accept={"image/png, image/jpeg"}
                name={name}
                ref={imageInputRef}
                onChange={handleImageChange}
            />
            <button
                className={classes.button}
                type={"button"}
                onClick={handlePickClick}
            >
                Pick an Image
            </button>
        </div>
    </div>
}