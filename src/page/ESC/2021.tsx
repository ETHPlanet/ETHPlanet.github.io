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
import { dateFormatter, words } from './i18n';
import { footer_links, QAs } from './data';

const ActivityTitle = `${textJoin(words.ethereum, words.summer_camp)} 2021`;

@observer
@component({
    tagName: 'esc2021-page',
    renderTarget: 'children'
})
export class ESC2021Page extends mixin() {
    connectedCallback() {
        this.classList.add(style.box);

        activity.getOne('1');
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
        const {
            current: { start_time, end_time },
            allItems
        } = activity;

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
                        <h1 className="text-primary mt-5">{ActivityTitle}</h1>
                        <p className="h5 my-3">
                            {dateFormatter.format(new Date(start_time))} ~{' '}
                            {dateFormatter.format(new Date(end_time))}
                        </p>
                        <p className="mb-5">
                            {words.together_with_enthusiasts_build_for_ethereum}
                        </p>
                    </div>
                </header>
                <section className="row m-0 align-items-center bg-light">
                    <div className="col-12 col-sm-6 px-5 pt-5 pb-sm-5">
                        <h2 className="text-uppercase text-primary">
                            {ActivityTitle} {words.introduction}
                        </h2>
                        <p className="text-muted m-0">{words.introduction_0}</p>
                    </div>
                    <ul className="col-12 col-sm-6 p-5 list-unstyled text-muted">
                        <li className={style.aboutItem}>
                            {words.introduction_1}
                        </li>
                        <li className={style.aboutItem}>
                            {words.introduction_2}
                        </li>
                        <li className={style.aboutItem}>
                            {words.introduction_3}
                        </li>
                    </ul>
                </section>
                <nav className={`row m-0 px-md-5 ${style.outNav}`}>
                    <a className="col-6 col-sm-3">{words.register}</a>
                    <a
                        className="col-6 col-sm-3"
                        target="_blank"
                        href="https://discord.com/invite/GF7j9E8"
                    >
                        {words.join} Discord {words.community}
                    </a>
                    <a className="col-6 col-sm-3" href="#become-organizer">
                        {words.apply_to_initiate_an_ethereum_event}
                    </a>
                    <a className="col-6 col-sm-3" href="#become-sponsor">
                        {words.apply_to_be_a_sponsor}
                    </a>
                </nav>

                <section className="container my-5" id="latest-activities">
                    <Gallery
                        list={allItems.map(({ banner: { url }, name }) => ({
                            image: url,
                            title: name
                        }))}
                    />
                </section>
                <h2 className="h3 text-uppercase text-center text-warning my-3">
                    {words.the_first_confirmed_speakers}
                </h2>
                <p className={style.speakerSubTitle}>
                    {words.apply_to_be_a_speaker}
                </p>
                {this.renderSpeakers()}

                <section className="row mx-0 my-5">
                    <div
                        id="become-organizer"
                        className="col-12 col-sm-6 p-5 d-flex flex-column"
                        style={{ background: 'rgb(255, 235, 199)' }}
                    >
                        <h2 className="h4 text-warning">
                            {words.opportunity_to_showcase} / {words.join}{' '}
                            {ActivityTitle} / {words.initiate_an_event}
                        </h2>
                        {words.we_can_help_event_initiators}
                        <ul className="flex-fill">
                            <li>{words.organizer_1}</li>
                            <li>{words.organizer_2}</li>
                        </ul>
                        <footer>
                            <Button color="warning">
                                {words.apply_to_initiate_an_ethereum_event}
                            </Button>
                        </footer>
                    </div>
                    <div
                        id="become-sponsor"
                        className="col-12 col-sm-6 p-5 d-flex flex-column bg-info"
                    >
                        <h2 className="h4 text-primary">
                            {words.opportunity_for_sponsorship} /{' '}
                            {words.why_should_i_sponsor} {ActivityTitle} ?
                        </h2>
                        {words.we_can_help_sponsors}
                        <ul className="flex-fill">
                            <li>{words.organizer_2}</li>
                            <li>{words.sponsor_2}</li>
                            <li>{words.sponsor_3}</li>
                        </ul>
                        <footer>
                            <Button color="primary">
                                {words.apply_to_be_a_sponsor}
                            </Button>
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
