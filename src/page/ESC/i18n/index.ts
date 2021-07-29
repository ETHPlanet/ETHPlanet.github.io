import { bootI18n } from 'web-utility';

import { zh_CN } from './zh-CN';
import { zh_TW } from './zh-TW';
import { en_US } from './en-US';

export const { words } = bootI18n({
    'zh-CN': zh_CN,
    'zh-SG': zh_CN,
    'zh-TW': zh_TW,
    'zh-HK': zh_TW,
    'zh-MO': zh_TW,
    'en-US': en_US
});

export const dateFormatter = new Intl.DateTimeFormat(navigator.language, {
    dateStyle: 'long'
});

self.addEventListener('languagechange', () => self.location.reload());
