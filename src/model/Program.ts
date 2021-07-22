import {
    BaseData,
    MediaData,
    NestedData,
    CollectionModel,
    Query,
    service
} from 'mobx-strapi';
import { buildURLData } from 'web-utility/source/URL';

import { User } from './User';
import { Organization } from './Organization';
import { Activity } from './Activity';

export interface Program extends BaseData {
    title: string;
    start_time: string;
    end_time: string;
    summary?: string;
    mentors: NestedData<User>[];
    activity: NestedData<Activity>;
    type: 'lecture' | 'workshop' | 'exhibition';
    place?: NestedData<any>;
    evaluations: any[];
    accounts: any[];
    documents: MediaData[];
    verified: boolean;
    category: NestedData<any>;
    project?: NestedData<any>;
    organization?: NestedData<Organization>;
}

export class ProgramModel extends CollectionModel<
    Program,
    'id' | 'title' | 'mentors'
> {
    name = 'program';
    basePath = 'programs';

    filter: Query<Program> = {} as Query<Program>;
    page = 0;

    async getList(filter = this.filter, page = this.page + 1, size = 12) {
        const { body } = await service.get<Program[]>(
            `${this.basePath}?${buildURLData({
                ...filter,
                _start: (page - 1) * size,
                _limit: size
            })}`
        );
        this.filter = filter;
        this.page = page;
        this.allItems.push(...body);
        return body;
    }
}
