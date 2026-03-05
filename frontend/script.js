document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('birth-date');
    const searchBtn = document.getElementById('search-btn');
    const resultSection = document.getElementById('result-section');
    const loading = document.getElementById('loading');
    const errorMessage = document.getElementById('error-message');

    const photoTitle = document.getElementById('photo-title');
    const mediaContainer = document.getElementById('media-container');
    const photoExplanation = document.getElementById('photo-explanation');
    const photoDate = document.getElementById('photo-date');

    // Set max date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.max = today;

    searchBtn.addEventListener('click', async () => {
        const date = dateInput.value;

        if (!date) {
            showError('Por favor, selecione uma data válida.');
            return;
        }

        // Reset UI
        resultSection.classList.add('hidden');
        errorMessage.classList.add('hidden');
        loading.classList.remove('hidden');

        try {
            const response = await fetch(`http://localhost:8000/api/nasa-photo?date=${date}`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Falha ao buscar dados da NASA.');
            }

            const data = await response.json();
            displayResult(data);
        } catch (error) {
            showError(error.message);
        } finally {
            loading.classList.add('hidden');
        }
    });

    function displayResult(data) {
        photoTitle.textContent = data.title;
        photoExplanation.textContent = data.explanation;
        photoDate.textContent = `Data da Captura: ${data.date}`;

        mediaContainer.innerHTML = '';
        if (data.media_type === 'image') {
            const img = document.createElement('img');
            img.src = data.url;
            img.alt = data.title;
            mediaContainer.appendChild(img);
        } else if (data.media_type === 'video') {
            const iframe = document.createElement('iframe');
            iframe.src = data.url;
            iframe.frameBorder = '0';
            iframe.allowFullscreen = true;
            mediaContainer.appendChild(iframe);
        }

        resultSection.classList.remove('hidden');
        // Smooth scroll to result
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }
});
