function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.addEventListener("load", () => {
    let long;
    let lat;

    let temperatureDescription = document.querySelector('.weather');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureDegree = document.querySelector('.temperature__section-degree');
    let temperatureSectionDegreeMin = document.querySelector('.temperature__section-degree-min');
    let temperatureSectionDegreeMax = document.querySelector('.temperature__section-degree-max');
    let temperatureHumidity = document.querySelector('.temperature__humidity');

    let locationIcon = document.querySelector('.location-icon');
    let lang = (navigator.language).substring(0, 2);

    let form = document.querySelector('form');
    let input = document.querySelector('input');
          
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=YOUR_API_KEY&lang=${lang}`;
            fetch(api)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const { name, weather, main } = data;
                temperatureDegree.textContent = (main.temp - 273.15).toFixed(2);
                temperatureDescription.textContent = weather[0].description.toUpperCase();
                locationTimezone.textContent = name;
                locationIcon.src = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;
                temperatureSectionDegreeMin.textContent = (main.temp_min - 273.15).toFixed(0);
                temperatureSectionDegreeMax.textContent = (main.temp_max - 273.15).toFixed(0);
                temperatureHumidity.textContent = `Umidità: ${main.humidity}%`;
            });
        });
    }
    
    form.addEventListener('submit', e => {
        e.preventDefault();
        let city = input.value;
        input.value = '';
        const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9f11284868fdf52b7ff9cdb0d1e61737&lang=${lang}`;
        fetch(api)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const { name, weather, main } = data;
            temperatureDegree.textContent = (main.temp - 273.15).toFixed(2);
            temperatureDescription.textContent = weather[0].description.toUpperCase();
            locationTimezone.textContent = name;
            locationIcon.src = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;
            temperatureSectionDegreeMin.textContent = (main.temp_min - 273.15).toFixed(0);
            temperatureSectionDegreeMax.textContent = (main.temp_max - 273.15).toFixed(0);
            temperatureHumidity.textContent = `Umidità: ${main.humidity}%`;
        });
    });
});

function getSelectedAlgorithm() {
    const selectElement = document.getElementById('encryption-algorithm');
    return selectElement.value;
}

function handleEncryptClick() {
    const inputText = document.getElementById('encryption-key').value;
    const selectedAlgorithm = getSelectedAlgorithm();
    
    if (selectedAlgorithm === 'sha256') {
        const encryptedText = CryptoJS.SHA256(inputText).toString();
        alert('Testo crittografato con SHA-256:\n' + encryptedText);
    } else if (selectedAlgorithm === 'sha512') {
        const encryptedText = CryptoJS.SHA512(inputText).toString();
        alert('Testo crittografato con SHA-512:\n' + encryptedText);
    } else if (selectedAlgorithm === 'aes') {
        const key = 'QuestaeUnaChiaveSegreta';
        const encryptedText = CryptoJS.AES.encrypt(inputText, key).toString();
        alert('Testo crittografato con AES:\n' + encryptedText);
    } else if (selectedAlgorithm === 'rsa') {
        
        const crypt = new JSEncrypt({ default_key_size: 2048 });
        const privateKey = crypt.getPrivateKey();
        const publicKey = crypt.getPublicKey();
        
        crypt.setPublicKey(publicKey);
        const encryptedText = crypt.encrypt(inputText);
        
        alert('Chiave pubblica RSA:\n' + publicKey + '\n\nTesto crittografato con RSA:\n' + encryptedText);
    } else {
        alert('Seleziona un algoritmo di crittografia valido.');
    }
}

const encryptButton = document.getElementById('encrypt-button');
encryptButton.addEventListener('click', handleEncryptClick);