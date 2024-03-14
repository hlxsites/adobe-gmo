/* eslint-disable prefer-regex-literals */
import { expect, test } from '@playwright/test';
import {getAssetCard, getIframe, getSearchBox} from './selectors';
import {getMainPageUrl} from "./utils";


test('assets features', async ({ page }) => {
  const assetTitle = 'ApprovedModel';


  await page.goto(getMainPageUrl());

  const iframe = getIframe(page);
  await iframe.getByRole('button', { name: 'Format' }).click();
  await iframe.locator('#dc-format-options').getByText('jpeg').click();

  await iframe.getByRole('button', { name: 'Tags' }).click();
  await iframe.locator('#xcm-machineKeywords-options').getByPlaceholder('Search...').click();
  await iframe.locator('#xcm-machineKeywords-options').getByPlaceholder('Search...').fill('car');

  await iframe.locator('#xcm-machineKeywords-options').getByText('car', { exact: true }).click();

  await getSearchBox(iframe).click();
  await getSearchBox(iframe).fill(assetTitle);
  await getSearchBox(iframe).press('Enter');

  await expect(getAssetCard(iframe, assetTitle)).toBeVisible();
  await getAssetCard(iframe, assetTitle).getByLabel('Download').click();
  const download2Promise = page.waitForEvent('download');
  await iframe.getByRole('dialog').getByRole('button', { name: 'Download 1 file' }).click();
  await download2Promise;
  await iframe.getByRole('button', { name: 'Close' }).click();

  await getAssetCard(iframe, assetTitle).getByLabel('Share').click();
  await iframe.getByLabel('Copy share link').click();
  await iframe.getByRole('button', { name: 'Close' }).click();

  // side panel
  await iframe.getByRole('link', { name: assetTitle }).click();
  const sidePanel = iframe.getByLabel('Details Side Panel');
  await sidePanel.getByRole('button', { name: 'Download' }).click();
  await iframe.getByLabel('OriginalAutoAutojpeg').uncheck();
  await iframe.getByLabel('PNG High Quality 100x100').check();
  const download3Promise = page.waitForEvent('download');
  await iframe.getByRole('button', { name: 'Download 1 file' }).click();
  await download3Promise;
  await iframe.getByRole('dialog').getByLabel('Close').click();
  await sidePanel.getByRole('button', { name: 'Share' }).click();
  await iframe.locator('select[name="share-link-expiry-select"]').selectOption('90');
  await iframe.getByLabel('Copy share link').click();
  await iframe.getByRole('dialog').getByLabel('Close').click();

  // details page
  await iframe.getByLabel('Fullscreen').click();
  await iframe.getByLabel('Zoom In').click({
    clickCount: 3,
  });
  await iframe.getByLabel('Zoom Out').click({
    clickCount: 4,
  });

  await iframe.getByLabel('Metadata').click();
  await iframe.getByLabel('Metadata').click();

  await iframe.locator('#asset-details-page-download').click();
  await iframe.getByRole('dialog').getByRole('checkbox').nth(2)
    .check();
  await iframe.getByRole('dialog').getByRole('checkbox').nth(3)
    .check();
  const download6Promise = page.waitForEvent('download');
  await iframe.getByRole('button', { name: 'Download 3 files' }).click();
  await download6Promise;

  await iframe.locator('#asset-details-page-share').click();
  await iframe.getByRole('dialog').getByRole('combobox').selectOption('7');
  await iframe.getByRole('button', { name: 'Copy share link' }).click();
  await iframe.getByRole('dialog').getByLabel('Close').click();
});
