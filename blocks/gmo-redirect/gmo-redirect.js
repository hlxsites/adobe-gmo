import {
  readBlockConfig
} from '../../scripts/lib-franklin.js';
/**
 *
 * @param {HTMLElement} block
 */

export default async function decorate(block) {
  // Takes a config name as a string to be used as a regex and redirects to the value's location.
  // Groups can be named using (?<name>...) and referenced in the redirect using {name}
  // Example:
  // regex1        | /share/(?<shareid>[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12})
  // redirect1     | https://experience.adobe.com/?repoId=delivery-p108396-e1046543.adobeaemcloud.com#/@wfadoberm/assets/contenthub/shares/{shareid} 
  const config = readBlockConfig(block);
  const path = window.location.pathname + window.location.hash;

  for(let reg in config){
    if(reg.startsWith('regex')){
      const regex = new RegExp(config[reg]);
      let redirect = config[reg.replace('regex', 'redirect')];
      const match = path.match(regex);
      if(match){
        for(let key in match.groups){
          redirect = redirect.replace(`{${key}}`, match.groups[key]);
        }
        alert('You are being redirected to the latest version of the Marketing Hub. Please update your URL, if saved/bookmarked.')
        console.info('redirecting to', redirect);
        window.location.href = redirect;
        return;
      }
    }
  }
  block.innerHTML = '';
}


