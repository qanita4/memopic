$(function() {
  const currentUsername = localStorage.getItem('username') || '';

  // Load posts dari backend
  function loadPosts() {
    fetch('/api/posts')
      .then(res => res.json())
      .then(posts => renderPosts(posts, currentUsername))
      .catch(err => {
        alert('Gagal memuat postingan');
        console.error(err);
      });
  }

  loadPosts();

  // LIKE / UNLIKE
  $(document).on('click', '.btn-like', function() {
    const btn = $(this);
    const postId = btn.data('id');
    const isLiked = btn.hasClass('liked');

    fetch(`/api/posts/${postId}/like`, {
      method: isLiked ? 'DELETE' : 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
      if (!res.ok) throw new Error('Gagal update like');
      btn.toggleClass('liked');
      btn.html(btn.hasClass('liked') ? '❤️' : '🤍');
      // (Optional) bisa juga reloadPosts() jika mau sync jumlah like/komentar
    })
    .catch(err => alert('Gagal update like'));
  });

  // DELETE
  $(document).on('click', '.btn-delete', function() {
    const postId = $(this).data('id');
    if (!confirm('Yakin ingin menghapus postingan ini?')) return;

    fetch(`/api/posts/${postId}`, { method: 'DELETE' })
      .then(res => res.text())
      .then(msg => {
        alert(msg);
        loadPosts();
      })
      .catch(err => alert('Gagal menghapus post'));
  });

  // EDIT (pakai prompt sederhana, bisa diganti modal popup untuk UX lebih bagus)
  $(document).on('click', '.btn-edit', function() {
    const postId = $(this).data('id');
    // Temukan data post pada tampilan (bisa juga simpan posts global)
    const $item = $(this).closest('.post-item');
    const oldTitle = $item.find('.post-title').text();
    const oldContent = $item.find('.post-content').text();

    const newTitle = prompt('Edit judul:', oldTitle);
    if (newTitle === null) return;
    const newContent = prompt('Edit isi:', oldContent);
    if (newContent === null) return;

    fetch(`/api/posts/${postId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle, content: newContent })
    })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      loadPosts();
    })
    .catch(err => alert('Gagal mengedit post'));
  });
});

// Fungsi render posts dengan aksi (like/edit/hapus)
function renderPosts(posts, currentUsername) {
  const list = $("#post-list");
  list.empty();

  if (!posts || posts.length === 0) {
    list.append(`
      <li style="text-align:center; color:#777; padding: 30px 0;">
        <p><strong>Tidak ada postingan ditemukan.</strong></p>
        <p>Silakan buat postingan baru dengan menekan tombol <em>Create New Post</em> di atas.</p>
      </li>
    `);
    return;
  }

  posts.forEach(post => {
    const date = new Date(post.timestamp || post.date);
    const formattedDate = date.toLocaleDateString() + " " + date.toLocaleTimeString();

    // LIKE
    const likeBtnClass = post.likedByUser ? 'btn-like liked' : 'btn-like';
    const likeIcon = post.likedByUser ? '❤️' : '🤍';

    // ACTION BUTTONS
    let actionBtns = `<button class="${likeBtnClass}" data-id="${post.id}">${likeIcon}</button>`;

    // EDIT/DELETE hanya untuk post user sendiri
    if ((post.username || post.author) === currentUsername) {
      actionBtns += `
        <button class="btn-edit" data-id="${post.id}">Edit</button>
        <button class="btn-delete" data-id="${post.id}">Hapus</button>
      `;
    }

    const $item = $(`
      <li class="post-item" data-id="${post.id}">
        <h3 class="post-title">${post.title || ''}</h3>
        <div class="post-meta">oleh ${post.username || post.author || 'Anonim'}</div>
        <div class="post-content">${post.content || ''}</div>
        <div class="post-meta">${formattedDate}</div>
        <div class="post-actions">${actionBtns}</div>
      </li>
    `);

    list.append($item);
  });
}
