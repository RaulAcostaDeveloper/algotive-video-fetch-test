import { useState } from "react";
import { LoadingView } from "../Loadings/LoadingView";
import { ErrorView } from "../Loadings/ErrorView";

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
        <div>
            { loadingData?
                <LoadingView/>
                :
                <div>

                    { fetchError ?
                        <ErrorView/>
                        :
                        <div>Data Tabla</div>
                    }
                </div>
            
            }
        </div>
    )
}