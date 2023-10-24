import { decorateIcons } from '../../scripts/lib-franklin.js';
import { getAvailableRenditions } from '../../scripts/renditions.js';
import { createTag, closeDialogEvent } from '../../scripts/scripts.js';
import { addAssetToContainer } from '../../scripts/assetPanelCreator.js';
import { emitEvent, EventNames } from '../../scripts/events.js';

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

function generateHeader(conatiner) {
  const renditionHeader = createTag('div', { class: 'rendition header' });
  const label = createTag('label', { for: 'download-all' });
  const col1 = createTag('div', { class: 'col1' });
  const checkbox = createTag('input', {
    type: 'checkbox', name: 'all', value: 'all', id: 'download-all',
  });
  const span = createTag('span', { class: 'checkmark' });
  col1.appendChild(checkbox);
  col1.appendChild(span);
  label.appendChild(col1);
  const col2 = createTag('div', { class: 'col2' });
  col2.textContent = 'Title';
  label.appendChild(col2);
  const col3 = createTag('div', { class: 'col3' });
  col3.textContent = 'Width';
  label.appendChild(col3);
  const col4 = createTag('div', { class: 'col4' });
  col4.textContent = 'Height';
  label.appendChild(col4);
  const col5 = createTag('div', { class: 'col5' });
  col5.textContent = 'File format';
  label.appendChild(col5);
  renditionHeader.appendChild(label);
  conatiner.appendChild(renditionHeader);
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
      } else if (checkedCount === renditionCheckboxs.length) {
        allCheckbox.checked = true;
      } else {
        allCheckbox.checked = false;
      }
      updateButton(checkedCount, downloadButton);
    });
  });

  allCheckbox.addEventListener('change', () => {
    let checkedCount = 0;
    renditionCheckboxs.forEach((checkbox) => {
      checkbox.checked = allCheckbox.checked;
      if (checkbox.checked) {
        checkedCount += 1;
      }
    });
    updateButton(checkedCount, downloadButton);
  });

  downloadButton.addEventListener('click', (b) => {
    const items = [];
    renditionCheckboxs.forEach((checkbox) => {
      if (checkbox.checked) {
        items.push({
          name: checkbox.value,
          url: checkbox.getAttribute('data-url'),
          assetId: checkbox.getAttribute('data-asset-id'),
          assetName: checkbox.getAttribute('data-asset-name'),
          renditionName: checkbox.id,
        });
      }
    });

    // Loop through each item in the array
    items.forEach((item) => {
      fetch(item.url)
        .then((resp) => resp.blob())
        .then((blob) => {
          const imgUrl = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = imgUrl;
          // Set the filename for each item
          a.download = item.name;
          a.click();
          window.URL.revokeObjectURL(imgUrl);
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

function generateRenditionList(renditions, container) {
  const renditionContainer = createTag('div', { class: 'renditions-container' });
  generateHeader(renditionContainer);

  renditions.forEach((rendition) => {
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
    });
    const span = createTag('span', { class: 'checkmark' });
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
    col5.textContent = `${rendition.format}`;
    label.appendChild(col5);
    renditionElem.appendChild(label);
    renditionContainer.appendChild(renditionElem);
  });
  container.appendChild(renditionContainer);

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
  const dialog = document.querySelector('.download-modal.block dialog');
  const assetContainer = dialog.querySelector('.asset-image');
  addAssetToContainer(assetId, repoName, null, format, assetContainer);
  const assetName = dialog.querySelector('.file-name');
  assetName.textContent = repoName;
  const renditions = await getRenditions(assetId, repoName, format);
  const renditionContainer = dialog.querySelector('.modal-body-right');
  generateRenditionHTML(renditions, renditionContainer);
  dialog.showModal();
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
