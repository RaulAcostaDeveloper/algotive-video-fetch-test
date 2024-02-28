const getVideosByPage = async(url: string) => {
    try {
        // Simulates waiting time, so that the loading is visible
        await new Promise( resolve => setTimeout(resolve, 1000));
        const response = await fetch(url);
        if (!response.ok) {
            // Handling response types
            switch (response.status) {
                case 404:
                    console.log(response.status + ': The page ' + url + ' does not exist');
                    break;
                default:
                    break;
            }
            throw new Error('The fetch getVideosByPage falls with the state:' + response.status);
        } else {
            const data = await response.json(); 
            return data;
        }
    } catch (error) {
        console.error('Error in fetch: ', error);
    }
}
export default getVideosByPage;
// Comentarios en español
// Simula tiempo de espera para que se vea el loading
// Manejo de tipos de respuesta