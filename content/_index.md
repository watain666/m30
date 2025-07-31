<script>
const redirectUrl = `/m30/day/${new Date().getDate()}/`;
window.location.href = redirectUrl;

document.addEventListener('DOMContentLoaded', function() {
  const fallbackLink = document.getElementById('fallback-link');
  if (fallbackLink) {
    fallbackLink.href = redirectUrl;
  }
});
</script>

<div style="text-align: center; padding: 50px;">
  <h1>正在跳轉到今天的頁面...</h1>
  <p>如果沒有自動跳轉，請 <a id="fallback-link" href="#">點擊這裡</a></p>
</div>
