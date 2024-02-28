import { useEffect, useRef, useState } from "react";
import getVideosByPage from "../../ApiCalls/getVideosByPage";
import { LoadingView } from "../Loadings/LoadingView";

type Props = {
    getUrl: string,
    updateCounter: ()=> void,
}
export const VideoComponent = ({getUrl, updateCounter}: Props) => {
    const [isLoading, setIsLoading] = useState(true);
    // URL del video de youtube (NO es el url de la api)
    const [videoUrl, setVideoUrl] = useState('');
    // Una prop para controlar el hecho de que en algún punto no hay más videos en la API
    const [noMoreVideosInStock, setNoMoreVideosInStock] = useState(false);
    // Una prop para controlar la vista del intersection observer
    const [isThisAreaVisible, setIsThisAreaVisible] = useState(false);

    // useRef para controlar el intersection observer
    const videoRef = useRef(null);

    useEffect(()=>{
        // Si el DOM está dentro del area visual, activa el estado "isThisAreaVisible"
        const observer = new IntersectionObserver( entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsThisAreaVisible(entry.isIntersecting);
                }
            });
        });
        // Se está observando este componente (es parte del arreglo)
        if (videoRef.current) {
            observer.observe(videoRef.current);
        }
        // En caso que se des renderice este componente
        return ()=> {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        }
    },[]);

    useEffect(()=>{
        // Solo si el área es visible, va a llamar a la API 
        // para obtener el string que es el url del video
        if (isThisAreaVisible) {
            // Esta es una función auto ejecutable
            (async () => {
                setIsLoading(true);
                const response = await getVideosByPage(getUrl);
                // Si hay response es que si existe el video
                if (response) {
                    setVideoUrl(response.url);
                    setNoMoreVideosInStock(false);
                } else {
                    // Para fines prácticos se indica que no hay más videos
                    // Pero esta falta de video podría ser derivado de un error
                    setNoMoreVideosInStock(true);
                }
                setIsLoading(false);
            })();
        }
    },[isThisAreaVisible]);

    // Este método se ejecuta cuando el iframe ha cargado satisfactoriamente
    const handleLoaded = () => {
        setIsLoading(false);
        // Desde el componente padre, ejecuta este método para saber que este componente ha cargado
        // Y por lo tanto, puede preguntar si existe un nuevo video
        // Extra. Con que haya detectado 1 vez que no hay más videos, no tiene porqué buscar más
        // Esto pasa cuando en la pantalla caben más de 1 video
        if (!noMoreVideosInStock) {
            updateCounter();
        }
    }

    return (
        <div ref={ videoRef } className="videoComponent">
            { isThisAreaVisible &&
                <div>
                    { isLoading && <LoadingView/> }
                    { noMoreVideosInStock ? 
                        <div>No more videos in stock ;) </div>
                        :
                        <iframe
                            src={ videoUrl }
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded YouTube Video"
                            width="320" 
                            height="315"
                            onLoad={ handleLoaded }></iframe>
                    }
                </div>
            }
        </div>
    )
}