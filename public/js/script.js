document.addEventListener('DOMContentLoaded', function () {
  const elementsChartCtx = document.getElementById('elementsChart').getContext('2d');
  const elementsChart = new Chart(elementsChartCtx, {
    type: 'radar',
    data: {
      labels: ['Mộc (Wood)', 'Hỏa (Fire)', 'Thổ (Earth)', 'Kim (Metal)', 'Thủy (Water)'],
      datasets: [{
        label: 'Cân Bằng Năng Lượng',
        data: [2, 3, 5, 4.5, 3.5],
        backgroundColor: 'rgba(236, 72, 153, 0.2)',
        borderColor: 'rgba(236, 72, 153, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(236, 72, 153, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(236, 72, 153, 1)'
      }]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: {
            color: 'rgba(255, 255, 255, 0.2)'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.2)'
          },
          pointLabels: {
            font: {
              size: 12,
              family: "'Quicksand', sans-serif"
            },
            color: '#F3F4F6'
          },
          ticks: {
            beginAtZero: true,
            max: 5,
            stepSize: 1,
            backdropColor: 'transparent',
            color: 'rgba(255, 255, 255, 0.7)',
            font: {
              size: 10
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(31, 41, 55, 0.9)',
          titleColor: '#F9A8D4',
          bodyColor: '#F3F4F6',
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.r !== null) {
                let level = '';
                if (context.parsed.r <= 1) level = " (Rất yếu/Khuyết)";
                else if (context.parsed.r <= 2) level = " (Yếu)";
                else if (context.parsed.r <= 3) level = " (Cân bằng)";
                else if (context.parsed.r <= 4) level = " (Mạnh)";
                else level = " (Rất mạnh/Vượng)";
                label += context.label + level;
              }
              return label;
            }
          }
        }
      }
    }
  });

  const tabs = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(item => item.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.tab);
      tabContents.forEach(content => content.classList.add('hidden'));
      target.classList.remove('hidden');
    });
  });

  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section');

  const activateNavLink = (link) => {
    navLinks.forEach(nav => nav.classList.remove('active'));
    if (link) link.classList.add('active');
  };

  const onScroll = () => {
    let currentSectionId = null;
    const scrollPos = window.pageYOffset + header.offsetHeight + 50;

    sections.forEach(section => {
      if (section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
        currentSectionId = section.id;
      }
    });

    if (currentSectionId) {
      const activeLink = document.querySelector(`.nav-link[href="#${currentSectionId}"]`);
      activateNavLink(activeLink);
    } else {
      activateNavLink(null);
    }
  };

  window.addEventListener('scroll', onScroll);

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - header.offsetHeight,
          behavior: 'smooth'
        });
      }
    });
  });

  const mobileNav = document.getElementById('mobile-nav');
  mobileNav.addEventListener('change', function (e) {
    const targetId = e.target.value;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - header.offsetHeight,
        behavior: 'smooth'
      });
    }
  });


  const podcastPlayer = document.getElementById('fixedPodcastPlayer');
  const podcastPlayerToggle = document.getElementById('podcastPlayerToggle');
  const podcastAudio = document.getElementById('podcastAudio');
  const replayPodcastButton = document.getElementById('replayPodcastButton');

  if (podcastPlayer && podcastPlayerToggle) {
    const setPodcastPlayerState = (isExpanded) => {
      if (isExpanded) {
        podcastPlayer.classList.add('is-expanded');
        podcastPlayerToggle.setAttribute('aria-label', 'Đóng Podcast');
      } else {
        podcastPlayer.classList.remove('is-expanded');
        podcastPlayerToggle.setAttribute('aria-label', 'Mở Podcast');
      }
      podcastPlayerToggle.setAttribute('aria-expanded', isExpanded.toString());
      localStorage.setItem('podcastPlayerExpanded', isExpanded.toString());
    };

    podcastPlayerToggle.addEventListener('click', () => {
      const isCurrentlyExpanded = podcastPlayer.classList.contains('is-expanded');
      setPodcastPlayerState(!isCurrentlyExpanded);
    });


    const savedPodcastState = localStorage.getItem('podcastPlayerExpanded');
    let initialPodcastExpandedState = false;
    if (savedPodcastState === 'true') {
      initialPodcastExpandedState = true;
    }
    setPodcastPlayerState(initialPodcastExpandedState);

    if (replayPodcastButton && podcastAudio) {
      replayPodcastButton.addEventListener('click', () => {
        podcastAudio.currentTime = 0;
        podcastAudio.play();
      });
    }
  }
});
