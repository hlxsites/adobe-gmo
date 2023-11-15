import { decorateIcons } from '../../scripts/lib-franklin.js';
import { getAvailableRenditions } from '../../scripts/renditions.js';
import { createTag, closeDialogEvent, logError } from '../../scripts/scripts.js';
import { addAssetToContainer } from '../../scripts/asset-panel-html-builder.js';
import { emitEvent, EventNames } from '../../scripts/events.js';
import { getBearerToken } from '../../scripts/security.js';
import { isPDF } from '../../scripts/filetypes.js';
import { getAssetMetadata } from '../../scripts/polaris.js';
import { getAssetName, getAssetMimeType } from '../../scripts/metadata.js';
import createMultiSelectedAssetsTable from '../../scripts/multi-selected-assets-table.js';
import { getDownloadRenditionConfig, getLicenseAgreementText } from '../../scripts/site-config.js';

export default function decorate(block) {
  block.innerHTML = `<dialog>
  <div class="download-container">
  <div class="modal-header">
    <div class="modal-header-left initial-format">
      Download
    </div>
    <div class="modal-header-right">
      <button class="action action-close" aria-label="Close">
        <span class="icon icon-close"></span>
      </button>
    </div>
  </div>
  <div class="modal-body">
    <div class="modal-body-left"></div>
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
        allCheckbox.classList.remove('intermediate');
      } else if (checkedCount === renditionCheckboxs.length) {
        allCheckbox.checked = true;
        allCheckbox.classList.remove('intermediate');
      } else {
        allCheckbox.checked = false;
        allCheckbox.classList.add('intermediate');
      }
      updateButton(checkedCount, downloadButton);
    });
  });

  allCheckbox.addEventListener('change', () => {
    allCheckbox.classList.remove('intermediate');
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
    const downloadFiles = await Promise.all(items.map(async (item) => {
      try {
        const resp = await fetch(item.url, {
          headers: {
            Authorization: `${token}`,
          },
        });
        const blob = await resp.blob();
        if (isPDF(item.format)) {
          openPDF(blob);
        } else {
          downloadAsset(blob, item.name);
        }
        return {
          assetId: item.assetId,
          assetName: item.assetName,
          renditionName: item.renditionName,
        };
      } catch (e) {
        logError(`Unable to download file ${item.name}`, e);
        return {};
      }
    }));
    emitEvent(b.target, EventNames.DOWNLOAD, {
      downloads: downloadFiles,
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
    type: 'checkbox', name: 'all', value: 'all', id: 'download-all', class: 'intermediate',
  });
  selectAllCol1.appendChild(selectAllCheckbox);
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
      'data-format': `${rendition.format}`,
    });
    checkbox.checked = rendition.name === 'Original';
    col1.appendChild(checkbox);
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
    col5.textContent = rendition.format.includes('/') ? `${rendition.format.split('/')[1]}` : `${rendition.format}`;
    label.appendChild(col5);
    renditionElem.appendChild(label);
    renditionContainer.appendChild(renditionElem);
  });
  container.appendChild(renditionContainer);
  if (renditions.length === 1) {
    selectAllCheckbox.classList.remove('intermediate');
    selectAllCheckbox.checked = true;
  }

  generateButton(container);
  addDownloadEventListener(container);
}

export async function generateLicenseAgreement(container, overlayClasses) {
  container.querySelector('.license-agreement-container')?.remove();
  container.querySelector('.license-agreement-radio-container')?.remove();
  const licenseAgreement = await getLicenseAgreementText();
  const licenseAgreementContainer = createTag('div', { class: 'license-agreement-container' });
  const licenseAgreementHeader = createTag('div', { class: 'license-agreement-header initial-format' });
  licenseAgreementHeader.textContent = licenseAgreement.header ? licenseAgreement.header : 'License Agreement';
  licenseAgreementContainer.appendChild(licenseAgreementHeader);
  const licenseAgreementText = createTag('div', { class: 'license-agreement-text initial-format' });
  licenseAgreementText.textContent = licenseAgreement.text ? licenseAgreement.text : '';
  licenseAgreementContainer.appendChild(licenseAgreementText);
  container.appendChild(licenseAgreementContainer);

  const radioContainer = createTag('div', { class: 'license-agreement-radio-container' });
  const licenseOption1 = createTag('div', { class: 'license-option' });
  const label1 = createTag('label', { for: 'license-agree' });
  const radioAgree = createTag('input', {
    type: 'radio', name: 'license-selection', value: 'agree', id: 'license-agree',
  });
  const span1 = createTag('span', { class: 'license-option-span' });
  span1.textContent = 'Agree';
  label1.appendChild(radioAgree);
  label1.appendChild(span1);
  licenseOption1.appendChild(label1);
  const licenseOption2 = createTag('div', { class: 'license-option' });
  const label2 = createTag('label', { for: 'license-disagree' });
  const radioRendition = createTag('input', {
    type: 'radio', name: 'license-selection', value: 'disagree', id: 'license-disagree', checked: true,
  });
  const span2 = createTag('span', { class: 'license-option-span' });
  span2.textContent = 'Disagree';
  label2.appendChild(radioRendition);
  label2.appendChild(span2);
  licenseOption2.appendChild(label2);
  radioContainer.appendChild(licenseOption1);
  radioContainer.appendChild(licenseOption2);
  container.appendChild(radioContainer);

  overlayClasses.forEach((overlayClass) => {
    container.querySelector(overlayClass).classList.add('hidden');
  });
  radioAgree.addEventListener('change', () => {
    radioContainer.classList.add('hidden');
    licenseAgreementContainer.classList.add('hidden');
    overlayClasses.forEach((overlayClass) => {
      container.querySelector(overlayClass).classList.remove('hidden');
    });
  });
}

async function generateRenditionHTML(renditions, container, assetId) {
  container.querySelector('.renditions-container')?.remove();
  container.querySelector('.actions-container')?.remove();
  generateRenditionList(renditions, container);
  const isLicensed = document.querySelector(`.adp-result-item[data-item-id="${assetId}"]`)?.getAttribute('data-is-licensed');
  if (isLicensed === 'true') {
    const overlayClasses = ['.renditions-container', '.actions-container'];
    await generateLicenseAgreement(container, overlayClasses);
  }
}

async function getRenditions(assetId, repoName, format) {
  const renditions = await getAvailableRenditions(assetId, repoName, format);
  return renditions;
}

export async function openDownloadModal(assetId) {
  const assetJSON = await getAssetMetadata(assetId);
  if (!assetJSON) return;
  const repoName = getAssetName(assetJSON);
  const format = getAssetMimeType(assetJSON);

  // add no-scroll to disable scrolling for the main page in the background
  document.body.classList.add('no-scroll');
  const dialog = document.querySelector('.adp-download-modal.block dialog');
  dialog.classList.remove('multi-select');
  dialog.querySelector('.modal-header-left').textContent = 'Download';
  const bodyLeft = dialog.querySelector('.modal-body-left');
  const newBodyLeft = bodyLeft.cloneNode(false);
  const body = bodyLeft.parentElement;
  body.classList.remove('multi-select');
  body.replaceChild(newBodyLeft, bodyLeft);
  const assetContainer = createTag('div', { class: 'asset-image' });
  const assetName = createTag('div', { class: 'file-name' });
  newBodyLeft.appendChild(assetContainer);
  newBodyLeft.appendChild(assetName);
  addAssetToContainer(assetId, repoName, null, format, assetContainer);
  assetName.textContent = repoName;
  const renditions = await getRenditions(assetId, repoName, format);
  const bodyRight = dialog.querySelector('.modal-body-right');
  const newBodyRight = bodyRight.cloneNode(false);
  body.replaceChild(newBodyRight, bodyRight);
  generateRenditionHTML(renditions, newBodyRight, assetId);
  dialog.showModal();
  document.querySelector('.adp-download-modal.block .action-close').blur();
}

function closeDialog(dialog) {
  dialog.close();
  document.body.classList.remove('no-scroll');
}

export async function openMultiSelectDownloadModal() {
  document.body.classList.add('no-scroll');
  const dialog = document.querySelector('.adp-download-modal.block dialog');
  dialog.classList.add('multi-select');

  // create selected assets table
  const multiAssetsTable = await createMultiSelectedAssetsTable();
  const bodyLeft = dialog.querySelector('.modal-body-left');
  const newBodyLeft = bodyLeft.cloneNode(false);
  const body = bodyLeft.parentElement;
  body.classList.add('multi-select');
  body.replaceChild(newBodyLeft, bodyLeft);
  newBodyLeft.appendChild(multiAssetsTable);

  // create radio buttons
  const bodyRight = dialog.querySelector('.modal-body-right');
  const newBodyRight = bodyRight.cloneNode(false);
  body.replaceChild(newBodyRight, bodyRight);
  const radioContainer = createTag('div', { class: 'radio-container' });
  const message = createTag('div', { class: 'message initial-format' });
  message.textContent = 'Select the versions of the assets to be downloaded';
  const downloadOption1 = createTag('div', { class: 'download-option' });
  const label1 = createTag('label', { for: 'download-original' });
  const radioOriginal = createTag('input', {
    type: 'radio', name: 'multi-select-download', value: 'Original', id: 'download-original', checked: true,
  });
  const span1 = createTag('span', { class: 'multi-select-download-span initial-format' });
  span1.textContent = 'Only originals';
  label1.appendChild(radioOriginal);
  label1.appendChild(span1);
  downloadOption1.appendChild(label1);
  const downloadOption2 = createTag('div', { class: 'download-option' });
  const label2 = createTag('label', { for: 'download-rendition' });
  const radioRendition = createTag('input', {
    type: 'radio', name: 'multi-select-download', value: 'Rendition', id: 'download-rendition',
  });
  const span2 = createTag('span', { class: 'multi-select-download-span' });
  span2.textContent = 'Originals + Renditions';
  label2.appendChild(radioRendition);
  label2.appendChild(span2);
  downloadOption2.appendChild(label2);
  radioContainer.appendChild(message);
  radioContainer.appendChild(downloadOption1);
  radioContainer.appendChild(downloadOption2);
  newBodyRight.appendChild(radioContainer);
  const renditionConfigs = await getDownloadRenditionConfig();
  if (renditionConfigs.length === 0) {
    downloadOption2.classList.add('hidden');
  }

  // create download button
  generateButton(newBodyRight);
  const downloadButton = newBodyRight.querySelector('.action.download');
  downloadButton.textContent = 'Download';

  dialog.showModal();
  document.querySelector('.adp-download-modal.block .action-close').blur();

  downloadButton.addEventListener('click', async (b) => {
    const rows = multiAssetsTable.querySelectorAll('.asset-row');
    const checkedRadio = radioContainer.querySelector('input[name="multi-select-download"]:checked');
    const token = await getBearerToken();

    const downloadFiles = await Promise.all(
      Array.from(rows).map(async (row) => {
        const data = await getAvailableRenditions(
          row.getAttribute('data-asset-id'),
          row.getAttribute('data-asset-name'),
          row.getAttribute('data-fileformat'),
        );
        return await Promise.all(data.map(async (item) => {
          try {
            if (checkedRadio.value === 'Original' && item.name !== 'Original') {
              return {};
            }
            const resp = await fetch(item.url, {
              headers: {
                Authorization: `${token}`,
              },
            });
            const blob = await resp.blob();
            downloadAsset(blob, item.fileName);
            return {
              assetId: item.assetId,
              assetName: item.assetName,
              renditionName: item.name,
            };
          } catch (e) {
            logError(`Unable to download file ${item.name}`, e);
            return {};
          }
        }));
      }),
    );
    emitEvent(b.target, EventNames.DOWNLOAD, {
      downloads: downloadFiles.flat(Infinity),
    });
  });

  // Download asset count update
  let rowCount = multiAssetsTable.querySelectorAll('.asset-row').length;
  dialog.querySelector('.modal-header-left').textContent = `Download ${rowCount} asset${rowCount > 1 ? 's' : ''}`;
  const assetTable = dialog.querySelector('.multi-selected-assets-table');
  const handleChanges = (mutationsList) => {
    mutationsList.forEach((mutation) => {
      if (mutation.type === 'childList') {
        rowCount = multiAssetsTable.querySelectorAll('.asset-row').length;
        dialog.querySelector('.modal-header-left').textContent = `Download ${rowCount} asset${rowCount > 1 ? 's' : ''}`;
      }
    });
  };
  const observer = new MutationObserver(handleChanges);
  const config = { childList: true };
  observer.observe(assetTable, config);

  // create license agreement if needed
  const assetRows = multiAssetsTable.querySelectorAll('.asset-row');
  let isLicensed = false;
  for (let i = 0; i < assetRows.length; i += 1) {
    if (assetRows[i].getAttribute('data-is-licensed') === 'true') {
      isLicensed = true;
      break;
    }
  }
  if (isLicensed) {
    const overlayClasses = ['.actions-container', '.radio-container'];
    await generateLicenseAgreement(newBodyRight, overlayClasses);
  }
}
