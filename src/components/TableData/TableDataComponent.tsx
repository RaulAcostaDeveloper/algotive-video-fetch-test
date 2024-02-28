import { useEffect, useState } from "react"
import getVideosByPage from "../../ApiCalls/getVideosByPage";
import { TableRender } from "./TableRender";
import { GraficContainer } from "./Grafico/GraficContainer";

type NextUrl = string|null;
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
type ChartData = {
    lessThan5: number;
    between5and10: number;
    between10and15: number;
    moreThan15: number;
}
export const TableDataComponent = () => {
    const [dataTable, setDataTable] = useState<Array<Video>>([]);
    const [loadingData, setLoadingData] = useState<boolean>(false);
    const [fetchError, setFetchError] = useState<boolean>(false);
    const [nextUrl, setNextUrl] = useState<NextUrl>('');
    // Data calculation for the graph
    const [chartData, setChartData] = useState<ChartData>({
        lessThan5:0,
        between5and10:0,
        between10and15:0,
        moreThan15:0,
    });

    useEffect(()=>{
        // At the start of the application, request the first stack of videos
        (async()=>{
            setLoadingData(true);
            const response = await getVideosByPage('http://localhost:8000/api/v1/videos/?page=1');
            setLoadingData(false);
            // Error handling in the component
            if (response) {
                setFetchError(false);
                // If there is a next page, it is stored in this state for later calling
                setNextUrl(response.next);
                setDataTable(response.results);
            } else {
                setFetchError(true);
                console.log('No response in getVideosByPage for first render in TableDataComponent');
            }
        })();
    },[]);

    useEffect(()=>{
        if (fetchError) {
            // Only to see whenever there is an empty response
            console.log('fetchError Se perdió la conexión con el servidor');
        }
    },[fetchError]);

    useEffect(()=>{
        // Calculate the time differences for the graph
        setChartData(getDiferenceOfYears());
    },[dataTable]);

    const handleAskMoreDataForTable = async() => {
        // If there are more data to request for the table
        if (nextUrl) {
            setLoadingData(true);
            // Use the same URL provided by the API to call the next table
            const response = await getVideosByPage(nextUrl);
            setLoadingData(false);
            if (response) {
                setFetchError(false);
                const dataValue = dataTable.map(el=>el);
                response.results.map((el: Video)=> dataValue.push(el));
                setDataTable(dataValue);
                // response.next can be null or bring the next link
                setNextUrl(response.next);
            } else {
                setFetchError(true);
            }
        } else {
            console.log('No hay más páginas en la solicitud');
        }
    }

    const getDiferenceOfYears = () => {
        let lessThan5 = 0;
        let between5and10 = 0;
        let between10and15 = 0;
        let moreThan15 = 0;
        // Analyzes the data obtained in the table and calculates the year differences
        dataTable.map(video =>{
            const inicio = new Date(video.release_date);
            const final = new Date(video.created_at);
            let diferenciaAnios = final.getFullYear() - inicio.getFullYear();
            if (final.getMonth() < inicio.getMonth() || (final.getMonth() === inicio.getMonth() && final.getDate() < inicio.getDate())) {
                diferenciaAnios--;
            }
            // Year difference between when the video was released versus the video's publication date
            if (diferenciaAnios < 5) {
                lessThan5++;
            } else if (diferenciaAnios >= 5 && diferenciaAnios < 10) {
                between5and10++;
            } else if (diferenciaAnios >= 10 && diferenciaAnios < 15) {
                between10and15++;
            } else if (diferenciaAnios >= 15) {
                moreThan15++;
            }
        });
        return {
            lessThan5,
            between5and10,
            between10and15,
            moreThan15,
        }
    }

    return (
        <div className="tableDataComponent">
            <h2 className="titleTable">Data from API</h2>
            <TableRender 
                dataTable={dataTable} 
                loadingData={loadingData} 
                fetchError = {fetchError} 
                isDissabledButton = {nextUrl ? false : true} 
                askForMoreData = {handleAskMoreDataForTable}/>
            <GraficContainer 
                chartData={chartData} 
                loadingData={loadingData} 
                fetchError={fetchError}/>
        </div>
    )
}
// Comentarios en español
// Cálculo de datos para el grafo
// Al inicio de la aplicación, solicita el primer stack de videos
// Manejo del error en el componente
// Si existe una siguiente página, se guarda en este estado para su posterior llamado
// Solo para ver cada que haya una respuesta vacía
// Calcular las diferencias de tiempo para el grafo
// Si hay más datos a solicitar para la tabla
// Se usa la misma url proporcionada por la api para llamar a la siguiente tabla
// response.next puede ser null o traer la siguiente liga
// Analiza los datos obtenidos en la tabla y calcula las diferencias de años
// Diferencia de años entre que salió el video versus la fecha de publicación del video