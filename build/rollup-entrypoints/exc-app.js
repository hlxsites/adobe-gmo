// https://www.npmjs.com/package/@adobe/exc-app is currently only available as a CommonJS module.
// I created a ticket to have it published as an ES module as well: https://jira.corp.adobe.com/browse/EXC-34144
// Until then, we need to use a workaround to convert CommonJS to ES modules.
// Everthing exported from this module will be converted and available as an ES module.

/* eslint-disable import/no-extraneous-dependencies,import/extensions */
import excApp, { init } from '@adobe/exc-app';
import page from '@adobe/exc-app/page';
import user from '@adobe/exc-app/user';
import topbar from '@adobe/exc-app/topbar';
import helpcenter from '@adobe/exc-app/helpcenter';
import userprofile from '@adobe/exc-app/userprofile';
import shell from '@adobe/exc-app/shell';

export default excApp;
export {
  init, page, user, topbar, helpcenter, userprofile, shell,
};
