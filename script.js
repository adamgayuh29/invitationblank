// Open Invitation Button
document.getElementById('open-invitation').addEventListener('click', function () {
    document.getElementById('opening-page').classList.add('d-none');
    document.getElementById('invitation-content').classList.remove('d-none');

    // Play Background Music
    document.getElementById('background-music').play();
});

// Theme Toggle with Icons
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        themeBtn.classList.replace('fa-moon', 'fa-sun');
        themeBtn.classList.replace('btn-dark', 'btn-light');
    } else {
        themeBtn.classList.replace('fa-sun', 'fa-moon');
        themeBtn.classList.replace('btn-light', 'btn-dark');
    }
});

// Countdown Timer
const eventDate = new Date('2025-04-13T08:00:00').getTime();
const countdownTimer = setInterval(function () {
    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('countdown-timer').innerHTML = `
      <div>${days} Hari ${hours} Jam ${minutes} Menit ${seconds} Detik</div>`;

    if (distance < 0) {
        clearInterval(countdownTimer);
        document.getElementById('countdown-timer').innerHTML = "The event has started!";
    }
}, 1000);

// RSVP Form Submission
document.getElementById('rsvp-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get form values
    const name = document.getElementById('name').value;
    const attendance = document.getElementById('attendance').value;
    const message = document.getElementById('message').value;

    // Create an object to store the data
    const rsvp = {
        name: name,
        attendance: attendance,
        message: message
    };

    // Save to Local Storage
    let rsvps = JSON.parse(localStorage.getItem('rsvps')) || [];
    rsvps.push(rsvp);
    localStorage.setItem('rsvps', JSON.stringify(rsvps));

    // Update the displayed RSVP list
    displayRsvps();

    // Clear the form
    document.getElementById('rsvp-form').reset();
});

// Function to display RSVPs from Local Storage
function displayRsvps() {
    const rsvps = JSON.parse(localStorage.getItem('rsvps')) || [];
    const rsvpList = document.getElementById('rsvp-list');

    // Clear the list first
    rsvpList.innerHTML = '';

    // Loop through each RSVP and display it
    rsvps.forEach(function (rsvp) {
        const rsvpItem = `
        <div class="rsvp-item dark-mode container mb-2 p-3 rounded">
          <p><strong>Nama:</strong> ${rsvp.name}</p>
          <p><strong>Kehadiran:</strong> ${rsvp.attendance}</p>
          <p><strong>Ucapan:</strong> ${rsvp.message}</p>
        </div>
      `;
        rsvpList.innerHTML += rsvpItem;
    });
}

// Display RSVPs when the page loads
document.addEventListener('DOMContentLoaded', displayRsvps);
