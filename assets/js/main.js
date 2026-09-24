// Interactive features: Mobile menu toggle & Quick search
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Hamburger Menu
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', isOpen);
    });
  }

  // Quick Search Toggle
  const searchBtn = document.querySelector('.search-toggle-btn');
  const searchContainer = document.querySelector('.search-bar-container');
  const searchClose = document.querySelector('.search-close-btn');
  const searchInput = document.querySelector('#siteSearchInput');
  const searchResults = document.querySelector('#searchResultsBox');

  const searchablePages = [
    { title: 'Home - Overzicht Intermezzo\'s 5 Hardware', url: 'index.html', desc: 'Theorie, praktijk en de echte IT-wereld.' },
    { title: 'Kevin Mitnick Games - Hackingcontest', url: 'mitnick.html', desc: 'Cybersecurity challenges, netwerken, cryptografie en Wall of Fame.' },
    { title: 'GitHub basisvaardigheden - 8 Lessen', url: 'github.html', desc: 'Cloning, branches, pull requests, code reviews en best practices.' },
    { title: 'Nokia telecomthuisnetwerk - Bedrijfsbezoek', url: 'nokia.html', desc: 'Telecommunicatie, 5G netwerken en innovatie in Antwerpen.' }
  ];

  if (searchBtn && searchContainer) {
    searchBtn.addEventListener('click', () => {
      searchContainer.classList.toggle('open');
      if (searchContainer.classList.contains('open') && searchInput) {
        searchInput.focus();
      }
    });

    if (searchClose) {
      searchClose.addEventListener('click', () => {
        searchContainer.classList.remove('open');
        if (searchResults) searchResults.style.display = 'none';
      });
    }

    if (searchInput && searchResults) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) {
          searchResults.style.display = 'none';
          searchResults.innerHTML = '';
          return;
        }

        const filtered = searchablePages.filter(p => 
          p.title.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query)
        );

        if (filtered.length > 0) {
          searchResults.innerHTML = filtered.map(p => 
            `<a href="${p.url}"><strong>${p.title}</strong><br><small style="color:#64748b;">${p.desc}</small></a>`
          ).join('');
          searchResults.style.display = 'block';
        } else {
          searchResults.innerHTML = `<div style="padding:12px 16px;color:#64748b;font-size:14px;">Geen resultaten gevonden voor "${query}".</div>`;
          searchResults.style.display = 'block';
        }
      });
    }
  }

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (searchContainer) searchContainer.classList.remove('open');
      if (searchResults) searchResults.style.display = 'none';
      if (navMenu) navMenu.classList.remove('open');
    }
  });
});
