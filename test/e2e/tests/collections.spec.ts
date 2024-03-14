/* eslint-disable prefer-regex-literals,no-promise-executor-return,no-await-in-loop */
import {test, expect, Locator} from '@playwright/test';
import { getAssetCard, getIframe, getSearchBox } from './selectors';
import {getMainPageUrl} from "./utils";


test('collection features', async ({ page }) => {
  const assetTitle = 'ApprovedModel';

  await page.goto(getMainPageUrl());

  // add to collection
  const iframe = getIframe(page);
  await getSearchBox(iframe).click();
  await getSearchBox(iframe).fill(assetTitle);
  await getSearchBox(iframe).press('Enter');

  await getAssetCard(iframe, assetTitle).hover();
  await iframe.getByLabel(`Add "${assetTitle}" to the`).check();
  await iframe.getByRole('button', { name: 'Add to Collection' }).click();
  const collectionDialog = iframe.getByRole('dialog', {name: 'Add To Collection'});
  await collectionDialog.getByPlaceholder('Enter Collection name').click();
  await collectionDialog.getByPlaceholder('Enter Collection name').fill('test1234');
  const responsePromise = page.waitForResponse('**/adobe/collections');
  await collectionDialog.getByLabel('Submit').click();
  await responsePromise;

  // TODO: uncheck does not work here.
  // await page.frameLocator('iframe[name="Main Content"]').getByLabel('Add "${assetTitle}" to the').check();
  await page.goto(getMainPageUrl('collections'));
  await page.reload();

  await expect(iframe.getByRole('link', { name: 'Collections' })).toBeVisible();

  async function scrollUntilElementIsVisible(locator: Locator) {
    const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
    while (!(await locator.isVisible())) {
      await page.mouse.wheel(0, 600);
      await delay(1_000);
    }
  }
  await scrollUntilElementIsVisible(iframe.getByRole('link', { name: 'test1234' }).first());

  await iframe.getByRole('link', { name: 'test1234' }).first().click();

  // action bar
  await getAssetCard(iframe, assetTitle).hover();
  await iframe.getByLabel(`Add "${assetTitle}" to the`).check();

  await iframe.getByRole('navigation').getByRole('button', {name: 'Share'}).click();
  await iframe.getByLabel('Copy share link').click();
  await iframe.getByRole('dialog').getByLabel('Close').click();

  await iframe.getByRole('navigation').getByRole('button', {name: 'Download'}).click();
  const download8Promise = page.waitForEvent('download');
  await iframe.getByRole('dialog').getByRole('button', { name: 'Download' }).click();
  await download8Promise;
  await iframe.getByRole('dialog').getByLabel('Close').click();

  await iframe.getByText('Remove from collection').click();
  await iframe.getByRole('button', { name: 'Proceed' }).click();

  await iframe.getByRole('button', { name: 'Delete Collection' }).click();
  await iframe.getByRole('button', { name: 'Proceed' }).click();
});
