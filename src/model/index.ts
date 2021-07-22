import { History } from 'cell-router/source';

import './Base';
import { ActivityModel } from './Activity';
import { ProgramModel } from './Program';
import { PartnershipModel } from './Partnership';

export * from './Partnership';

export const history = new History();
export const activity = new ActivityModel();
export const program = new ProgramModel();
export const partnership = new PartnershipModel();
