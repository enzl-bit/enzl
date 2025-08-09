const toggleDarkMode = () => {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDark);
};
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}
