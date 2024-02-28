const apiUrl = 'http://localhost:8000/api/v1/videos/';
const getVideosById = async(id: number) => {
    try {
        // Simula tiempo de espera para que se vea el loading
        await new Promise( resolve => setTimeout(resolve, 500));
        const response = await fetch(apiUrl + `${id}/`);
        if (!response.ok) {
            switch (response.status) {
                case 404:
                    console.log(response.status + ': El video con el id ' + id + ' no existe');
                    break;
                default:
                    break;
            }
            throw new Error('La solicitud getVideosById falló con el estado ' + response.status);
        } else {
            const data = await response.json(); 
            return data;
        }
    } catch (error) {
        console.error('Error durante la solicitud:', error);
    }
}
export default getVideosById;