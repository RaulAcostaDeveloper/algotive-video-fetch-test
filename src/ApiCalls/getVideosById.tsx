const apiUrl = 'http://localhost:8000/api/v1/videos/';
const getVideosById = async(id: number) => {
    try {
        // Simulates waiting time so that the loading is visible
        await new Promise( resolve => setTimeout(resolve, 500));
        const response = await fetch(apiUrl + `${id}/`);
        if (!response.ok) {
            // Handling response types
            switch (response.status) {
                case 404:
                    console.log(response.status + ': The video with the id ' + id + ' does not exist');
                    break;
                default:
                    break;
            }
            throw new Error('The fetch getVideosById falls with the state: ' + response.status);
        } else {
            const data = await response.json(); 
            return data;
        }
    } catch (error) {
        console.error('Error in fetch: ', error);
    }
}
export default getVideosById;
// Comentarios en español
// Simula tiempo de espera para que se vea el loading
// Manejo de tipos de respuesta