import {FrameLocator, Page} from "@playwright/test";


export function getIframe(page: Page) {
  return page.frameLocator('iframe[name="Main Content"]');
}


export function getAssetCard(iframe: FrameLocator, title: string | RegExp ) {
  return iframe.locator('.adp-result-item').filter({hasText: title}).first();
}

export function getSearchBox(iframe) {
  return iframe.getByRole('navigation').getByRole('searchbox');
}
