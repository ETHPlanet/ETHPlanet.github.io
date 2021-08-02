import { BaseData, CollectionModel, NestedData } from 'mobx-strapi';

import type { Organization } from './Organization';
import type { Activity } from './Activity';

export enum PartnershipTypes {
    sponsor = 'sponsor',
    place = 'place',
    media = 'media',
    community = 'community',
    device = 'device',
    travel = 'travel',
    vendor = 'vendor'
}

export interface Partnership extends BaseData {
    title: string;
    activity: NestedData<Activity>;
    level: number;
    organization: NestedData<Organization>;
    type: PartnershipTypes;
    accounts: any[];
    verified: boolean;
}

export class PartnershipModel extends CollectionModel<Partnership> {
    name = 'partnership';
    basePath = 'partnerships';
}
