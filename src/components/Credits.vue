<template>
  <!-- eslint-disable max-len -->
  <div class="container">
    By <a href="https://github.com/mallowigi/" target="_blank" rel="noopener">Elior Boukhobza (@mallowigi)
      <svg fill="#66BB6A" height="12" viewBox="0 0 24 24" width="12" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path
          d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
      </svg>
    </a>
    <p>Music is copyright Nintendo, logos are copyrighted to their rightful authors.</p>
  </div>
</template>

<script>
  export default {
    name: 'Credits',
  };
</script>

<style scoped>
  .container {
    position: fixed;
    bottom: 10px;
    left: 0;
    width: 100%;
    color: #66BB6A;
    font-size: 12px;
  }

  a {
    font-size: 12px;
    color: #66BB6A;
    text-decoration: none;
  }

  p {
    margin: 0;
  }
</style>
