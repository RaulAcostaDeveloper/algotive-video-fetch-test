import { useState } from "react";
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
}
// La vista de la tabla
export const TableRender = ({dataTable, loadingData, fetchError}: Props) => {
    return (
        <div className="TableRender">
            { loadingData?
                <LoadingView/>
                :
                <div>
                    { fetchError ?
                        <ErrorView/>
                        :
                        <div>
                            { dataTable.map( videoData =>
                                <TableRow videoData = { videoData }/>
                            )}
                        </div>
                    }
                </div>
            
            }
            {/* Vista de prueba */}
            {/* <TableRow videoData = {{

                author: 'string',
                created_at: 'string',
                description: 'string',
                id: 1,
                release_date: 'string',
                title: 'string',
                updated_at: 'string',
                url: 'string',
            } }/> */}
        </div>
    )
}