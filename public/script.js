// Get the form and response elements from the DOM
const questionForm = document.getElementById('question-form');
const questionInput = document.getElementById('question-input');
const responseText = document.getElementById('response-text');

// Add an event listener to the form to handle submission
questionForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const question = questionInput.value;
    if (!question) {
        alert('Please enter a question.');
        return;
    }

    // Show a loading message while waiting for the response
    responseText.textContent = 'Loading...';

    try {
        // Send the question to the backend using the fetch API
        const response = await fetch('/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question: question })
        });

        if (!response.ok) {
            throw new Error('Failed to get answer from the server.');
        }

        const data = await response.json();
        
        // Display the AI-generated answer
        responseText.textContent = data.answer;

    } catch (error) {
        console.error('Error:', error);
        responseText.textContent = 'An error occurred. Please try again.';
    }
});
