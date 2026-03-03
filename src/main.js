import './style.css'

// ═══════════════════════════════════════
// SCROLL PROGRESS BAR
// ═══════════════════════════════════════
const progressBar = document.getElementById('progressBar')
window.addEventListener('scroll', () => {
  const winScroll = document.documentElement.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  const scrolled = (winScroll / height) * 100
  progressBar.style.width = scrolled + '%'
})

// ═══════════════════════════════════════
// SCROLL REVEAL
// ═══════════════════════════════════════
const reveals = document.querySelectorAll('.reveal')
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
    }
  })
}, { threshold: 0.1 })
reveals.forEach(el => revealObserver.observe(el))

// ═══════════════════════════════════════
// FLOATING PARTICLES
// ═══════════════════════════════════════
function createParticle() {
  const container = document.getElementById('particles')
  const particle = document.createElement('div')
  const size = Math.random() * 4 + 2
  const isHeart = Math.random() > 0.7

  if (isHeart) {
    particle.innerHTML = '❤'
    particle.style.fontSize = (Math.random() * 14 + 8) + 'px'
    particle.style.color = `hsla(${Math.random() * 30 + 330}, 70%, 60%, ${Math.random() * 0.4 + 0.1})`
    particle.style.position = 'fixed'
    particle.style.pointerEvents = 'none'
    particle.style.left = Math.random() * 100 + 'vw'
    particle.style.bottom = '-20px'
    particle.style.zIndex = '0'
    particle.style.animation = `particleFloat ${Math.random() * 10 + 8}s linear forwards`
  } else {
    particle.classList.add('particle')
    particle.style.width = size + 'px'
    particle.style.height = size + 'px'
    particle.style.left = Math.random() * 100 + 'vw'
    particle.style.background = `hsla(${Math.random() * 60 + 300}, 60%, 60%, ${Math.random() * 0.3 + 0.1})`
    particle.style.animation = `particleFloat ${Math.random() * 12 + 8}s linear forwards`
  }

  container.appendChild(particle)
  setTimeout(() => particle.remove(), 20000)
}

setInterval(createParticle, 600)

// ═══════════════════════════════════════
// HERO HEART CLICK - BURST HEARTS
// ═══════════════════════════════════════
document.getElementById('heroHeart').addEventListener('click', (e) => {
  for (let i = 0; i < 8; i++) {
    const heart = document.createElement('div')
    heart.classList.add('floating-heart')
    heart.innerHTML = ['❤️','💕','💖','💗','💓'][Math.floor(Math.random() * 5)]
    heart.style.left = (e.clientX + (Math.random() - 0.5) * 80) + 'px'
    heart.style.top = e.clientY + 'px'
    heart.style.fontSize = (Math.random() * 20 + 16) + 'px'
    heart.style.animationDuration = (Math.random() * 1 + 1.5) + 's'
    document.body.appendChild(heart)
    setTimeout(() => heart.remove(), 2500)
  }
})

// ═══════════════════════════════════════
// GALLERY FILTER
// ═══════════════════════════════════════
const filterBtns = document.querySelectorAll('.gallery-filter-btn')
const galleryItems = document.querySelectorAll('.gallery-item')

// Style active/inactive buttons
function updateFilterStyles() {
  filterBtns.forEach(btn => {
    if (btn.classList.contains('active')) {
      btn.style.background = 'linear-gradient(135deg, #8b1a3a, #c2185b)'
      btn.style.color = '#fff'
      btn.style.border = '1px solid rgba(212,175,55,0.4)'
    } else {
      btn.style.background = 'transparent'
      btn.style.color = '#f48fb1'
      btn.style.border = '1px solid rgba(194,24,91,0.3)'
    }
  })
}
updateFilterStyles()

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'))
    btn.classList.add('active')
    updateFilterStyles()

    const filter = btn.dataset.filter
    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = 'block'
        item.style.animation = 'fadeIn 0.4s ease forwards'
      } else {
        item.style.display = 'none'
      }
    })
  })
})

// ═══════════════════════════════════════
// LIGHTBOX
// ═══════════════════════════════════════
const lightbox = document.getElementById('lightbox')
const lightboxImg = document.getElementById('lightboxImg')
const lightboxCaption = document.getElementById('lightboxCaption')
let currentGalleryItems = []
let currentIndex = 0

function openLightbox(items, index) {
  currentGalleryItems = Array.from(items)
  currentIndex = index
  showLightboxItem(currentIndex)
  lightbox.classList.add('active')
  document.body.style.overflow = 'hidden'
}

function showLightboxItem(index) {
  const item = currentGalleryItems[index]
  const img = item.querySelector('img')
  lightboxImg.src = img.src
  lightboxImg.alt = img.alt
  lightboxCaption.textContent = item.dataset.caption || ''
}

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    const visibleItems = Array.from(galleryItems).filter(i => i.style.display !== 'none')
    const visibleIndex = visibleItems.indexOf(item)
    openLightbox(visibleItems, visibleIndex)
  })
})

document.getElementById('lightboxClose').addEventListener('click', () => {
  lightbox.classList.remove('active')
  document.body.style.overflow = ''
})

document.getElementById('lightboxPrev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + currentGalleryItems.length) % currentGalleryItems.length
  showLightboxItem(currentIndex)
})

document.getElementById('lightboxNext').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % currentGalleryItems.length
  showLightboxItem(currentIndex)
})

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active')
    document.body.style.overflow = ''
  }
})

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return
  if (e.key === 'Escape') { lightbox.classList.remove('active'); document.body.style.overflow = '' }
  if (e.key === 'ArrowLeft') { currentIndex = (currentIndex - 1 + currentGalleryItems.length) % currentGalleryItems.length; showLightboxItem(currentIndex) }
  if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % currentGalleryItems.length; showLightboxItem(currentIndex) }
})

// ═══════════════════════════════════════
// MOBILE MENU
// ═══════════════════════════════════════
const mobileMenu = document.getElementById('mobileMenu')
document.getElementById('menuBtn').addEventListener('click', () => {
  mobileMenu.style.display = 'flex'
})
document.getElementById('closeMenu').addEventListener('click', () => {
  mobileMenu.style.display = 'none'
})
document.querySelectorAll('.nav-mobile').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.style.display = 'none'
  })
})

// ═══════════════════════════════════════
// MUSIC BUTTON (visual toggle, no audio)
// ═══════════════════════════════════════
let musicPlaying = false
const musicBtn = document.getElementById('musicBtn')
const musicIcon = document.getElementById('musicIcon')

musicBtn.addEventListener('click', () => {
  musicPlaying = !musicPlaying
  musicIcon.textContent = musicPlaying ? '⏸' : '🎵'
  musicBtn.style.background = musicPlaying
    ? 'linear-gradient(135deg, #d4af37, #c2185b)'
    : 'linear-gradient(135deg, #8b1a3a, #c2185b)'

  // Note: To add real music, create an <audio> element and link an mp3:
  // const audio = new Audio('/path/to/song.mp3')
  // musicPlaying ? audio.play() : audio.pause()
})

// ═══════════════════════════════════════
// SMOOTH NAV SCROLL
// ═══════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault()
    const target = document.querySelector(anchor.getAttribute('href'))
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  })
})

// ═══════════════════════════════════════
// GALLERY ITEM HOVER CAPTION
// ═══════════════════════════════════════
galleryItems.forEach(item => {
  const caption = item.querySelector('.gallery-caption')
  if (caption) {
    item.addEventListener('mouseenter', () => caption.style.opacity = '1')
    item.addEventListener('mouseleave', () => caption.style.opacity = '0')
  }
})
