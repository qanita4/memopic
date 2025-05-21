function renderPosts(posts) {
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

    const $item = $(`
      <li class="post-item" data-id="${post.id}">
        <h3 class="post-title">${post.title || ''}</h3>
        <div class="post-meta">oleh ${post.username || post.author || 'Anonim'}</div>
        <div class="post-content">${post.content || ''}</div>
        <div class="post-meta">${formattedDate}</div>
      </li>
    `);

    list.append($item);
  });
}
