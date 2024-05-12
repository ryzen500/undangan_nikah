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
        nama_pengirim: jQuery('#nama_pengirim').val(),
        ucapan: jQuery('#cui-textarea-17372').val(),
        konfirmasi: jQuery('#konfirmasi').val()
    };

    console.log("Form Data yang dikirimkan ", formData);

    jQuery.ajax({
        type: 'POST',
        url: 'http://localhost:12345/api/reservation/messages/post',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function (response) {
         
          console.log("Berhasil Kirim");
          // Clean Call the order function 

          GetAllMessages();
        },
        error: function (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat menyimpan reservasi.');
        }
    });




}

function GetAllMessages(){
  jQuery.ajax({
      type: 'GET',
      url: 'http://localhost:12345/api/reservation/messages',
      contentType: 'application/json',
      success: function (response) {
          // Proses respons dari server
          
          var urlAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZUn6XT-UkJj941QgtGVVYLHY26JtQlId7rOeglSiEUQ&s';
          // Misalnya, jika respons berupa array objek pesan
          response.forEach(function(message) {

            response.sort(function(a, b) {
              // Menggunakan properti timestamp sebagai contoh
              return new Date(b.timestamp) - new Date(a.timestamp);
          });
            var konfirmasiIcon;
            var konfirmasiText;
            
            // Menentukan ikon dan teks konfirmasi
            if (message.konfirmasi.toLowerCase() === 'hadir') {
                konfirmasiIcon = '<i class="fas fa-check-circle" style="color:green;"></i>';
                konfirmasiText = 'Hadir';
            } else {
                konfirmasiIcon = '<i class="fas fa-times-circle" style="color:red;"></i>';
                konfirmasiText = 'Tidak Hadir';
            }


              var newComment = `
                  <li class="comment even thread-even depth-1 cui-item-comment" data-likes="0">
                      <div class="cui-comment cui-clearfix">
                          <!-- Avatar -->
                          <div class="cui-comment-avatar">
                              <!-- Bisa tambahkan gambar jika ada -->
                              <img src="${urlAvatar}" alt="Avatar" style="width: 50px; height: 50px; border-radius: 50%;">
                          </div>
                          <!-- Pesan -->
                          <div class="cui-comment-content">
                              <!-- Info -->
                              <div class="cui-comment-info">
                                  <a title="${message.nama_pengirim}" class="cui-commenter-name">${message.nama_pengirim}</a>
                                  <span class="cui-post-author-mark cui-post-author-hadir">${konfirmasiIcon}</span>
                              </div>
                              <!-- Ucapan -->
                              <div class="cui-comment-text">
                                  <p>${message.ucapan}</p>
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
              // Tambahkan elemen <li> ke <ul>
              jQuery('#cui-container-comment-17372').append(newComment);
          });
      },
      error: function (error) {
          console.error('Error:', error);
          alert('Terjadi kesalahan saat mengambil pesan.');
      }
  });
}


function getNamaDariURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('to');
}

// Fungsi untuk menampilkan nama di dalam elemen HTML dengan id 'nama'
function tampilkanNama() {
  const nama = getNamaDariURL();
  const namaElement = document.getElementById('nama');
  namaElement.textContent = nama;
}
console.log(" Test " , getNamaDariURL());

// Panggil fungsi tampilkanNama saat halaman dimuat
// window.onload = tampilkanNama;
// Call updateCountdown every second to keep the countdown updated
setInterval(updateCountdown, 1000);
tampilkanNama();
GetAllMessages();