import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./styles.css";

export default function ImageSlider({ url, limit = 5, page = 1 }) {
    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchImages = async (getUrl) => {
        setLoading(true);
        try {
            const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
            const data = await response.json();
            if (data) {
                setImages(data);
                setLoading(false);
            }
        } catch (e) {
            setErrorMsg(e.message);
            setLoading(false);
        }
    };

    const handlePrevious = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
    };

    useEffect(() => {
        if (url !== "") fetchImages(url);
    }, [url, page, limit]);

    if (loading) return <p>Loading...</p>;

    if (errorMsg) return <p>Error occurred: {errorMsg}</p>;

    return (
        <div className="container">
            <BsArrowLeftCircleFill onClick={handlePrevious} className="arrow arrow-left" />
            {images && images.length ? (
                images.map((imageItem, index) => (
                    <img
                        key={imageItem.id}
                        alt={imageItem.download_url}
                        src={imageItem.download_url}
                        className={`current-image ${
                            currentSlide === index ? "" : "hide-current-image"
                        }`}
                    />
                ))
            ) : null}
            <BsArrowRightCircleFill onClick={handleNext} className="arrow arrow-right" />
            <span className="circle-indicators">
                {images && images.length ? (
                    images.map((_, index) => (
                        <button
                            key={index}
                            className={`current-indicator ${
                                currentSlide === index ? "" : "inactive-indicator"
                            }`}
                            onClick={() => setCurrentSlide(index)}
                        ></button>
                    ))
                ) : null}
            </span>
        </div>
    );
}
