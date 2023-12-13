// https://www.npmjs.com/package/@adobe/exc-app is currently only available as a CommonJS module.
// I created a ticket to have it published as an ES module as well: https://jira.corp.adobe.com/browse/EXC-34144
// Until then, we need to use a workaround to convert CommonJS to ES modules.
// Everthing exported from this module will be converted and available as an ES module.

/* eslint-disable import/no-extraneous-dependencies,import/extensions, no-restricted-exports */

export { default, init } from '@adobe/exc-app';
export { default as page } from '@adobe/exc-app/page';
export { default as user } from '@adobe/exc-app/user';
export { default as topbar } from '@adobe/exc-app/topbar';
export { default as helpcenter } from '@adobe/exc-app/helpcenter';
export { default as userprofile } from '@adobe/exc-app/userprofile';
export { default as shell } from '@adobe/exc-app/shell';
export { default as settings, SettingsLevel } from '@adobe/exc-app/settings';
