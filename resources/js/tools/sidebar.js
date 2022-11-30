const showSidebarButton = document.querySelector('#show-sidebar')
const closeSidebarButton = document.querySelector('#close-sidebar')

const sidebarSection = document.querySelector('.sidebar')
const sidebarOverlay = document.querySelector('.sidebar-overlay')

const showSidebar = () => {
  sidebarSection.style.left = '0px'
  sidebarOverlay.style.display = 'flex'
}

const closeSidebar = () => {
  sidebarSection.style.left = '-200px'
  sidebarOverlay.style.display = 'none'
}

if (showSidebarButton) {
  showSidebarButton.addEventListener('click', showSidebar)
}

if (closeSidebarButton) {
  closeSidebarButton.addEventListener('click', closeSidebar)
}

document.addEventListener('click', (event) => {
  if (event.target.className.includes('sidebar-overlay')) {
    closeSidebar()
  }
})
