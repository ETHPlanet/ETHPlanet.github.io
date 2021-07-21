import { createCell, Fragment } from 'web-cell';
import { CellRouter } from 'cell-router/source';

import { history } from '../model';
import WebCell_0 from '../image/WebCell-0.png';

import { ESC2021Page } from './ESC/2021';
import { CellClock } from './Clock';

export function PageFrame() {
    return (
        <>
            <CellRouter
                style={{ minHeight: '60vh' }}
                history={history}
                routes={[
                    {
                        paths: ['clock'],
                        component: CellClock
                    },
                    {
                        paths: ['hello', ''],
                        component: ESC2021Page
                    }
                ]}
            />
            <footer className="text-center bg-light py-5">
                <img
                    className="mx-1"
                    style={{ width: '1.5rem' }}
                    alt="WebCell scaffold"
                    src={WebCell_0}
                />
                Proudly developed with
                <a
                    className="mx-1"
                    target="_blank"
                    href="https://web-cell.dev/"
                >
                    WebCell v2
                </a>
                &amp;
                <a
                    className="mx-1"
                    target="_blank"
                    href="https://bootstrap.web-cell.dev/"
                >
                    BootCell v1
                </a>
            </footer>
        </>
    );
}
