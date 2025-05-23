$(function() {
  $("#createPostForm").on("submit", function(e) {
    e.preventDefault();

    // Ambil data form
    const title = $("#title").val().trim();
    const content = $("#content").val().trim();
    const visibility = $("#visibility").val();
    // const imageFile = $("#image")[0].files[0]; // belum dipakai

    if (!title || !content) {
      alert("Judul dan isi postingan wajib diisi!");
      return;
    }

    // OPTIONAL: Cek data sebelum submit (boleh dihapus)
    const message = `Judul: ${title}\nIsi: ${content}\nVisibility: ${visibility}`;
    alert("Post akan dikirim:\n\n" + message);

    // Kirim post ke backend
    const postData = { title, content, visibility }; // tambahkan image jika sudah support upload

    fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    })
      .then(response => response.text())
      .then(result => {
        alert(result);
        // Reset form hanya jika sukses
        $("#createPostForm")[0].reset();
        // Redirect jika sukses
        window.location.href = 'allpost.html';
      })
      .catch(err => {
        alert('Gagal mengirim post');
        console.error(err);
      });
  });
});
