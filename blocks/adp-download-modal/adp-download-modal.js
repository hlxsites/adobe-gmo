import { decorateIcons } from '../../scripts/lib-franklin.js';
import { getAvailableRenditions } from '../../scripts/renditions.js';
import { createTag, closeDialogEvent } from '../../scripts/scripts.js';
import { addAssetToContainer } from '../../scripts/assetPanelCreator.js';
import { emitEvent, EventNames } from '../../scripts/events.js';
import { getBearerToken } from '../../scripts/security.js';
import { isPDF } from '../../scripts/filetypes.js';

export default function decorate(block) {
  block.innerHTML = `<dialog>
  <div class="download-container">
  <div class="modal-header">
    <div class="modal-header-left">
      Download
    </div>
    <div class="modal-header-right">
      <button class="action action-close" aria-label="Close">
        <span class="icon icon-close"></span>
      </button>
    </div>
  </div>
  <div class="modal-body">
    <div class="modal-body-left">
      <div class="asset-image"></div>
      <div class="file-name"></div>
    </div>
    <div class="modal-body-right"></div>
  </div>
  </div>
  </dialog>`;
  decorateIcons(block);
  const dialog = block.querySelector('dialog');
  dialog.querySelector('.action-close').addEventListener('click', () => {
    closeDialog(dialog);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && dialog.open) {
      closeDialog(dialog);
    }
  });
  closeDialogEvent(dialog);
}

function updateButton(checkedCount, downloadButton) {
  if (checkedCount === 0) {
    downloadButton.textContent = 'Download';
    downloadButton.classList.add('disabled');
  } else {
    downloadButton.classList.remove('disabled');
    downloadButton.textContent = `Download ${checkedCount} file${checkedCount > 1 ? 's' : ''}`;
  }
}

function generateButton(container) {
  const actionsContainer = createTag('div', { class: 'actions-container' });
  const downloadButton = createTag('button', { class: 'action download' });
  downloadButton.textContent = 'Download 1 file';
  actionsContainer.appendChild(downloadButton);
  container.appendChild(actionsContainer);
}

export function addDownloadEventListener(container) {
  const renditionCheckboxs = container.querySelectorAll('input[name="rendition"]');
  const allCheckbox = container.querySelector('input[name="all"]');
  const allCheckboxSpan = allCheckbox.nextElementSibling;
  const downloadButton = container.querySelector('.action.download');

  renditionCheckboxs.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      let checkedCount = 0;
      for (const renditionCheckbox of renditionCheckboxs) {
        if (renditionCheckbox.checked) {
          checkedCount += 1;
        }
      }
      if (checkedCount === 0) {
        allCheckbox.checked = false;
        allCheckboxSpan.classList.remove('show-bar');
      } else if (checkedCount === renditionCheckboxs.length) {
        allCheckbox.checked = true;
        allCheckboxSpan.classList.remove('show-bar');
      } else {
        allCheckbox.checked = false;
        allCheckboxSpan.classList.add('show-bar');
      }
      updateButton(checkedCount, downloadButton);
    });

    // add below code to make the checkbox accessible by keyboard
    checkbox.nextElementSibling.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        checkbox.checked = !checkbox.checked;
      }
    });
  });

  allCheckbox.addEventListener('change', () => {
    allCheckboxSpan.classList.remove('show-bar');
    let checkedCount = 0;
    renditionCheckboxs.forEach((checkbox) => {
      checkbox.checked = allCheckbox.checked;
      if (checkbox.checked) {
        checkedCount += 1;
      }
    });
    updateButton(checkedCount, downloadButton);
  });

  downloadButton.addEventListener('click', async (b) => {
    const items = [];
    const token = await getBearerToken();
    renditionCheckboxs.forEach((checkbox) => {
      if (checkbox.checked) {
        items.push({
          name: checkbox.value,
          url: checkbox.getAttribute('data-url'),
          assetId: checkbox.getAttribute('data-asset-id'),
          assetName: checkbox.getAttribute('data-asset-name'),
          renditionName: checkbox.id,
          format: checkbox.getAttribute('data-format'),
        });
      }
    });

    // Loop through each item in the array
    items.forEach((item) => {
      fetch(item.url, {
        headers: {
          Authorization: `${token}`,
        },
      })
        .then((resp) => resp.blob())
        .then((blob) => {
          if (isPDF(item.format)) {
            openPDF(blob);
          } else {
            downloadAsset(blob, item.name);
          }
          emitEvent(b.target, EventNames.DOWNLOAD, {
            assetId: item.assetId,
            assetName: item.assetName,
            renditionName: item.renditionName,
          });
        })
        .catch((e) => console.log(`Unable to download file ${item.name}`, e));
    });
  });
}

function downloadAsset(blob, assetName) {
  const imgUrl = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = imgUrl;
  // Set the filename for each item
  a.download = assetName;
  a.click();
  window.URL.revokeObjectURL(imgUrl);
}

function openPDF(blob) {
  const pdfUrl = window.URL.createObjectURL(blob);
  window.open(pdfUrl, '_blank');
  window.URL.revokeObjectURL(pdfUrl);
}

function generateRenditionList(renditions, container) {
  const renditionContainer = createTag('div', { class: 'renditions-container' });
  // create select all checkbox
  const renditionHeader = createTag('div', { class: 'rendition header' });
  const selectAlllabel = createTag('label', { for: 'download-all' });
  const selectAllCol1 = createTag('div', { class: 'col1' });
  const selectAllCheckbox = createTag('input', {
    type: 'checkbox', name: 'all', value: 'all', id: 'download-all',
  });
  const selectAllSpan = createTag('span', { class: 'checkmark show-bar', tabindex: '0' });
  selectAllCol1.appendChild(selectAllCheckbox);
  selectAllCol1.appendChild(selectAllSpan);
  selectAlllabel.appendChild(selectAllCol1);
  const selectAllCol2 = createTag('div', { class: 'col2' });
  selectAllCol2.textContent = 'Title';
  selectAlllabel.appendChild(selectAllCol2);
  const selectAllCol3 = createTag('div', { class: 'col3' });
  selectAllCol3.textContent = 'Width';
  selectAlllabel.appendChild(selectAllCol3);
  const selectAllCol4 = createTag('div', { class: 'col4' });
  selectAllCol4.textContent = 'Height';
  selectAlllabel.appendChild(selectAllCol4);
  const selectAllCol5 = createTag('div', { class: 'col5' });
  selectAllCol5.textContent = 'File format';
  selectAlllabel.appendChild(selectAllCol5);
  renditionHeader.appendChild(selectAlllabel);
  renditionContainer.appendChild(renditionHeader);

  // create rendition checkboxes
  renditions.forEach((rendition, index) => {
    const renditionElem = createTag('div', { class: 'rendition' });
    // checkbox
    const label = createTag('label', { for: `${rendition.name}` });
    const col1 = createTag('div', { class: 'col1' });
    const checkbox = createTag('input', {
      type: 'checkbox',
      id: `${rendition.name}`,
      name: 'rendition',
      value: `${rendition.fileName}`,
      'data-url': `${rendition.url}`,
      'data-asset-id': `${rendition.assetId}`,
      'data-asset-name': `${rendition.assetName}`,
      'data-format': `${rendition.format}`,
    });
    const span = createTag('span', { class: 'checkmark', tabindex: `${index + 1}` });
    checkbox.checked = rendition.name === 'Original';
    col1.appendChild(checkbox);
    col1.appendChild(span);
    label.appendChild(col1);
    // title
    const col2 = createTag('div', { class: 'col2' });
    col2.textContent = `${rendition.name}`;
    label.appendChild(col2);
    // width
    const col3 = createTag('div', { class: 'col3' });
    col3.textContent = rendition.width ? `${rendition.width}px` : 'Auto';
    label.appendChild(col3);
    // height
    const col4 = createTag('div', { class: 'col4' });
    col4.textContent = rendition.height ? `${rendition.height}px` : 'Auto';
    label.appendChild(col4);
    // format
    const col5 = createTag('div', { class: 'col5' });
    col5.textContent = `${rendition.format.split('/')[1]}`;
    label.appendChild(col5);
    renditionElem.appendChild(label);
    renditionContainer.appendChild(renditionElem);
  });
  container.appendChild(renditionContainer);
  if (renditions.length === 1) {
    selectAllSpan.classList.remove('show-bar');
    selectAllCheckbox.checked = true;
  }

  generateButton(container);
  addDownloadEventListener(container);
}

function generateRenditionHTML(renditions, container) {
  container.querySelector('.renditions-container')?.remove();
  container.querySelector('.actions-container')?.remove();
  generateRenditionList(renditions, container);
}

async function getRenditions(assetId, repoName, format) {
  const renditions = await getAvailableRenditions(assetId, repoName, format);
  return renditions;
}

export async function openModal(assetId, repoName, format) {
  // add no-scroll to disable scrolling for the main page in the background
  document.body.classList.add('no-scroll');
  const dialog = document.querySelector('.adp-download-modal.block dialog');
  const assetContainer = dialog.querySelector('.asset-image');
  addAssetToContainer(assetId, repoName, null, format, assetContainer);
  const assetName = dialog.querySelector('.file-name');
  assetName.textContent = repoName;
  const renditions = await getRenditions(assetId, repoName, format);
  const renditionContainer = dialog.querySelector('.modal-body-right');
  generateRenditionHTML(renditions, renditionContainer);
  dialog.showModal();
  document.querySelector('.download-modal.block .action-close').blur();
}

function closeDialog(dialog) {
  dialog.close();
  document.body.classList.remove('no-scroll');
}

export async function addDownloadModalHandler(downloadElement, assetId, repoName, format) {
  downloadElement.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(assetId, repoName, format);
  });
}
