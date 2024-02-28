const getVideosByPage = async(url: string) => {
    try {
        // Simula tiempo de espera para que se vea el loading
        await new Promise( resolve => setTimeout(resolve, 1000));
        const response = await fetch(url);
        if (!response.ok) {
            // Manejo de tipos de respuesta
            switch (response.status) {
                case 404:
                    console.log(response.status + ': La página ' + url + ' no existe');
                    break;
                default:
                    break;
            }
            throw new Error('La solicitud getVideosByPage falló con el estado ' + response.status);
        } else {
            const data = await response.json(); 
            return data;
        }
    } catch (error) {
        console.error('Error durante la solicitud:', error);
    }
}

export default getVideosByPage;