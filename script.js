// Feedback form submission
document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from refreshing the page
  
    // Get user input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    // Create a feedback object
    const feedback = {
      name: name,
      email: email,
      message: message,
      submittedAt: new Date().toLocaleString(),
    };
  
    // Save feedback to local storage
    // let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    // feedbacks.push(feedback);
    // localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
  
    // Clear form fields
    document.getElementById('feedbackForm').reset();
  
    // Show confirmation message
    alert('Thank you for your feedback!');
  });
 
 
 