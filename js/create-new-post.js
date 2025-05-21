$(function() {
  $("#createPostForm").on("submit", function(e) {
    e.preventDefault();

    // Ambil data form
    const title = $("#title").val().trim();
    const content = $("#content").val().trim();
    const visibility = $("#visibility").val();
    const imageFile = $("#image")[0].files[0];

    if (!title || !content) {
      alert("Judul dan isi postingan wajib diisi!");
      return;
    }

    // Untuk sekarang, cuma tampilkan data di alert
    let message = `Judul: ${title}\nIsi: ${content}\nVisibility: ${visibility}`;
    if (imageFile) {
      message += `\nFoto: ${imageFile.name}`;
    } else {
      message += `\nFoto: (tidak ada)`;
    }

    alert("Post akan dikirim:\n\n" + message);

    // TODO: nanti kirim ke backend via AJAX/fetch

    // Reset form
    this.reset();
  });
});
