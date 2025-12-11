
document.addEventListener('DOMContentLoaded', function(){
  // smooth scroll for nav anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click', function(e){e.preventDefault(); const t=document.querySelector(this.getAttribute('href')); if(t) t.scrollIntoView({behavior:'smooth'});});});

  // Initialize skill ratings from localStorage
  function loadRatings(){
    document.querySelectorAll('.skill-rating').forEach(function(el){
      const key = 'rating_' + el.dataset.skill;
      const val = localStorage.getItem(key);
      const stars = el.querySelectorAll('.star');
      stars.forEach(s=>s.classList.remove('active'));
      if(val){
        for(let i=0;i<val;i++){ stars[i].classList.add('active'); }
        const scoreEl = document.getElementById('score-' + el.dataset.skill);
        if(scoreEl) scoreEl.textContent = val + '/5';
      }
    });
  }
  loadRatings();

  // Click to rate
  document.querySelectorAll('.skill-rating .star').forEach(function(star){
    star.addEventListener('click', function(){
      const rating = parseInt(this.dataset.value);
      const parent = this.closest('.skill-rating');
      const key = 'rating_' + parent.dataset.skill;
      localStorage.setItem(key, rating);
      loadRatings();
    });
  });

  // Reviews: simple localStorage list
  const form = document.getElementById('reviewForm');
  const reviewsList = document.getElementById('reviewsList');
  function renderReviews(){
    const data = JSON.parse(localStorage.getItem('reviews') || '[]');
    reviewsList.innerHTML = data.map(r=>`<div class="review"><strong>${r.name}</strong><p>${r.text}</p></div>`).join('');
  }
  renderReviews();
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('rname').value.trim();
      const text = document.getElementById('rtext').value.trim();
      if(!name || !text) return;
      const data = JSON.parse(localStorage.getItem('reviews') || '[]');
      data.unshift({name,text,date:Date.now()});
      localStorage.setItem('reviews', JSON.stringify(data));
      form.reset();
      renderReviews();
      alert('Thanks! Your review was saved locally in your browser.');
    });
  }
});
