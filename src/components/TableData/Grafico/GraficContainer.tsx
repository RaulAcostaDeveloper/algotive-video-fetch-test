import { ErrorView } from "../../Loadings/ErrorView";
import { LoadingView } from "../../Loadings/LoadingView";
import { CircularChart } from "./CircularChart";

type ChartData = {
    lessThan5: number;
    between5and10: number;
    between10and15: number;
    moreThan15: number;
}
type Props = {
    chartData: ChartData,
    loadingData: boolean,
    fetchError: boolean,
}
export const GraficContainer =({chartData, loadingData, fetchError}: Props)=> {
    // Data para la gráfica
    const videosData = [
        { label: 'Menos de 5 años', difference: chartData.lessThan5 },
        { label: 'Entre 5 y 10 años', difference: chartData.between5and10 },
        { label: 'Entre 10 y 15 años', difference: chartData.between10and15 },
        { label: 'Más de 15 años', difference: chartData.moreThan15},
        // Añade más datos según sea necesario
    ];
    return (
        <div className="graficContainer">
            <h3 className="description">Gráfico de diferencia de Tiempo</h3>
            <p className="description">En este gráfico se analiza la frecuencia de la diferencia de tiempo que ocurre entre la fecha de creación del video y la fecha de su publicación en base a los datos de la tabla.</p>
            {loadingData?
                <LoadingView/>
                :
                <div>
                { fetchError ? 
                    <ErrorView/>
                :
                    <CircularChart data={videosData} />
                }
                </div>
            }
        </div>
    )
}