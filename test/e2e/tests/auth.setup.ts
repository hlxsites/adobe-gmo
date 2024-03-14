/* eslint-disable */
import { test as setup, expect } from '@playwright/test';
import {getMainPageUrl} from "./utils";

const authFile = '.auth/user.json';

setup('authenticate', async ({ page }) => {
  const username = process.env.TEST_USERNAME;
  const password = process.env.TEST_PASSWORD;

  await page.goto(getMainPageUrl());

  // Wait until either a redirect to login is done, or the Unified Shell is displayed and the user is already logged in.
  await expect(
    page.getByText('Sign in to access the Experience Cloud')
      .or(page.getByText('Adobe Content Hub')))
    .toBeVisible();

  console.log('page.url()', page.url());
  if(page.url().startsWith("https://experience-")){
    console.log('already logged in');
    return;
  }
  console.log('starting login');

  await page.waitForURL(new RegExp('https://auth.services.adobe.com/en_US/deeplink.html.*'));
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill(username);
  await page.getByRole('button', { name: 'Continue' }).click();

  // sometimes there is an 'Verify your identity' page
  await expect(page.getByText('Verify your identity')
      .or(page.getByLabel('Password', { exact: true })))
    .toBeVisible();

  if(await page.getByText('Verify your identity').isVisible()){
    await page.getByText('Continue').click();
  }


  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill(password);
  await page.getByLabel('Continue').click();

  // Expect a title "to contain" a substring.
  // await page.frameLocator('iframe[name="Main Content"]').getByRole('link', { name: 'All Assets' }).click();
  await expect(page.frameLocator('iframe[name="Main Content"]').getByRole('link', { name: 'All Assets' })).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
