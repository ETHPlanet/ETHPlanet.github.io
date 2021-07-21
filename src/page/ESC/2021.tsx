import { component, mixin, createCell, Fragment } from 'web-cell';
import { observer } from 'mobx-web-cell';

import { NavBar } from 'boot-cell/source/Navigator/NavBar';
import { NavLink } from 'boot-cell/source/Navigator/Nav';

import { Gallery } from '../../component/Gallery';
import style from './2021.module.less';
import { activity } from '../../model';

@observer
@component({
    tagName: 'esc2021-page',
    renderTarget: 'children'
})
export class ESC2021Page extends mixin() {
    connectedCallback() {
        this.classList.add(style.box);

        activity.getAll();

        super.connectedCallback();
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
            </>
        );
    }
}
