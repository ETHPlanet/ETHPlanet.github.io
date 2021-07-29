import { HTMLHyperLinkProps } from 'web-utility/source/DOM-type';

import { words } from './i18n';

export interface QuestionAnswer {
    question: string;
    answer: string;
}

export const QAs: QuestionAnswer[] = [
    {
        question: words.question_1,
        answer: words.answer_1
    },
    {
        question: words.question_2,
        answer: words.answer_2
    },
    {
        question: words.question_3,
        answer: words.answer_3
    },
    {
        question: words.question_4,
        answer: words.answer_4
    }
];

export interface LinkGroup {
    title: string;
    list: HTMLHyperLinkProps[];
}

export const footer_links: LinkGroup[] = [
    {
        title: words.quick_links,
        list: [
            {
                title: words.apply_to_be_a_volunteer
            },
            {
                title: words.apply_for_community_cooperation,
                href: 'https://www.notion.so/Join-Us-3bda6e10aaa64c199067068578b080f3'
            },
            {
                title: words.terms_and_conditions,
                href: 'https://www.ethplanet.org/zh/terms-of-use/'
            },
            {
                title: words.privacy_policy,
                href: 'https://www.ethplanet.org/zh/privacy/'
            }
        ]
    },
    {
        title: words.contact_us,
        list: [
            { title: 'Twitter', href: 'https://twitter.com/ethplanet' },
            { title: 'Facebook', href: 'https://www.facebook.com/ethPlanet/' },
            { title: 'Instagram' },
            {
                title: 'YouTube',
                href: 'https://www.youtube.com/channel/UCfim8P_DCSOYRMW30NqTs8Q'
            },
            { title: 'Reddit', href: 'https://www.reddit.com/r/PlanetofETH/' },
            { title: 'Discord', href: 'https://discord.com/invite/GF7j9E8' }
        ]
    },
    {
        title: words.about,
        list: [
            { title: words.teams, href: 'https://www.ethplanet.org/zh/about/' },
            {
                title: words.work,
                href: 'https://www.notion.so/Join-Us-3bda6e10aaa64c199067068578b080f3'
            },
            { title: words.news, href: 'https://medium.com/ethplanet' },
            {
                title: words.brands,
                href: 'https://www.notion.so/About-ETHPlanet-bb79a415a1b844c2809ebadca62f3899'
            }
        ]
    }
];
