// Set the target date and time for the countdown
var targetDate = new Date("2024-06-30T16:00:00"); // Example: New Year's Eve 2024

// Function to update the countdown timer
function updateCountdown() {
    const now = new Date(); // Current date and time
    const timeDifference = targetDate - now; // Time difference in milliseconds

    if (timeDifference <= 0) {
        console.log("Waktu Sudah Habis");
        // document.getElementById("timer").innerText = "Event has started!";
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
        nama_pengirim: jQuery('#nama_pengirim').val(),
        ucapan: jQuery('#cui-textarea-17372').val(),
        konfirmasi: jQuery('#konfirmasi').val()
    };

    if (formData.konfirmasi == null) {

        // alert("Harap Isi Konfirmasi Hadir");
        Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Harap Isi Konfirmasi Hadir!"});
    }else{


    console.log("Form Data yang dikirimkan ", formData);

    jQuery.ajax({
        type: 'POST',
        url: 'https://reservasirabi-ryzens-projects-a70d0bd2.vercel.app/api/reservation/messages/post',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function (response) {
         
          console.log("Berhasil Kirim");
          Swal.fire({
          title: "Komentar Berhasil Disimpan!",
          text: "Komentar kamu Berhasil Disimpan !",
          icon: "success"
        });
          // Clean Call the order function 

          GetAllMessages();
        },
        error: function (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat menyimpan reservasi.');
        }
    });


}

}
function GetAllMessages() {
    jQuery.ajax({
        type: 'GET',
        url: 'https://reservasirabi-ryzens-projects-a70d0bd2.vercel.app/api/reservation/messages', // PHP script that fetches data using curl
        dataType: 'json', // Expect JSON response
        success: function (response) {
            // Process JSON response from PHP script
            var urlAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZUn6XT-UkJj941QgtGVVYLHY26JtQlId7rOeglSiEUQ&s';

            // Sort response array by timestamp
            response.sort(function(a, b) {
                return new Date(b.timestamp) - new Date(a.timestamp);
            });

            // Iterate through each message in the response
            response.forEach(function(message) {
               console.log(message);
                var konfirmasiIcon;
                var konfirmasiText;

                // Determine icon and confirmation text based on message.konfirmasi
                if (message.konfirmasi.toLowerCase() === 'saya hadir') {
                    konfirmasiIcon = '<i class="fas fa-check-circle" style="color:green;"></i>';
                    konfirmasiText = 'Saya Hadir';
                } else {
                    konfirmasiIcon = '<i class="fas fa-times-circle" style="color:red;"></i>';
                    konfirmasiText = 'Tidak Hadir';
                }

                // Construct new comment HTML
                var newComment = `
                    <li class="comment even thread-even depth-1 cui-item-comment" data-likes="0">
                        <div class="cui-comment cui-clearfix">
                            <!-- Avatar -->
                            <div class="cui-comment-avatar">
                                <img src="${urlAvatar}" alt="Avatar" style="width: 50px; height: 50px; border-radius: 50%;">
                            </div>
                            <!-- Comment Content -->
                            <div class="cui-comment-content">
                                <!-- Commenter Info -->
                                <div class="cui-comment-info">
                                    <a title="${message.nama_pengirim}" class="cui-commenter-name">${message.nama_pengirim}</a>
                                    <span class="cui-post-author-mark cui-post-author-hadir">${konfirmasiIcon}</span>
                                </div>
                                <!-- Comment Text -->
                                <div class="cui-comment-text">
                                    <p>${message.ucapan}</p>
                                </div>
                                <!-- Comment Actions -->
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

                // Append new comment HTML to the designated container
                jQuery('#cui-container-comment-17372').append(newComment);
            });
        },
        error: function (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat mengambil pesan.');
        }
    });
}


function CallLocation() {
    alert("Span clicked!");
    // You can add more code here to perform any actions you need
}

// Attach the click event to the span
function getNamaDariURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('to');
}

// Fungsi untuk menampilkan nama di dalam elemen HTML dengan id 'nama'
function tampilkanNama() {
  const nama = getNamaDariURL();
  const namaElement = document.getElementById('nama');
  namaElement.textContent = nama;

    const namaElementHeader = document.getElementById('lalala');
  namaElementHeader.textContent = nama;
  console.log("nama", nama);
  console.log("panggil Nama Element ", namaElementHeader);

}
console.log(" Test " , getNamaDariURL());

// Panggil fungsi tampilkanNama saat halaman dimuat
// window.onload = tampilkanNama;
// Call updateCountdown every second to keep the countdown updated
setInterval(updateCountdown, 1000);
tampilkanNama();
GetAllMessages();

