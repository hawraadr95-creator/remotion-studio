(function () {
  var box = document.getElementById('posts');
  var posts = window.POSTS || [];
  if (!posts.length) {
    box.innerHTML = '<p class="empty">سيتم نشر المعلومات والنصائح الصحية هنا قريباً. تابعينا على إنستغرام وفيسبوك.</p>';
    return;
  }
  posts.forEach(function (p) {
    var a = document.createElement('article');
    a.className = 'post';
    if (p.image) { var i = document.createElement('img'); i.src = p.image; i.alt = p.title; i.loading = 'lazy'; a.appendChild(i); }
    var d = document.createElement('div');
    var h = document.createElement('h3'); h.textContent = p.title;
    var t = document.createElement('time'); t.textContent = p.date || '';
    var x = document.createElement('p'); x.textContent = p.text;
    d.append(t, h, x); a.appendChild(d); box.appendChild(a);
  });
})();
