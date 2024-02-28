import { useEffect, useRef, useState } from "react";
import getVideosByPage from "../../ApiCalls/getVideosByPage";
import { LoadingView } from "../Loadings/LoadingView";
type Props = {
    getUrl: string,
    updateCounter: ()=> void,
}
export const VideoComponent = ({ getUrl, updateCounter }: Props) => {
    const [isLoading, setIsLoading] = useState(true);

    // YouTube video URL (NOT the API URL)
    const [videoUrl, setVideoUrl] = useState('');
    const [titleVideo, setTitleVideo] = useState('');
    const [releaseDateVideo, setReleaseDateVideo] = useState('');

    // A prop to control the fact that at some point there are no more videos in the API
    const [noMoreVideosInStock, setNoMoreVideosInStock] = useState(false);

    // A prop to control the view of the intersection observer
    const [isThisAreaVisible, setIsThisAreaVisible] = useState(false);

    // useRef to control the intersection observer
    const videoRef = useRef(null);

    useEffect(()=>{
        // If the DOM is within the visual area, activate the "isThisAreaVisible" state
        const observer = new IntersectionObserver( entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsThisAreaVisible(entry.isIntersecting);
                }
            });
        });

        // This component is being observed (it's part of the array)
        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        // In case this component is unrendered
        return ()=> {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        }
    },[]);

    useEffect(()=>{

        // Only if the area is visible, it will call the API
        // to obtain the string that is the video URL
        if (isThisAreaVisible) {

            // This is a self-executing function
            (async () => {
                setIsLoading(true);
                const response = await getVideosByPage(getUrl);
                
                // If there is a response, it means the video exists
                if (response) {
                    setVideoUrl(response.url);
                    setNoMoreVideosInStock(false);
                    setTitleVideo(response.title);
                    setReleaseDateVideo(response.release_date);                    
                } else {

                    // For practical purposes, it is indicated that there are no more videos
                    // But this lack of videos could be due to an error
                    setNoMoreVideosInStock(true);
                }
                setIsLoading(false);
            })();
        }
    },[isThisAreaVisible]);

    // This method is executed when the iframe has successfully loaded
    const handleLoaded = () => {
        setIsLoading(false);
        
        // From the parent component, execute this method to know that this component has loaded
        // And therefore, it can ask if there is a new video
        // Extra. Once it has detected once that there are no more videos, there is no need to search further
        // This happens when more than one video can fit on the screen
        if (!noMoreVideosInStock) {
            updateCounter();
        }
    }

    return (
        <div ref={ videoRef } className="videoComponent">
            { isThisAreaVisible &&
                <div className="visibleArea">
                    { isLoading && <LoadingView/> }
                    { noMoreVideosInStock ? 
                        <div className="noMoreVideosInStock">
                            <img src="./images/pronto.gif" alt="no more videos in stock" />
                        </div>
                        :
                        <div className="videoBlockContainer">
                            <iframe
                                className="iframeVideo"
                                src={ videoUrl }
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Embedded YouTube Video"
                                onLoad={ handleLoaded }></iframe>
                                <div className="infoContainer">
                                    <h3>{ titleVideo }</h3>
                                    <p>Release date: { releaseDateVideo }</p>
                                </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}
// Comentarios en español
// URL del video de youtube (NO es el url de la api)
// Una prop para controlar el hecho de que en algún punto no hay más videos en la API
// Una prop para controlar la vista del intersection observer
// useRef para controlar el intersection observer
// Si el DOM está dentro del area visual, activa el estado "isThisAreaVisible"
// Se está observando este componente (es parte del arreglo)
// En caso que se des renderice este componente
// Solo si el área es visible, va a llamar a la API 
// para obtener el string que es el url del video
// Esta es una función auto ejecutable
// Si hay response, significa que sí existe el video
// Para fines prácticos se indica que no hay más videos
// Pero esta falta de video podría ser derivado de un error
// Este método se ejecuta cuando el iframe ha cargado satisfactoriamente
// Desde el componente padre, ejecuta este método para saber que este componente ha cargado
// Y por lo tanto, puede preguntar si existe un nuevo video
// Extra. Con que haya detectado 1 vez que no hay más videos, no tiene porqué buscar más
// Esto pasa cuando en la pantalla caben más de 1 video