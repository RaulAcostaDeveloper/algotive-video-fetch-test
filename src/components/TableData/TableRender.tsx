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
// La vista de la tabla
export const TableRender = ({dataTable, loadingData, fetchError, isDissabledButton, askForMoreData}: Props) => {
    return (
        <div className="tableRender">
            <div>
                <h3>Table</h3>
            </div>
            { loadingData?
                <LoadingView/>
                :
                <div>
                    { fetchError ?
                        <ErrorView/>
                        :
                        <div className="dataBlock">

                            <div>
                                { dataTable.map( videoData =>
                                    <TableRow videoData = { videoData }/>
                                )}
                            </div>
                            <button 
                                // Este botón se desactiva si no hay más data que solicitar seún la respuesta de la API 
                                // Nótese el detalle en el title...
                                className="getMoreDataButton" title={`get more data ${isDissabledButton ? ' (disabled)' : ''}`} onClick={()=>askForMoreData()} disabled = { isDissabledButton }>+</button>
                        </div>
                    }
                </div>
            }
        </div>
    )
}