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
    // Cálculo de datos para el grafo
    const [chartData, setChartData] = useState<ChartData>({
        lessThan5:0,
        between5and10:0,
        between10and15:0,
        moreThan15:0,
      });

    useEffect(()=>{
        // Al inicio de la aplicación, solicita el primer stack de videos
        (async()=>{
            setLoadingData(true);
            const response = await getVideosByPage('http://localhost:8000/api/v1/videos/?page=1');
            setLoadingData(false);
            // Manejo del error en el componente
            if (response) {
                setFetchError(false);
                // Si existe una siguiente página, se guarda en este estado para su posterior llamado
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
            // Solo para ver cada que haya una respuesta vacía
            console.log('fetchError Se perdió la conexión con el servidor');
        }
    },[fetchError]);

    useEffect(()=>{
        // Calcular las diferencias de tiempo para el grafo
        setChartData(getDiferenceOfYears());
    },[dataTable])

    const handleAskMoreDataForTable = async() => {
        // Si hay más datos a solicitar para la tabla
        if (nextUrl) {
            setLoadingData(true);
            // Se usa la misma url proporcionada por la api para llamar a la siguiente tabla
            const response = await getVideosByPage(nextUrl);
            setLoadingData(false);
            if (response) {
                setFetchError(false);
                const dataValue = dataTable.map(el=>el);
                // !!! Revisar este typescript alert
                // @ts-ignore
                response.results.map(el=> dataValue.push(el));
                setDataTable(dataValue);
                // response.next puede ser null o traer la siguiente liga
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
        // Analiza los datos obtenidos en la tabla y calcula las diferencias de años
        dataTable.map(video =>{
            const inicio = new Date(video.release_date);
            const final = new Date(video.created_at);
            let diferenciaAnios = final.getFullYear() - inicio.getFullYear();
            if (final.getMonth() < inicio.getMonth() || (final.getMonth() === inicio.getMonth() && final.getDate() < inicio.getDate())) {
                diferenciaAnios--;
            }
            // Diferencia de años entre que salió el video versus la fecha de publicación del video
            if (diferenciaAnios < 5) {
                lessThan5++;
            }
            if (diferenciaAnios >= 5 && diferenciaAnios < 10) {
                between5and10++;
            }
            if (diferenciaAnios >= 10 && diferenciaAnios < 15) {
                between10and15++;
            }
            if (diferenciaAnios >= 15) {
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
            <TableRender dataTable={dataTable} loadingData={loadingData} fetchError = {fetchError} isDissabledButton = {nextUrl ? false : true} askForMoreData = {handleAskMoreDataForTable}/>
            <GraficContainer chartData={chartData} loadingData={loadingData} fetchError={fetchError}/>
        </div>
    )
}