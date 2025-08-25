document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;
    const formGroups = document.querySelectorAll('.form-group');

    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const errorDiv = group.querySelector('.error-message');
        const fieldName = input.id;

        // Clear previous state
        errorDiv.classList.remove('show');
        group.classList.remove('invalid');

        if (!input.value.trim()) {
            errorDiv.textContent = 'This field is required.';
            errorDiv.classList.add('show');
            group.classList.add('invalid');
            isValid = false;
        } else if (fieldName === 'email') {
            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if (!input.value.match(emailPattern)) {
                errorDiv.textContent = 'Please enter a valid email address.';
                errorDiv.classList.add('show');
                group.classList.add('invalid');
                isValid = false;
            }
        }
    });

    if (isValid) {
        // Show success message with animation
        const successMessage = document.getElementById('successMessage');
        successMessage.classList.add('show');

        // Hide success message and reset form after a few seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
            document.getElementById('contactForm').reset();
            formGroups.forEach(group => group.classList.remove('invalid'));
        }, 3000); 
    }
});