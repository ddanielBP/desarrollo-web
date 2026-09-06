document.addEventListener('DOMContentLoaded', () => {
    const btnUpdate = document.getElementById('btn-update-prices');
    
    const API_URL = 'https://open.er-api.com/v6/latest/MXN';

    const formatUSD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    const formatJPY = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY', maximumFractionDigits: 0 });

    btnUpdate.addEventListener('click', async () => {
        btnUpdate.disabled = true;

        try {
            const response = await fetch(API_URL);
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const data = await response.json();
            
            const rateUSD = data.rates.USD;
            const rateJPY = data.rates.JPY;

            const priceContainers = document.querySelectorAll('.prices');

            priceContainers.forEach(container => {
                const priceMXN = parseFloat(container.getAttribute('data-price-mxn'));

                const calculatedUSD = priceMXN * rateUSD;
                const calculatedJPY = priceMXN * rateJPY;

                container.querySelector('.price-usd').innerText = formatUSD.format(calculatedUSD);
                container.querySelector('.price-jpy').innerText = formatJPY.format(calculatedJPY);
            });

            console.log('Precios actualizados exitosamente con tasas reales.');

        } catch (error) {
            console.error('Error al conectar con la API de tipos de cambio:', error);
            alert('No se pudieron actualizar los precios. Verifica tu conexión a internet.');
        } finally {
            btnUpdate.disabled = false;
        }
    });
});