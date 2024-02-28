import { useState } from "react"
interface Video {
    author: string,
    created_at: string,
    description: string,
    id: number,
    release_date: string,
    title: string,
    updated_at: string,
    url: string,
}
type Props = {
    videoData: Video,
}
export const TableRow = ({videoData}: Props) => {
    // A prop to control the view of the component
    const [isOpen, setIsOpen] = useState(false);
    const handleClickHeader =() => {
        setIsOpen(!isOpen);
    }
    // To avoid putting the full link, it can simply be copied if the user needs it
    // A user does not need to see a link
    const handleCopyLink =async()=> {
        try {
          await navigator.clipboard.writeText(videoData.url);
        } catch (err) {
          console.error('Error al copiar: ', err);
        }
    }
    // I'm not sure if these data should be transformed
    return (
        <div className="tableRow">
            <div className="headerRow" onClick={()=>handleClickHeader()}>
                <div className="botonDespliegue">
                    <img src={isOpen ? "./icons/uparrowbold.png" : "./icons/downarrowbold.png"} alt="downArror" />
                </div>
                <div className="dataName">
                    Title
                </div>
                <div className="dataInfo">
                    { videoData.title }
                </div>
            </div>
            {isOpen &&
            <div className="inside">
                <div className="insideRow">
                    <div className="dataName">
                        Author
                    </div>
                    <div className="dataInfo">
                        { videoData.author }
                    </div>
                </div>
                <div className="insideRow">
                    <div className="dataName">
                        Description
                    </div>
                    <div className="dataInfo">
                        { videoData.description }
                    </div>
                </div>
                <div className="insideRow">
                    <div className="dataName">
                        Created at
                    </div>
                    <div className="dataInfo">
                        { videoData.created_at }
                    </div>
                </div>
                <div className="insideRow">
                    <div className="dataName">
                        Release date
                    </div>
                    <div className="dataInfo">
                        { videoData.release_date }
                    </div>
                </div>
                <div className="insideRow">
                    <div className="dataName">
                        Url
                    </div>
                    <div className="dataInfo">
                        <button className="copyUrlButton" onClick={()=>handleCopyLink()}>
                            Copy url 
                            <img src="./icons/copy.png" alt="" />
                        </button>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}
// Comentarios en español
// Una prop para controlar la vista del componente
// Para no poner el link completo, simplemente se puede copiar si el usuario lo necesita
// Un usuario no necesita ver un link
// No se si estos datos deben estar transformados