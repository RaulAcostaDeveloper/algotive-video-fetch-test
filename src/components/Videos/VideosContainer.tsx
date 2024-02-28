import { useEffect, useState } from "react"
import { VideoComponent } from "./VideoComponent";
const defaultUrl = 'http://localhost:8000/api/v1/videos/';
export const VideosContainer = () => {

    // An array of the video URLs
    // As spaces become available, the array adds URLs
    // These URLs are to make calls to the API and obtain the real video URL
    // Example: get 'http://localhost:8000/api/v1/videos/1/' = 'youtube.com/realUrl'
    const [getUrlsArray, setGetUrlsArray] = useState<Array<string>>([]);

    // A counter for the number of videos to be displayed on screen
    const [counter, setCounter] = useState(1);
    
    useEffect(()=>{
        // Each time the number of videos on screen increases,
        // a new URL will be added, with the id to request
        // (the counter works as an id since the videos go from 1,2,3,4, etc)
        // Here comes out a warning in console but getUrlsArray is not a dependence
        const videosApi = getUrlsArray.map(urlVid => urlVid);
        videosApi.push(defaultUrl + counter + '/');
        setGetUrlsArray(videosApi);
    },[counter]);

    // With the intersection observer,
    // if the element is within view, add 1 to the number of videos
    const updateCounter = () => {
        setCounter(counter + 1);
    }
    return (
        <div className="videosContainer">
            <h2 className="videosTitle">Video rendering</h2>
            { getUrlsArray.map((getUrl, index) =>
                <div key={ index + getUrl } className="videoElement">
                    <VideoComponent getUrl = { getUrl } updateCounter={ updateCounter }/>
                </div>
            )}
        </div>
    )
}
// Comentarios en español
// Un array de los url de los videos
// A medida que los espacios aparecen, el arreglo suma urls
// Esas url son para hacer los llamados a la api y obtener el url real del video
// Ejemplo: get 'http://localhost:8000/api/v1/videos/1/' = 'youtube.com/urlReal'
// Un contador para la cantidad de videos a mostrar en pantalla
// Cada vez que la cantidad de videos en screen aumenta
// se va a sumar un url nuevo, con el id a solicitar 
// (el counter funciona como id ya que los videos van de 1,2,3,4,etc)
// Aquí sale un warning pero es mejor así
// Con el intersection observer
// si el elemento está dentro de la vista, añade 1 a la cantidad de videos