import { openUploadDialog } from '../../contenthub/hydration/hydration.js';
import { decorateIcons } from '../../scripts/lib-franklin.js';
import { checkAddAssetsAccess } from '../../scripts/security.js';
import { isContentHub } from '../../scripts/site-config.js';

export default async function decorate(block) {
  block.innerHTML = '';
  const assetActionsDiv = document.createElement('div');
  assetActionsDiv.className = 'actions-container';
  //add Asset actions button
  if (await isContentHub() && await checkAddAssetsAccess()) {
    const addAssetsButton = document.createElement('button');
    addAssetsButton.classList.add('action', 'add-assets');
    const addAssetsSpan = document.createElement('span');
    addAssetsSpan.classList.add('icon', 'icon-addAssets');
    addAssetsButton.appendChild(addAssetsSpan);
    assetActionsDiv.appendChild(addAssetsButton);
    addAssetsButton.appendChild(document.createTextNode('Add Assets'));
    addAssetsButton.addEventListener('click', () => {
      openUploadDialog();
    });
  }
  block.appendChild(assetActionsDiv);
  decorateIcons(block);
}
