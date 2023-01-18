import '../css/app.css'

import './tools/sidebar'

const currentPage = document.location.href
const navLinks = document.querySelectorAll('.nav-link')
navLinks.forEach((navLink) => {
  const baseUrl = navLink.getAttribute('href')
  if (currentPage.includes(baseUrl)) {
    navLink.classList.add('highlight')
  }
})
