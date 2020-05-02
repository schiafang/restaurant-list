const pathname = window.location.pathname

if (pathname === '/search') {
  window.addEventListener('load', () => {
    const cardColumns = document.querySelector('.card-columns')
    cardColumns.scrollIntoView({ behavior: 'smooth' })
  })
}