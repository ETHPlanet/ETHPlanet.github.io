import { HTMLHyperLinkProps } from 'web-utility/source/DOM-type';

export interface QuestionAnswer {
    question: string;
    answer: string;
}

export const QAs: QuestionAnswer[] = [
    {
        question: '以太坊开发的小白可以参加吗？',
        answer: '我们欢迎任何对以太坊感兴趣的个人以及团队参与进来，让以太坊得到更好的发展'
    },
    {
        question: '一个团队可以有多少人？',
        answer: ''
    }
];

export interface LinkGroup {
    title: string;
    list: HTMLHyperLinkProps[];
}

export const footer_links: LinkGroup[] = [
    {
        title: 'Quick Links',
        list: [
            {
                title: 'Apply as a volunteer'
            },
            {
                title: 'Apply as a community partner',
                href: 'https://www.notion.so/Join-Us-3bda6e10aaa64c199067068578b080f3'
            },
            {
                title: 'Terms and conditions',
                href: 'https://www.ethplanet.org/zh/terms-of-use/'
            },
            {
                title: 'Privacy statement',
                href: 'https://www.ethplanet.org/zh/privacy/'
            }
        ]
    },
    {
        title: 'Connect with Us',
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
        title: 'About',
        list: [
            { title: 'Team', href: 'https://www.ethplanet.org/zh/about/' },
            {
                title: 'Careers',
                href: 'https://www.notion.so/Join-Us-3bda6e10aaa64c199067068578b080f3'
            },
            { title: 'News', href: 'https://medium.com/ethplanet' },
            {
                title: 'Branding',
                href: 'https://www.notion.so/About-ETHPlanet-bb79a415a1b844c2809ebadca62f3899'
            }
        ]
    }
];
