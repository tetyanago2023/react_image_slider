import {useEffect, useState} from "react";


export default function ImageSlider ({ url, limit = 5, page = 1 }) {

    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetchImages(getUrl) {
        try {
            setLoading(true);
            const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
            const data = await response.json();
            if (data) {
                setImages(data);
                setLoading(false);
            }
        } catch (e) {
            setErrorMsg(e.message)
            setLoading(false);
        }
    }

    useEffect(() => {
        if (url !== "") fetchImages(url)
    }, []);

    if (loading) return <p>Loading...</p>

    if (errorMsg) return <p>Error occurred: {errorMsg}</p>

    return (
        <div className="container">
        <h1>ImageSlider</h1>
        </div>
    )
}