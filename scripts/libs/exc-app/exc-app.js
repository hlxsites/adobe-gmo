var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function getDefaultExportFromNamespaceIfPresent (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') ? n['default'] : n;
}

function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			if (this instanceof a) {
        return Reflect.construct(f, arguments, this.constructor);
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var excApp = {};

var Global = {};

"use strict";
/*************************************************************************
 * Copyright 2020 Adobe
 * All Rights Reserved.
 *
 * NOTICE: Adobe permits you to use, modify, and distribute this file in
 * accordance with the terms of the Adobe license agreement accompanying
 * it. If you have received this file from a source other than Adobe,
 * then your use, modification, or distribution of it requires the prior
 * written permission of Adobe.
 **************************************************************************/
Object.defineProperty(Global, "__esModule", { value: true });
var connect_1 = Global.connect = getImpl_1 = Global.getImpl = void 0;
/**
 * Gets the implementation for the module.
 * @ignore
 * @param moduleName The name of the module.
 * @returns The implementation.
 */
function getImpl(moduleName) {
    const emr = window['exc-module-runtime'];
    if (!emr) {
        throw new Error(`module-runtime APIs not available (Fetching ${moduleName}).`);
    }
    return emr[moduleName];
}
var getImpl_1 = Global.getImpl = getImpl;
/**
 * Connects attributes of the specified API.
 * @ignore
 * @param apiName Name of the API.
 * @param attributes The attributes to connect.
 * @returns The API instance.
 */
function connect(apiName, attributes) {
    const api = {};
    attributes.forEach(feature => {
        const featureName = feature[0];
        if (feature[1]) {
            api[featureName] = ((...args) => {
                return getImpl(apiName)[featureName](...args);
            });
        }
        else {
            Object.defineProperty(api, featureName, {
                get: () => {
                    return getImpl(apiName)[featureName];
                },
                set: value => {
                    getImpl(apiName)[featureName] = value;
                }
            });
        }
    });
    return api;
}
connect_1 = Global.connect = connect;
var _default$6 = Global.default = window;

var version = {};

"use strict";
Object.defineProperty(version, "__esModule", { value: true });
/*************************************************************************
 * Copyright 2021 Adobe
 * All Rights Reserved.
 *
 * NOTICE: Adobe permits you to use, modify, and distribute this file in
 * accordance with the terms of the Adobe license agreement accompanying
 * it. If you have received this file from a source other than Adobe,
 * then your use, modification, or distribution of it requires the prior
 * written permission of Adobe.
 **************************************************************************/
const EXC_APP_VERSION = '1.2.10';
var _default$5 = version.default = EXC_APP_VERSION;

"use strict";
/*************************************************************************
 * Copyright 2020 Adobe
 * All Rights Reserved.
 *
 * NOTICE: Adobe permits you to use, modify, and distribute this file in
 * accordance with the terms of the Adobe license agreement accompanying
 * it. If you have received this file from a source other than Adobe,
 * then your use, modification, or distribution of it requires the prior
 * written permission of Adobe.
 **************************************************************************/
var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(excApp, "__esModule", { value: true });
var init_1 = excApp.init = void 0;
/**
 * API used to integrate as solution web application with the unified shell of the Adobe Experience
 * Cloud.
 * @packageDocumentation
 * @preferred
 */
const Global_1$4 = __importStar(Global);
const version_1 = __importDefault(version);
/**
 * Get the runtime object which contains all unified-shell APIs.
 *
 * ***Example:***
 *
 * ```typescript
 * import React from 'react';
 * import ReactDOM from 'react-dom';
 * import excApp from '@adobe/exc-app';
 *
 * export class MyComponent extends React.Component {
 *   constructor(props) {
 *     this.runtime = excApp();
 *   }
 * }
 * ```
 * @returns The runtime object.
 */
function runtime() {
    // Pass through first argument for backwards compatibility
    return (0, Global_1$4.getImpl)('default')(arguments[0]); // eslint-disable-line prefer-rest-params
}
var _default$4 = excApp.default = runtime;
/**
 * Initializes a solution web application by invoking the bootstrap callback
 * once the runtime is ready.
 * 1. if the module is already defined, start to bootstrap
 * 2. otherwise define the global callback that will be called when runtime is ready.
 *
 * ***Example:***
 *
 * ```typescript
 * import React from 'react';
 * import ReactDOM from 'react-dom';
 * import runtime, {init} from '@adobe/exc-app';
 *
 * init(() => {
 *   ReactDOM.render(<MainComponent runtime={runtime()} />, document.querySelector('#main'));
 * });
 * ```
 * @param bootstrap Callback used to bootstrap a solution. The runtime object is passed in as a
 * parameter to this callback.
 */
function init(bootstrap) {
    const callback = () => {
        delete Global_1$4.default.EXC_MR_READY;
        if (Global_1$4.default['exc-module-runtime']) {
            Global_1$4.default['exc-module-runtime']['exc-app-version'] = version_1.default;
        }
        bootstrap(runtime());
    };
    if (Global_1$4.default['exc-module-runtime']) {
        callback();
    }
    else {
        callback.autoDelete = true;
        Global_1$4.default.EXC_MR_READY = callback;
    }
}
init_1 = excApp.init = init;

var page$1 = {};

(function (exports) {
	"use strict";
	/*************************************************************************
	 * Copyright 2020 Adobe
	 * All Rights Reserved.
	 *
	 * NOTICE: Adobe permits you to use, modify, and distribute this file in
	 * accordance with the terms of the Adobe license agreement accompanying
	 * it. If you have received this file from a source other than Adobe,
	 * then your use, modification, or distribution of it requires the prior
	 * written permission of Adobe.
	 **************************************************************************/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.THUNDERBIRD = exports.SRC_DOC = exports.ObservableType = void 0;
	/**
	 * APIs that let solutions interact with the main page and personalize it, e.g. setting the title,
	 * favicon, refreshing the solution iframe, etc.
	 *
	 * ***Import:***
	 *
	 * ```typescript
	 * import page from '@adobe/exc-app/page';
	 * ```
	 *
	 * ***Default export:***
	 *
	 * [PageApi](../interfaces/page.pageapi.md#interface-pageapi)
	 *
	 * ***Usage:***
	 *
	 * ```typescript
	 * import page from '@adobe/exc-app/page';
	 *
	 * page.title = 'Experience Cloud';
	 *
	 * // Show spinner while performing an async operation
	 * page.spinner = true;
	 * try {
	 *   await performOperation();
	 * } finally {
	 *   page.spinner = false;
	 * }
	 *
	 * // Generate a shell URL that directly opens the specified solution URL
	 * const shellUrl = page.generateShellUrl('/relative/path');
	 *
	 * // Navigate to another solution
	 * page.shellRedirect('/target');
	 * ```
	 * @packageDocumentation
	 * @module page
	 */
	const Global_1 = Global;
	var ObservableType;
	(function (ObservableType) {
	    ObservableType["MODAL"] = "MODAL";
	    ObservableType["POPOVER"] = "POPOVER";
	})(ObservableType = exports.ObservableType || (exports.ObservableType = {}));
	/**
	 * @deprecated Solution's list of multiple subdomains
	 */
	var SRC_DOC;
	(function (SRC_DOC) {
	    SRC_DOC[SRC_DOC["DISABLED"] = 0] = "DISABLED";
	    SRC_DOC[SRC_DOC["HTML"] = 1] = "HTML";
	    SRC_DOC[SRC_DOC["MANIFEST"] = 2] = "MANIFEST"; // Manifest mode will be added as phase 2, not yet supported.
	})(SRC_DOC = exports.SRC_DOC || (exports.SRC_DOC = {}));
	var THUNDERBIRD;
	(function (THUNDERBIRD) {
	    THUNDERBIRD[THUNDERBIRD["OFF"] = 0] = "OFF";
	    THUNDERBIRD[THUNDERBIRD["SRC_DOC"] = 1] = "SRC_DOC";
	    THUNDERBIRD[THUNDERBIRD["SERVICE_WORKER"] = 2] = "SERVICE_WORKER";
	})(THUNDERBIRD = exports.THUNDERBIRD || (exports.THUNDERBIRD = {}));
	const page = (0, Global_1.connect)('page', [
	    ['afterPrintHandler'],
	    ['appContainer'],
	    ['beforePrintHandler'],
	    ['blockNavigation', true],
	    ['clipboardWrite', true],
	    ['done', true],
	    ['generateShellUrl', true],
	    ['getModalQuerySelectors'],
	    ['getObservableQuerySelectors'],
	    ['favicon'],
	    ['iframeReload', true],
	    ['modal'],
	    ['modalAutoDetect'],
	    ['notFound', true],
	    ['openInNewTab', true],
	    ['preventDefaultCombos'],
	    ['print', true],
	    ['shellRedirect', true],
	    ['setModalQuerySelectors'],
	    ['setObservableQuerySelectors'],
	    ['spinner'],
	    ['title'],
	    ['toggleAutoDetect'],
	    ['unloadPromptMessage']
	]);
	exports.default = page;
	
} (page$1));

var page = /*@__PURE__*/getDefaultExportFromCjs(page$1);

var user$1 = {};

"use strict";
/*************************************************************************
 * Copyright 2020 Adobe
 * All Rights Reserved.
 *
 * NOTICE: Adobe permits you to use, modify, and distribute this file in
 * accordance with the terms of the Adobe license agreement accompanying
 * it. If you have received this file from a source other than Adobe,
 * then your use, modification, or distribution of it requires the prior
 * written permission of Adobe.
 **************************************************************************/
Object.defineProperty(user$1, "__esModule", { value: true });
const Global_1$3 = Global;
const user = {
    authExpired: () => {
        return (0, Global_1$3.getImpl)('user')().authExpired();
    },
    emit: (type, evt) => {
        return (0, Global_1$3.getImpl)('user')().emit(type, evt);
    },
    generateSubOrg: (productContext, overrides) => {
        return (0, Global_1$3.getImpl)('user')().generateSubOrg(productContext, overrides);
    },
    get: params => {
        return (0, Global_1$3.getImpl)('user')().get(params);
    },
    getCustomToken: (ims) => {
        return (0, Global_1$3.getImpl)('user')().getCustomToken(ims);
    },
    getFulfillableItems: (serviceCode) => {
        return (0, Global_1$3.getImpl)('user')().getFulfillableItems(serviceCode);
    },
    off: (type, handler) => {
        return (0, Global_1$3.getImpl)('user')().off(type, handler);
    },
    on: (type, handler) => {
        return (0, Global_1$3.getImpl)('user')().on(type, handler);
    }
};
Object.defineProperty(user, 'logoutUrl', {
    get: () => {
        return (0, Global_1$3.getImpl)('user')().logoutUrl;
    },
    set: (value) => {
        (0, Global_1$3.getImpl)('user')().logoutUrl = value;
    }
});
Object.defineProperty(user, 'showLanguagePicker', {
    get: () => {
        return (0, Global_1$3.getImpl)('user')().showLanguagePicker;
    },
    set: (value) => {
        (0, Global_1$3.getImpl)('user')().showLanguagePicker = value;
    }
});
Object.defineProperty(user, 'showRolesPicker', {
    get: () => {
        return (0, Global_1$3.getImpl)('user')().showRolesPicker;
    },
    set: (value) => {
        (0, Global_1$3.getImpl)('user')().showRolesPicker = value;
    }
});
var _default$3 = user$1.default = user;

var topbar$1 = {};

"use strict";
/*************************************************************************
 * Copyright 2020 Adobe
 * All Rights Reserved.
 *
 * NOTICE: Adobe permits you to use, modify, and distribute this file in
 * accordance with the terms of the Adobe license agreement accompanying
 * it. If you have received this file from a source other than Adobe,
 * then your use, modification, or distribution of it requires the prior
 * written permission of Adobe.
 **************************************************************************/
Object.defineProperty(topbar$1, "__esModule", { value: true });
/**
 * APIs that let solutions interact with the top bar and personalize it, e.g. configuring the
 * solution area on the left, setting up workspaces, custom search, etc.
 *
 * ***Import:***
 *
 * ```typescript
 * import topbar from '@adobe/exc-app/topbar';
 * ```
 *
 * ***Default export:***
 *
 * [TopbarApi](../interfaces/topbar.topbarapi.md#interface-topbarapi)
 *
 * ***Usage:***
 *
 * ```typescript
 * import topbar from '@adobe/exc-app/topbar';
 *
 * topbar.customEnvLabel = 'Beta';
 * ```
 * @packageDocumentation
 * @module topbar
 */
const Global_1$2 = Global;
const topbar = (0, Global_1$2.connect)('topbar', [
    ['customEnvLabel'],
    ['onHeroClick', true],
    ['setCustomSearch', true],
    ['setCoachMark', true],
    ['setFeedbackButton', true],
    ['solution'],
    ['workspaces']
]);
var _default$2 = topbar$1.default = topbar;

var helpcenter$1 = {};

(function (exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ReleaseType = void 0;
	/*************************************************************************
	 * Copyright 2020 Adobe
	 * All Rights Reserved.
	 *
	 * NOTICE: Adobe permits you to use, modify, and distribute this file in
	 * accordance with the terms of the Adobe license agreement accompanying
	 * it. If you have received this file from a source other than Adobe,
	 * then your use, modification, or distribution of it requires the prior
	 * written permission of Adobe.
	 **************************************************************************/
	/**
	 * APIs that let solutions interact with Help Center.
	 *
	 * ***Import:***
	 *
	 * ```typescript
	 * import helpCenter from '@adobe/exc-app/helpcenter';
	 * ```
	 *
	 * ***Default export:***
	 *
	 * [HelpCenterApi](../interfaces/helpcenter.helpcenterapi.md#interface-helpcenterapi)
	 *
	 * ***Usage:***
	 *
	 * ```typescript
	 * import helpCenter from '@adobe/exc-app/helpcenter';
	 *
	 * helpCenter.config = {
	 *   resources: [
	 *     {
	 *       href: 'https://marketing.adobe.com/resources/help/en_US/home/index.html',
	 *       label: 'Help Home'
	 *     }
	 *   ]
	 * };
	 * ```
	 * @packageDocumentation
	 * @module helpCenter
	 */
	const Global_1 = Global;
	var ReleaseType;
	(function (ReleaseType) {
	    ReleaseType["ALPHA"] = "alpha";
	    ReleaseType["BETA"] = "beta";
	})(ReleaseType = exports.ReleaseType || (exports.ReleaseType = {}));
	const helpCenter = (0, Global_1.connect)('helpCenter', [
	    ['setButton', true],
	    ['setButtons', true],
	    ['setFeedbackConfig', true],
	    ['config'],
	    ['open', true],
	    ['submitJiraFeedback', true]
	]);
	exports.default = helpCenter;
	
} (helpcenter$1));

var helpcenter = /*@__PURE__*/getDefaultExportFromCjs(helpcenter$1);

var userprofile = {};

"use strict";
Object.defineProperty(userprofile, "__esModule", { value: true });
/*************************************************************************
 * Copyright 2020 Adobe
 * All Rights Reserved.
 *
 * NOTICE: Adobe permits you to use, modify, and distribute this file in
 * accordance with the terms of the Adobe license agreement accompanying
 * it. If you have received this file from a source other than Adobe,
 * then your use, modification, or distribution of it requires the prior
 * written permission of Adobe.
 **************************************************************************/
/**
 * APIs that let solutions interact with User Profile menu.
 *
 * ***Import:***
 *
 * ```typescript
 * import userProfile from '@adobe/exc-app/userProfile';
 * ```
 *
 * ***Default export:***
 *
 * [UserProfileApi](../interfaces/userprofile.userprofileapi.md#interface-userprofileapi)
 *
 * ***Usage:***
 *
 * ```typescript
 * import userProfile from '@adobe/exc-app/userProfile';
 *
 * userProfile.setButtons([{
 *   callback: () => {},
 *   id: 'button',
 *   label: 'Button'
 * }]);
 * ```
 *
 * This configuration is a method only for solutions that need to manage alternative User Profile flows not covered by the Shell.
 * @packageDocumentation
 * @module userProfile
 */
const Global_1$1 = Global;
const userProfile = (0, Global_1$1.connect)('userProfile', [
    ['setButtons', true]
]);
var _default$1 = userprofile.default = userProfile;

var shell$1 = {};

"use strict";
/*************************************************************************
 * Copyright 2020 Adobe
 * All Rights Reserved.
 *
 * NOTICE: Adobe permits you to use, modify, and distribute this file in
 * accordance with the terms of the Adobe license agreement accompanying
 * it. If you have received this file from a source other than Adobe,
 * then your use, modification, or distribution of it requires the prior
 * written permission of Adobe.
 **************************************************************************/
Object.defineProperty(shell$1, "__esModule", { value: true });
const Global_1 = Global;
const shell = {
    emit: (type, evt) => {
        return (0, Global_1.getImpl)('shell')().emit(type, evt);
    },
    get: params => {
        return (0, Global_1.getImpl)('shell')().get(params);
    },
    getExtendedShellInfo: () => {
        return (0, Global_1.getImpl)('shell')().getExtendedShellInfo();
    },
    off: (type, handler) => {
        return (0, Global_1.getImpl)('shell')().off(type, handler);
    },
    on: (type, handler) => {
        return (0, Global_1.getImpl)('shell')().on(type, handler);
    }
};
var _default = shell$1.default = shell;

var settings$1 = {};

var SettingsLevel$1 = {};

(function (exports) {
	"use strict";
	/*************************************************************************
	 * Copyright 2021 Adobe
	 * All Rights Reserved.
	 *
	 * NOTICE: Adobe permits you to use, modify, and distribute this file in
	 * accordance with the terms of the Adobe license agreement accompanying
	 * it. If you have received this file from a source other than Adobe,
	 * then your use, modification, or distribution of it requires the prior
	 * written permission of Adobe.
	 **************************************************************************/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SettingsLevel = void 0;
	/**
	 * @ignore
	 */
	var SettingsLevel;
	(function (SettingsLevel) {
	    /**
	     * Settings specific to the org.
	     */
	    SettingsLevel["ORG"] = "org";
	    /**
	     * Settings specific to the user.
	     */
	    SettingsLevel["USER"] = "user";
	    /**
	     * Settings specific to the user-org combination.
	     */
	    SettingsLevel["USERORG"] = "userorg";
	})(SettingsLevel = exports.SettingsLevel || (exports.SettingsLevel = {}));
	
} (SettingsLevel$1));

var SettingsLevel = /*@__PURE__*/getDefaultExportFromCjs(SettingsLevel$1);

(function (exports) {
	"use strict";
	/*************************************************************************
	 * Copyright 2020 Adobe
	 * All Rights Reserved.
	 *
	 * NOTICE: Adobe permits you to use, modify, and distribute this file in
	 * accordance with the terms of the Adobe license agreement accompanying
	 * it. If you have received this file from a source other than Adobe,
	 * then your use, modification, or distribution of it requires the prior
	 * written permission of Adobe.
	 **************************************************************************/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SettingsLevel = void 0;
	/**
	 * APIs to get or set settings, preferences or configuration data that can be stored and retrieved
	 * at an IMS user and/or an IMS org level. An app in unified shell can consume Settings service.
	 *
	 * To consume this API, add the following import to your code.
	 *
	 * ```typescript
	 * import settings from '@adobe/exc-app/settings';
	 * ```
	 *
	 * The default export is an object of type [SettingsApi](../interfaces/_settings_.settingsapi.md)
	 *
	 * API reference: [scroll down](#index)
	 *
	 * ### Sample code
	 *
	 * ```typescript
	 * import settings, {SettingsLevel} from '@adobe/exc-app/settings';
	 *
	 * async function updateSettings(type: string, value: number) {
	 *   const data = await settings.get({
	 *     groupId: 'test-groupId',
	 *     level: SettingsLevel.USER,
	 *     settings: {key1: null}
	 *   });
	 *   data = data || {};
	 *   data[type] = value;
	 *   await settings.set({
	 *     groupId: 'test-groupId',
	 *     level: SettingsLevel.USER,
	 *     settings: {key1: data}
	 *   });
	 * }
	 * ```
	 *
	 * ### SettingsLevel
	 *
	 * Can be optionally specified to define the level at which settings are saved.
	 *
	 * * `SettingsLevel.USER` - use this level when you want to get/set settings per user.
	 * * `SettingsLevel.USERORG` - should be used when settings are for user + org combination.
	 * * `SettingsLevel.ORG` - use this level when you want to get/set settings per org.
	 *
	 * By default settings are saved at level `SettingsLevel.USERORG`. You can optionally override this
	 * in the get/set API calls using the `level` parameter.
	 *
	 * ### Groups
	 *
	 * Apps can group their settings into different groups by different group IDs and keep multiple
	 * settings in different groups. Apps are free to define their own groups for a particular selected
	 * settings level.
	 *
	 * You can specify this in the get/set API calls using the `groupId` parameter.
	 *
	 * ### Sharing settings
	 *
	 * Set settingsAppId in the solution specific route configuration in order to share settings with
	 * other applications.
	 * @packageDocumentation
	 * @module settings
	 */
	const Global_1 = Global;
	const SettingsLevel_1 = SettingsLevel$1;
	Object.defineProperty(exports, "SettingsLevel", { enumerable: true, get: function () { return SettingsLevel_1.SettingsLevel; } });
	const settings = {
	    get: params => (0, Global_1.getImpl)('settings')().get(params),
	    set: params => (0, Global_1.getImpl)('settings')().set(params)
	};
	exports.default = settings;
	
} (settings$1));

var settings = /*@__PURE__*/getDefaultExportFromCjs(settings$1);

// https://www.npmjs.com/package/@adobe/exc-app is currently only available as a CommonJS module.

var SettingsLevel$2 = settings$1.SettingsLevel;
export { SettingsLevel$2 as SettingsLevel, _default$4 as default, helpcenter, init_1 as init, page, settings, _default as shell, _default$2 as topbar, _default$3 as user, _default$1 as userprofile };
