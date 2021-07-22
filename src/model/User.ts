import { BaseUser, MediaData } from 'mobx-strapi';

import { Organization } from './Organization';

export interface User extends BaseUser {
    name?: string;
    organizations: Organization[];
    avatar?: MediaData;
    summary: string;
    telphone?: string;
}
