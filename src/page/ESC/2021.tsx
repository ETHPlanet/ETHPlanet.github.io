import { component, mixin, createCell, Fragment } from 'web-cell';
import { observer } from 'mobx-web-cell';
import { groupBy } from 'web-utility/source/data';
import { textJoin } from 'web-utility/source/i18n';

import { Image } from 'boot-cell/source/Media/Image';
import { Button } from 'boot-cell/source/Form/Button';
import { Field } from 'boot-cell/source/Form/Field';
import { NavBar } from 'boot-cell/source/Navigator/NavBar';
import { NavLink } from 'boot-cell/source/Navigator/Nav';

import { Gallery } from '../../component/Gallery';
import {
    PartnershipTypes,
    Partnership,
    activity,
    program,
    partnership
} from '../../model';

import style from './2021.module.less';
import { words } from './i18n';
import { footer_links, QAs } from './data';

@observer
@component({
    tagName: 'esc2021-page',
    renderTarget: 'children'
})
export class ESC2021Page extends mixin() {
    connectedCallback() {
        this.classList.add(style.box);

        activity.getAll();
        program.getList({ activity: '1', type: 'lecture' });
        partnership.getAll({ activity: '1' });

        super.connectedCallback();
    }

    renderSpeakers() {
        const { allItems } = program;

        return (
            <section className="container">
                <ul className="list-unstyled row text-uppercase text-center">
                    {allItems.map(({ mentors: [speaker] }) => (
                        <li
                            className={`col-sm-6 col-md-3 mt-5 ${style.speaker}`}
                        >
                            <Image
                                className={style.avatar}
                                src={speaker.avatar?.url}
                            />
                            <h3 className="h4 my-2">{speaker.name}</h3>
                            <p className={style.summary}>{speaker.summary}</p>
                        </li>
                    ))}
                </ul>
                <Button
                    className={style.loadSpeaker}
                    color="info"
                    onClick={() => program.getList()}
                >
                    {words.view_more}
                </Button>
            </section>
        );
    }

    renderPartners() {
        const { allItems } = partnership;
        const {
            [PartnershipTypes.sponsor]: sponsor,
            [PartnershipTypes.media]: media,
            [PartnershipTypes.community]: community
        } = groupBy(allItems, 'type');

        return (
            <section className="container">
                {[
                    ['', sponsor],
                    [words.media, media],
                    [words.community, community]
                ].map(([type, list]: [string, Partnership[]], index) => (
                    <>
                        <h2
                            className={`h4 text-uppercase text-center text-${
                                index % 2 ? 'primary' : 'warning'
                            }`}
                        >
                            {textJoin(type, words.partners)}
                        </h2>
                        <ul className="list-unstyled row">
                            {list?.map(({ organization: { logo } }) => (
                                <li className="col-sm-6 col-md-3 my-4 d-flex justify-content-center align-items-center">
                                    <Image
                                        className={style.partner}
                                        fluid
                                        src={logo?.url}
                                    />
                                </li>
                            ))}
                        </ul>
                    </>
                ))}
            </section>
        );
    }

    renderLinkGroup({ title, list }) {
        return (
            <section className="col-12 col-sm-4 mb-4">
                <h2 className="h5">{title}</h2>
                <ul className="list-unstyled m-0">
                    {list.map(({ href, title }) => (
                        <li>
                            <a
                                className="text-dark"
                                target="_blank"
                                href={href}
                            >
                                {title}
                            </a>
                        </li>
                    ))}
                </ul>
            </section>
        );
    }

    render() {
        const { allItems } = activity;

        return (
            <>
                <NavBar
                    className="shadow-none"
                    narrow
                    expand="md"
                    theme="light"
                    background="transparent"
                    brand={
                        <img
                            alt="ETH Planet"
                            src="https://github.com/ETHPlanet.png"
                            style={{ width: '2rem' }}
                        />
                    }
                >
                    <NavLink
                        target="_blank"
                        href="https://www.ethplanet.org/zh/about/"
                    >
                        {words.about_us}
                    </NavLink>
                    <NavLink href="#latest-activities">
                        {words.schedule}
                    </NavLink>
                    <NavLink href="#become-organizer">
                        {words.cooperate}
                    </NavLink>
                </NavBar>
                <header className="row m-0">
                    <div className="col-12 col-md-3 offset-md-2 px-5 px-md-0 py-5 text-uppercase">
                        <h1 className="text-primary">
                            {textJoin(words.ethereum, words.summer_camp)} 2021
                        </h1>
                        <p>
                            <strong>8 weeks, 53 days,</strong> the largest
                            online festival for the Ethereum community.
                        </p>
                        <p className="m-0">
                            Bringing Ethereum builders together to shape the
                            future of Ethereum.
                        </p>
                    </div>
                </header>
                <section className="row m-0 align-items-center bg-light">
                    <div className="col-12 col-sm-6 px-5 pt-5 pb-sm-5">
                        <h2 className="text-uppercase text-primary">
                            {textJoin(words.ethereum, words.summer_camp)} 2021{' '}
                            {words.introduction}
                        </h2>
                        <p className="text-muted m-0">
                            Ethereum Summer Camp is the largest online festival
                            for the Ethereum community with a series
                            oflive-streamed events including dozens of events,
                            workshops, Ethereum Technology and
                            ApplicationConference — ETAC and Community Ethereum
                            Development Conference — EDCON. Events allvirtual,
                            all free, all summer long, and everyone's invited!
                        </p>
                    </div>
                    <ul className="col-12 col-sm-6 p-5 list-unstyled text-muted">
                        <li className={style.aboutItem}>
                            Be the first to learn about the exciting
                            announcements and the latest updates from Ethereum
                            builders and entrepreneurs, and of course, Eth 2.0!
                        </li>
                        <li className={style.aboutItem}>
                            Not just hackers, who don’t love a challenge? You
                            will be able to solve some challenges with grants of
                            rewards!
                        </li>
                        <li className={style.aboutItem}>
                            You will have one-on-one time to meet and greet with
                            other folks! But don’t forget, it’s a summer camp,
                            so, you know, we will have parties, DJs, game
                            tournaments, and find a way to dance together with
                            Vitalik!
                        </li>
                    </ul>
                </section>
                <nav className={`row m-0 px-md-5 ${style.outNav}`}>
                    <a className="col-6 col-sm-3">注册报名</a>
                    <a
                        className="col-6 col-sm-3"
                        target="_blank"
                        href="https://discord.com/invite/GF7j9E8"
                    >
                        加入 Discord 社区
                    </a>
                    <a className="col-6 col-sm-3" href="#become-organizer">
                        申请主办活动
                    </a>
                    <a className="col-6 col-sm-3" href="#become-sponsor">
                        申请成为赞助商
                    </a>
                </nav>

                <Gallery
                    id="latest-activities"
                    className="container my-5"
                    list={allItems.map(({ banner: { url }, name }) => ({
                        image: url,
                        title: name
                    }))}
                />
                <h2 className="h3 text-uppercase text-center text-warning my-3">
                    These Are the First Confirmed Speakers for ESC 2021
                </h2>
                <p className={style.speakerSubTitle}>
                    Apply to Speak at ESC 2021
                </p>
                {this.renderSpeakers()}

                <section className="row mx-0 my-5">
                    <div
                        id="become-organizer"
                        className="col-12 col-sm-6 p-5 d-flex flex-column"
                        style={{ background: 'rgb(255, 235, 199)' }}
                    >
                        <h2 className="h4 text-warning">
                            {words.opportunity_to_showcase} / 加入 ESC2021
                            成为活动发起者
                        </h2>
                        我们可以帮助活动发起者：
                        <ul className="flex-fill">
                            <li>
                                在ESC上获得活动露出或推荐，提升您在区块链行业的品牌知名度
                            </li>
                            <li>
                                与以太坊和区块链社区的数千名开发者、思想领袖和决策者建立联系
                            </li>
                        </ul>
                        <footer>
                            <Button color="warning">申请成为活动发起者</Button>
                        </footer>
                    </div>
                    <div
                        id="become-sponsor"
                        className="col-12 col-sm-6 p-5 d-flex flex-column bg-info"
                    >
                        <h2 className="h4 text-primary">
                            赞助机会 为什么要赞助 ESC2021
                        </h2>
                        我们可以帮助赞助商：
                        <ul className="flex-fill">
                            <li>
                                与以太坊和区块链社区的数千名开发者、思想领袖和决策者建立联系
                            </li>
                            <li>提升您作为区块链行业领导者的品牌知名度</li>
                            <li>与志同道合的行业人士建立新业务</li>
                        </ul>
                        <footer>
                            <Button color="primary">申请成为赞助商</Button>
                        </footer>
                    </div>
                </section>

                {this.renderPartners()}

                <section className="text-center">
                    <h2 className="h3 text-primary my-5">FAQ</h2>

                    {QAs.map(({ question, answer }, index) => (
                        <div
                            className={`p-5 bg-${
                                index % 2 ? 'white' : 'light'
                            }`}
                        >
                            <h3 className="h5">{question}</h3>
                            <p className="m-0 text-muted">{answer}</p>
                        </div>
                    ))}
                </section>

                <section className="container py-5 text-uppercase">
                    <div className="row">
                        <form className="col-12 col-md-3 m-0 order-md-1">
                            <h2 className="h5">
                                {
                                    words.subscribe_to_our_email_to_track_the_latest_news
                                }
                            </h2>
                            <Field
                                type="email"
                                name="email"
                                placeholder={words.enter_your_email_address}
                            />
                            <p className="mb-5 m-md-0 text-muted">
                                {
                                    words.we_hope_to_get_your_donation_and_approval__let_s_work_together_to_make_ethereum_becomes_ever_more_successful
                                }
                            </p>
                        </form>
                        <div className="col-12 col-md-9 row order-md-0">
                            {footer_links.map(this.renderLinkGroup)}
                        </div>
                    </div>
                </section>

                <footer className="p-3 font-weight-bold text-uppercase text-center">
                    Copyright © 2021 ETHPlanet. All rights reserved.
                </footer>
            </>
        );
    }
}
