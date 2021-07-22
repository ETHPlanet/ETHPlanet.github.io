import { component, mixin, createCell, Fragment } from 'web-cell';
import { observer } from 'mobx-web-cell';
import classNames from 'classnames';
import { groupBy } from 'web-utility/source/data';

import { Image } from 'boot-cell/source/Media/Image';
import { Button } from 'boot-cell/source/Form/Button';
import { NavBar } from 'boot-cell/source/Navigator/NavBar';
import { NavLink } from 'boot-cell/source/Navigator/Nav';

import { Gallery } from '../../component/Gallery';
import style from './2021.module.less';
import {
    PartnershipTypes,
    Partnership,
    activity,
    program,
    partnership
} from '../../model';

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
            <>
                <ul className="list-unstyled row w-75 mx-auto text-uppercase text-center">
                    {allItems.map(({ mentors: [speaker] }) => (
                        <li
                            className={classNames(
                                'col-3',
                                'mt-5',
                                style.speaker
                            )}
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
                    View more
                </Button>
            </>
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
            <section className="w-75 mx-auto">
                {[
                    ['', sponsor],
                    ['Media', media],
                    ['Community', community]
                ].map(([type, list]: [string, Partnership[]], index) => (
                    <>
                        <h2
                            className={classNames(
                                'h4',
                                'text-uppercase',
                                'text-center',
                                `text-${index % 2 ? 'primary' : 'warning'}`
                            )}
                        >
                            {type} Partners
                        </h2>
                        <ul className="list-unstyled row">
                            {list?.map(({ organization: { logo } }) => (
                                <li className="col-3 my-4 d-flex justify-content-center align-items-center">
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
                        关于我们
                    </NavLink>
                    <NavLink>活动日程</NavLink>
                    <NavLink>合作通道</NavLink>
                </NavBar>
                <header className="row m-0">
                    <div className="col-3 offset-3 py-5 text-uppercase">
                        <h1 className="text-primary">
                            Ethereum
                            <br />
                            Summer
                            <br />
                            Camp 2021
                        </h1>
                        <p>
                            <strong>8 weeks, 53 days,</strong> the largest
                            online festival for the Ethereum community.
                        </p>
                        <p>
                            Bringing Ethereum builders together to shape the
                            future of Ethereum.
                        </p>
                    </div>
                </header>
                <section className="row m-0 bg-light">
                    <div className="col-6 p-5">
                        <h2 className="text-uppercase text-primary">
                            About Ethereum Summer Camp 2020
                        </h2>
                        <p className="text-muted">
                            Ethereum Summer Camp is the largest online festival
                            for the Ethereum community with a series
                            oflive-streamed events including dozens of events,
                            workshops, Ethereum Technology and
                            ApplicationConference — ETAC and Community Ethereum
                            Development Conference — EDCON. Events allvirtual,
                            all free, all summer long, and everyone's invited!
                        </p>
                    </div>
                    <ul className="col-6 p-5 list-unstyled text-muted">
                        <li className="my-3">
                            Be the first to learn about the exciting
                            announcements and the latest updates from Ethereum
                            builders and entrepreneurs, and of course, Eth 2.0!
                        </li>
                        <li className="my-3">
                            Not just hackers, who don’t love a challenge? You
                            will be able to solve some challenges with grants of
                            rewards!
                        </li>
                        <li className="my-3">
                            You will have one-on-one time to meet and greet with
                            other folks! But don’t forget, it’s a summer camp,
                            so, you know, we will have parties, DJs, game
                            tournaments, and find a way to dance together with
                            Vitalik!
                        </li>
                    </ul>
                </section>
                <nav className={style.outNav}>
                    <a>注册报名</a>
                    <a
                        target="_blank"
                        href="https://discord.com/invite/GF7j9E8"
                    >
                        加入 Discord 社区
                    </a>
                    <a>申请主办活动</a>
                    <a>申请成为赞助商</a>
                </nav>

                <Gallery
                    className="w-75 my-5"
                    list={allItems.map(({ banner: { url }, name }) => ({
                        image: url,
                        title: name
                    }))}
                />
                <h2 className="h3 text-uppercase text-center text-warning my-3">
                    These Are the First Confirmed Speakers for ESC 2020
                </h2>
                <p className={style.speakerSubTitle}>
                    Apply to Speak at ESC 2020
                </p>
                {this.renderSpeakers()}

                <section className="row mx-0 my-5">
                    <div
                        className="col-6 p-5 d-flex flex-column"
                        style={{ background: 'rgb(255, 235, 199)' }}
                    >
                        <h2 className="h4 text-warning">
                            展示机会 加入 ESC2021 成为活动发起者
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
                    <div className="col-6 p-5 d-flex flex-column bg-info">
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
            </>
        );
    }
}
