// Set the target date and time for the countdown
const targetDate = new Date("2024-06-30T15:00:00"); // Example: New Year's Eve 2024

// Function to update the countdown timer
function updateCountdown() {
    const now = new Date(); // Current date and time
    const timeDifference = targetDate - now; // Time difference in milliseconds

    if (timeDifference <= 0) {
        document.getElementById("timer").innerText = "Event has started!";
        return; // Exit if the countdown is over
    }

    // Convert the time difference to days, hours, minutes, and seconds
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Update the HTML elements with the calculated time
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}

function Simpan(){
    

    var formData = {
        nama_pengirim: jQuery('#nama').val(),
        ucapan: jQuery('#cui-textarea-17372').val(),
        konfirmasi: jQuery('#konfirmasi').val()
    };

    jQuery.ajax({
        type: 'POST',
        url: 'http://localhost:12345/api/reservation/messages/post',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function (response) {
             // Buat elemen <li> untuk ditambahkan ke <ul>
             var newComment = `
             <li class="comment even thread-even depth-1 cui-item-comment" data-likes="0">
               <div class="cui-comment cui-clearfix">
                 <!-- Avatar -->
                 <div class="cui-comment-avatar">
                   <!-- Bisa tambahkan gambar jika ada -->
                 </div>
                 
                 <!-- Pesan -->
                 <div class="cui-comment-content">
                   <!-- Info -->
                   <div class="cui-comment-info">
                     <a title="${response.nama_pengirim}" class="cui-commenter-name">${response.nama_pengirim}</a>
                     <span class="cui-post-author-mark cui-post-author-hadir">${response.konfirmasi}</span>
                   </div>
                   
                   <!-- Ucapan -->
                   <div class="cui-comment-text">
                     <p>${response.ucapan}</p>
                   </div>
                   
                   <!-- Tindakan -->
                   <div class="cui-comment-actions">
                     <span class="cui-comment-time">
                       <i class="far fa-clock">
                         Beberapa detik lalu
                       </i>
                     </span>
                   </div>
                 </div>
               </div>
             </li>
           `;

           console.log(response);
           // Tambahkan elemen <li> ke <ul>
           jQuery('#cui-container-comment-17372').append(newComment);
        },
        error: function (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat menyimpan reservasi.');
        }
    });




}
// Call updateCountdown every second to keep the countdown updated
setInterval(updateCountdown, 1000);
