import {useEffect, useState} from "react";


export default function ImageSlider ({ url, limit }) {

    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null)

    async function fetchImages(getUrl) {
        try {
            const response = await fetch(getUrl);
            const data = await response.json();
            if (data) {
                setImages(data);
            }
        } catch (e) {
            setErrorMsg(e.message)
        }
    }

    useEffect(() => {
        if (url !== "") fetchImages(url)
    }, []);

    return (
        <div className="container">
        <h1>ImageSlider</h1>
        </div>
    )
}