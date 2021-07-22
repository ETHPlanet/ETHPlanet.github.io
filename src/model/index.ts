import { History } from 'cell-router/source';

import './Base';
import { ActivityModel } from './Activity';
import { ProgramModel } from './Program';

export const history = new History();
export const activity = new ActivityModel();
export const program = new ProgramModel();
