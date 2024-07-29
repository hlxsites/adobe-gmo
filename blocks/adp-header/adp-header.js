import {
  decorateIcons, buildBlock, decorateBlock, loadBlock,
} from '../../scripts/lib-franklin.js';
import {
  getBrandingConfig, getQuickLinkConfig, isUrlPathNonRoot, getBaseConfigPath,
} from '../../scripts/site-config.js';
import { getUserProfile, getAvatarUrl, isPublicPage, checkAddAssetsAccess } from '../../scripts/security.js';
import { closeDialogEvent, createLinkHref, getSelectedAssetsFromInfiniteResultsBlock } from '../../scripts/shared.js';
import { EventNames, addEventListener, emitEvent } from '../../scripts/events.js';
import { openShareModalMultiSelectedAssets } from '../adp-share-modal/adp-share-modal.js';
import { openMultiSelectDownloadModal } from '../adp-download-modal/adp-download-modal.js';
import { addAddToCollectionModalHandler } from '../adp-add-to-collection-modal/adp-add-to-collection-modal.js';
import { getCollection, getCollectionIdFromURL, patchCollection } from '../../scripts/collections.js';
import createConfirmDialog from '../../scripts/confirm-dialog.js';
import { openUploadDialog } from '../../contenthub/hydration/hydration.js';

const quickLinksConfig = await getQuickLinkConfig();

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

const SESSION_STARTED_KEY = 'assets-distribution-portal-session-started';

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
  block.textContent = '';
  const logoUrl = document.querySelector('head meta[name="logo-link"]')?.getAttribute('content');
  // decorate nav DOM
  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.innerHTML = `
  <div class="nav-top">
    <div class="nav-brand">
      <a class="adp-logo" href="${logoUrl ?? getBaseConfigPath()}/"></a>
      <div></div>
    </div>
    <div class="nav-sections">
      <!--  <ul>-->
      <!--    <li><a href="#">link 1</a></li>-->
      <!--    <li><a href="#">link 2</a></li>-->
      <!--  </ul>-->
    </div>
    <div class="nav-tools">
      <a class="user-switcher" href="" aria-label="show profile options"></a>
    </div>
    <dialog class="user-profile">
      <div class="user-container">
      <div class="user-name"></div>
      <div class="user-email"></div>
        <a class="user-signout" href="">Sign Out</a>
      </div>
    </dialog>
  </div>
  <div class="nav-bottom">
    <div class="quick-links">
    </div>
  </div>
  <div class="banner">
    <div class="banner-left">
      <button id="banner-close" class="action action-close" aria-label="Close">
        <span class="icon icon-close"></span>
      </button>
      <div class="selected-count">1 item selected</div>
    </div>
    <div class="banner-right">
      <div class="actions actions-add-to-collection" role="button"><span class="icon icon-add-to-collection"></span>Add to Collection</div>
      <div class="actions actions-remove-from-collection hidden" role="button">
        <span class="icon icon-remove-from-collection"></span>Remove from collection
      </div>
      <div class="actions actions-share" role="button"><span class="icon icon-share"></span>Share</div>
      <div class="actions actions-download" role="button"><span class="icon icon-download"></span>Download</div>
    </div>
  </div>
  `;

  // Hide share button on adp-infinite-results-linkshare block
  const linkshareInfiniteResults = document.querySelector('.adp-infinite-results-linkshare.block');
  if (linkshareInfiniteResults) {
    nav.querySelector('.banner .banner-right .actions-share')?.classList.add('hidden');
    nav.querySelector('.banner .banner-right .actions-add-to-collection')?.classList.add('hidden');
  }

  const collectionInfiniteResults = document.querySelector('.adp-infinite-results-collection.block');
  if (collectionInfiniteResults) {
    // Hide add to collection button on adp-infinite-results-collection block
    nav.querySelector('.banner .banner-right .actions-add-to-collection')?.classList.add('hidden');
    // Only show "Remove from collection" button on adp-infinite-results-collection block
    nav.querySelector('.banner .banner-right .actions-remove-from-collection')?.classList.remove('hidden');
  }

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

  if (!window.unifiedShellRuntime) {
    getBrandingConfig().then((brandingConfig) => {
      if (brandingConfig.logo) {
        const logoContainer = nav.querySelector('.nav-brand .adp-logo');
        const img = document.createElement('img');
        img.loading = 'lazy';
        img.src = brandingConfig.logo;
        img.alt = brandingConfig.brandText;
        logoContainer.appendChild(img);
      }
      if (brandingConfig.brandText) {
        nav.querySelector('.nav-brand div').textContent = brandingConfig.brandText;
        document.title = brandingConfig.brandText;
      }
    });
  }

  if (await getUserProfile() !== null) {
    document.querySelector('.adp-logo').href = logoUrl ?? (getBaseConfigPath() + '/assets');
    loadSearchField(nav);
    if (!window.unifiedShellRuntime) {
      await createUserInfo(nav);
    }
    initQuickLinks();
    initBanner(nav);
  }
}

function loadSearchField(nav) {
  // add search field to header only when block is requested
  if (document.querySelector('head meta[name="show-search-field"]')?.getAttribute('content').toLowerCase() === 'true') {
    const divEl = document.createElement('div');
    divEl.className = 'nav-search';
    divEl.id = 'searchbox';
    const navTopEl = document.querySelector('.nav-top');
    navTopEl.insertBefore(divEl, nav.querySelector('.nav-sections'));

    const searchField = buildBlock('adp-search-field', '');
    nav.querySelector('.nav-search').appendChild(searchField);
    decorateBlock(searchField);
    loadBlock(searchField);
  }
}

async function createUserInfo(nav) {
  const userProfile = await getUserProfile();

  if (window && window.sessionStorage && !window.sessionStorage.getItem(SESSION_STARTED_KEY)) {
    window.sessionStorage.setItem(SESSION_STARTED_KEY, 'true');
    emitEvent(document.documentElement, EventNames.SESSION_STARTED, {
      displayName: userProfile.displayName,
      authId: userProfile.authId,
    });
  }

  // decorate user switcher
  const userSwitcher = nav.querySelector('.user-switcher');

  const avatarUrl = await getAvatarUrl();
  if (avatarUrl) {
    userSwitcher.style = `background-image: url(${avatarUrl});`;
  } else {
    const userSwitcherEl = document.querySelector('.user-switcher');
    const userSpanEl = document.createElement('span');
    userSpanEl.classList.add('icon', 'icon-user');
    userSwitcherEl.appendChild(userSpanEl);
    decorateIcons(userSwitcherEl);
  }

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
    const pathName = isUrlPathNonRoot() ? `${getBaseConfigPath()}/` : '';
    window.adobeIMS?.signOut(
      {
        redirect_uri: `${window.location.origin}${pathName}`,
      },
    );
  });
}

async function handleRemoveMultiSelectedAssetsFromCollection() {
  const collectionId = getCollectionIdFromURL();
  const collectionJSON = await getCollection(collectionId);
  const collectionIndexes = {};
  collectionJSON.items.forEach((item, index) => {
    collectionIndexes[item.id] = index;
  });
  const selectedAssets = getSelectedAssetsFromInfiniteResultsBlock();
  const selectedAssetIds = selectedAssets.map((asset) => asset.getAttribute('data-item-id'));

  const deleteOperation = selectedAssetIds.map((assetId) => ({
    value: collectionJSON.items[collectionIndexes[assetId]],
    path: `/items/${collectionIndexes[assetId]}`,
  }));

  await patchCollection(collectionId, collectionJSON?.etag, null, deleteOperation);
  // Refresh the page
  window.location.reload();
}

async function initQuickLinks() {
  if (document.querySelector('head meta[name="hide-quicklinks"]')?.getAttribute('content') === 'true') {
    return;
  }

  const quickLinks = document.querySelector('.adp-header .nav-bottom .quick-links');
  // decorate quick links
  quickLinksConfig.forEach((item) => {
    if (item.hide!=='true'){
      const itemEl = document.createElement('div');
      itemEl.className = 'item';
      const itemLinkEl = document.createElement('a');
      if (item.page.startsWith('/') && isUrlPathNonRoot()) {
        itemLinkEl.href = createLinkHref(getBaseConfigPath() + item.page);
      } else {
        itemLinkEl.href = createLinkHref(item.page);
      }
      itemLinkEl.dataset.page = item.page;
      if (item.page.startsWith('http')) {
        itemLinkEl.target = '_blank';
        itemLinkEl.rel = 'noopener';
      }
      itemLinkEl.textContent = item.title;
      itemEl.append(itemLinkEl);
      quickLinks.append(itemEl);
    }
  });

  if (await checkAddAssetsAccess()) {
    const navDiv = document.createElement('div');
    navDiv.classList.add('item');
    const addAssetsButton = document.createElement('button');
    addAssetsButton.classList.add('action', 'add-assets');
    navDiv.appendChild(addAssetsButton);
    addAssetsButton.appendChild(document.createTextNode('Add Assets'));
    addAssetsButton.addEventListener('click', () => {
      openUploadDialog();
    });
    quickLinks.appendChild(navDiv);
  }
  //set aria-selected on quick links
  quickLinks.querySelectorAll('.item').forEach((item) => {
    if (item.querySelector('a')?.getAttribute('href') === window.location.pathname) {
      item.setAttribute('aria-selected', 'true');
    }
  });
}

function initBanner(nav) {
  const closeBanner = nav.querySelector('.banner .action-close');
  closeBanner.addEventListener('click', () => {
    nav.querySelector('.banner')?.classList.remove('show');
    emitEvent(document, EventNames.CLOSE_BANNER);
  });
  const handleAddRemoveItemSelection = (e) => {
    const banner = document.querySelector('.adp-header .banner');
    const selectedCount = banner.querySelector('.selected-count');
    const count = e.detail.selections.length;
    if (count === 0) {
      banner.classList.remove('show');
    } else {
      banner.classList.add('show');
    }
    selectedCount.textContent = count > 1 ? `${count} items selected` : `${count} item selected`;
  };
  addEventListener(EventNames.ADD_ITEM_MULTISELECT, async (e) => handleAddRemoveItemSelection(e));
  addEventListener(EventNames.REMOVE_ITEM_MULTISELECT, async (e) => handleAddRemoveItemSelection(e));

  /** Hide if search changed */
  addEventListener(EventNames.SEARCH_RESULTS_CHANGED, () => {
    nav.querySelector('.banner')?.classList.remove('show');
  });

  // Handle click for Share button on banner
  const shareButton = nav.querySelector('.banner .banner-right .actions-share');
  shareButton.addEventListener('click', async () => {
    await openShareModalMultiSelectedAssets();
  });

  const downloadButton = nav.querySelector('.banner .banner-right .actions-download');
  downloadButton.addEventListener('click', async () => {
    await openMultiSelectDownloadModal();
  });

  const addToCollectionButton = nav.querySelector('.banner .banner-right .actions-add-to-collection');
  addToCollectionButton.addEventListener('click', async () => {
    await addAddToCollectionModalHandler();
  });

  // Handle click for "Remove from collection" button on banner
  const removeFromCollectionButton = nav.querySelector('.banner .banner-right .actions-remove-from-collection');
  removeFromCollectionButton.addEventListener('click', async () => {
    const selectedAssets = getSelectedAssetsFromInfiniteResultsBlock();
    await createConfirmDialog(
      `Remove ${selectedAssets.length} asset${selectedAssets.length > 1 ? 's' : ''}`,
      'Are you sure you want to remove the selected assets from this collection?',
      async () => {
        await handleRemoveMultiSelectedAssetsFromCollection();
      },
      'Proceed',
      () => {},
      'Cancel',
    );
  });
}

export function getNavHeight() {
  return document.querySelector('.nav-wrapper').getBoundingClientRect().height;
}
