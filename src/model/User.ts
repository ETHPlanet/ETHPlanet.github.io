import { BaseUser, MediaData } from 'mobx-strapi';

export interface User extends BaseUser {
    name?: string;
    organizations: any[];
    avatar?: MediaData;
    summary: string;
    telphone?: string;
}
