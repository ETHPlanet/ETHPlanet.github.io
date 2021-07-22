import { WebCellProps, createCell } from 'web-cell';
import classNames from 'classnames';
import {
    CarouselItemProps,
    CarouselItem,
    CarouselView
} from 'boot-cell/source/Media/Carousel';

import style from './Gallery.module.less';

export interface GalleryProps extends WebCellProps {
    list: Required<Pick<CarouselItemProps, 'image' | 'title'>>[];
}

export function Gallery({ className, list, ...props }: GalleryProps) {
    list = list.slice(0, 4);

    return (
        <section
            className={classNames('row', 'mx-auto', style.box, className)}
            {...props}
        >
            <CarouselView className="col-9 p-0">
                {list.map(({ image }) => (
                    <CarouselItem image={image} />
                ))}
            </CarouselView>
            <ul className="list-unstyled m-0 p-0 col-3 d-flex flex-column">
                {list.map(({ title }, index) => (
                    <li
                        className={style.navItem}
                        onClick={({ target }) => {
                            if (list.length > 1)
                                (
                                    (target as HTMLElement).parentElement
                                        .previousElementSibling as CarouselView
                                ).turnTo(index);
                        }}
                    >
                        {title}
                    </li>
                ))}
            </ul>
        </section>
    );
}
