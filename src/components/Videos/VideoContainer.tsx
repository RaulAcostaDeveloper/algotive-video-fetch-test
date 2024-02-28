import { useEffect, useState } from "react"
import { VideoComponent } from "./VideoComponent";
const defaultUrl = 'http://localhost:8000/api/v1/videos/';
export const VideoContainer =() => {
    // Un array de los url de los videos
    // A medida que los espacios aparecen, el arreglo suma urls
    // Esas url son para hacer los llamados a la api y obtener el url real del video
    // Ejemplo: get 'http://localhost:8000/api/v1/videos/1/' = 'youtube.com/urlReal'
    const [getUrlsArray, setGetUrlsArray] = useState<Array<string>>([]);
    // Un contador para la cantidad de videos a mostrar en pantalla
    const [counter, setCounter] = useState(1); // puede iniciar en 0 y no hay necesidad de obtener el primer video
    
    // A ver porque no me acuerdo que hace esto
    useEffect(()=>{
        // Cada vez que la cantidad de videos en screen aumenta
        // se va a sumar un url nuevo, con el id a solicitar 
        // (el counter funciona como id ya que los videos van de 1,2,3,4,etc)
        const videosApi = getUrlsArray.map(urlVid => urlVid);
        // Yo hago este videosApi.push porque estoy acostumbrado a manipular los datos del nuevo elemento antes de sumarlos
        videosApi.push(defaultUrl + counter + '/');
        setGetUrlsArray(videosApi);
    },[counter]);

    // Con el intersection observer
    // si el elemento está dentro de la vista, añade 1 a la cantidad de videos
    const updateCounter = () => {
        setCounter(counter + 1);
    }
    return (
        <div className="videoContainer">
            {getUrlsArray.map((getUrl, index)=>
                <div key={index + getUrl}>
                    <VideoComponent getUrl = {getUrl} updateCounter={updateCounter}/>
                </div>
            )}
        </div>
    )
}