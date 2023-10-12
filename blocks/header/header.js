import {
  decorateIcons, buildBlock, decorateBlock, loadBlock,
} from '../../scripts/lib-franklin.js';
import { getBrandingConfig } from '../../scripts/site-config.js';
import { getUserProfile } from '../../scripts/security.js';
import { closeDialogEvent } from '../../scripts/scripts.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections.querySelectorAll('.nav-sections > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  // enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll('.nav-drop');
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('role', 'button');
        drop.setAttribute('tabindex', 0);
        drop.addEventListener('focus', focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute('role');
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusNavSection);
    });
  }
  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
  }
}

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // decorate nav DOM
  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.innerHTML = `
<div class="nav-brand">
  <a href="/"><img loading="lazy" src="" alt="logo"></a>
  <div></div>
</div>
<div class="nav-search" id="searchbox">
</div>
<div class="nav-sections">
<!--  <ul>-->
<!--    <li><a href="#">link 1</a></li>-->
<!--    <li><a href="#">link 2</a></li>-->
<!--  </ul>-->
</div>

<div class="nav-tools">
      <a class="user-switcher" href="">
      <span class="icon icon-user"></span>
      </a>
</div>
<dialog class="user-profile">
  <div class="user-container">
    <div class="user-name"></div>
    <div class="user-email"></div>
    <a class="user-signout" href="">Sign Out</a>
  </div>
</dialog>
`;

  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    navSections.querySelectorAll(':scope > ul > li').forEach((navSection) => {
      if (navSection.querySelector('ul')) navSection.classList.add('nav-drop');
      navSection.addEventListener('click', () => {
        if (isDesktop.matches) {
          const expanded = navSection.getAttribute('aria-expanded') === 'true';
          toggleAllNavSections(navSections);
          navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        }
      });
    });
  }

  // hamburger for mobile
  // TODO: improve mobile view: adjust search field size in medium screen,
  // move search field into popup menu
  // on mobile view.
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
        <span class="nav-hamburger-icon"></span>
      </button>`;
  hamburger.addEventListener('click', () => toggleMenu(nav, navSections));
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');
  // prevent mobile nav behavior on window resize
  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));

  decorateIcons(nav);
  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
  const searchField = buildBlock('search-field', '');
  nav.querySelector('.nav-search').appendChild(searchField);
  decorateBlock(searchField);
  loadBlock(searchField);

  const userProfile = await getUserProfile();

  // decorate user switcher
  const userSwitcher = nav.querySelector('.user-switcher');
  const dialog = nav.querySelector('.user-profile');
  userSwitcher.addEventListener('click', async (clickEvent) => {
    clickEvent.preventDefault();
    dialog.querySelector('.user-name').textContent = userProfile.displayName;
    dialog.querySelector('.user-email').textContent = userProfile.email;
    dialog.showModal();
  });

  closeDialogEvent(dialog);

  const signout = nav.querySelector('.user-signout');
  signout.addEventListener('click', async (clickEvent) => {
    clickEvent.preventDefault();
    window.adobeIMS?.signOut(
      {
        redirect_uri: window.location.origin,
      },
    );
  });

  const brandingConfig = await getBrandingConfig();
  if (brandingConfig.logo) {
    nav.querySelector('.nav-brand img').src = brandingConfig.logo;
  }
  if (brandingConfig.brandText) {
    nav.querySelector('.nav-brand div').textContent = brandingConfig.brandText;
    document.title = brandingConfig.brandText;
  }
}
