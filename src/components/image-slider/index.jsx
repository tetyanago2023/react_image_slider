import {useEffect, useState} from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./styles.css";


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

    const handlePrevious = () => {
        setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
    }

    const handleNext = () => {
        setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
    }

    useEffect(() => {
        if (url !== "") fetchImages(url)
    }, []);

    if (loading) return <p>Loading...</p>

    if (errorMsg) return <p>Error occurred: {errorMsg}</p>

    return (
        <div className="container">
            <BsArrowLeftCircleFill onClick={handlePrevious} className={"arrow arrow-left"} />
            {
               images && images.length
                   ? images.map((imageItem, index) =>
                        <img
                            key={imageItem.id}
                            alt={imageItem.download_url}
                            src={imageItem.download_url}
                            className={
                                currentSlide === index
                                    ? "current-image"
                                    : "current-image hide-current-image"
                            }
                        />
                   )
                   : null
            }
            <BsArrowRightCircleFill onClick={handleNext} className={"arrow arrow-right"} />
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