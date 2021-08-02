import { WebCellProps, createCell } from 'web-cell';
import classNames from 'classnames';
import {
    CarouselItemProps,
    CarouselItem,
    CarouselView
} from 'boot-cell/source/Media/Carousel';

import style from './Gallery.module.less';

export interface GalleryItem
    extends Required<Pick<CarouselItemProps, 'image' | 'title'>> {
    path: string;
}

export interface GalleryProps extends WebCellProps {
    list: GalleryItem[];
}

export function Gallery({ className, list, ...props }: GalleryProps) {
    list = list.slice(0, 4);

    return (
        <div
            className={classNames('row', 'mx-auto', style.box, className)}
            {...props}
        >
            <CarouselView className="col-9 p-0">
                {list.map(({ image, path }) => (
                    <CarouselItem image={image}>
                        <a
                            className={style.image}
                            style={{ backgroundImage: `url(${image})` }}
                            target="_blank"
                            href={path}
                        />
                    </CarouselItem>
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
        </div>
    );
}
