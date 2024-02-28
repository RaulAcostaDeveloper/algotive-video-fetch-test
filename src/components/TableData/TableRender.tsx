import { LoadingView } from "../Loadings/LoadingView";
import { ErrorView } from "../Loadings/ErrorView";
import { TableRow } from "./TableRow";
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
    dataTable: Video[],
    loadingData: boolean,
    fetchError: boolean,
    isDissabledButton: boolean,
    askForMoreData: ()=>void,
}
// The view of the table
export const TableRender = ({ dataTable, loadingData, fetchError, isDissabledButton, askForMoreData }: Props) => {
    return (
        <div className="tableRender">
            <h3>Table</h3>
            { loadingData ?
                <LoadingView/>
                :
                <div>
                    { fetchError ?
                        <ErrorView/>
                        :
                        <div className="dataBlock">
                            <div>
                                { dataTable.map((videoData, index) =>
                                    <TableRow key={ index } videoData = { videoData }/>
                                )}
                            </div>
                            <button 
                                // This button is disabled if there is no more data to request according to the API response
                                // Notice the detail in the title...
                                className="getMoreDataButton" 
                                title={`get more data ${ isDissabledButton ? ' (disabled)' : '' }`} 
                                onClick={()=>askForMoreData()} 
                                disabled = { isDissabledButton }>+</button>
                        </div>
                    }
                </div>
            }
        </div>
    )
}
// Comentarios en español
// La vista de la tabla
// Este botón se desactiva si no hay más data que solicitar seún la respuesta de la API 
// Nótese el detalle en el title...