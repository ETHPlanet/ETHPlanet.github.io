import { BaseData, MediaData, CollectionModel } from 'mobx-strapi';

export interface Activity extends BaseData {
    name: string;
    slogan: string;
    banner: MediaData;
    description: string;
    partner_ships: any[];
    start_time: string;
    end_time: string;
    location: string;
}

export class ActivityModel extends CollectionModel<Activity> {
    name = 'activity';
    basePath = 'activities';
}
