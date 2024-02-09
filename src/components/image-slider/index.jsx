import {useEffect, useState} from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";


export default function ImageSlider ({ url, limit = 5, page = 1 }) {

    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetchImages(getUrl) {
        setLoading(true);
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

    console.log(images);

    if (loading) return <p>Loading...</p>

    if (errorMsg) return <p>Error occurred: {errorMsg}</p>

    return (
        <div className="container">
            <h1>ImageSlider</h1>
            <BsArrowLeftCircleFill className={"arrow arrow-left"} />
            {
               images && images.length
                   ? images.map((imageItem, index) =>
                        <img
                            key={imageItem.id}
                            alt={imageItem.download_url}
                            src={imageItem.download_url}
                            className="current-image"
                        />
                   )
                   : null
            }
            <BsArrowRightCircleFill className={"arrow arrow-right"} />
            <span className="circle-indicators">
                {
                    images && images.length
                        ? images.map((_, index) =>
                            <button
                                key={index}
                                className="current-indicator"
                            >

                            </button>
                        )
                        : null
                }
            </span>
        </div>
    )
}