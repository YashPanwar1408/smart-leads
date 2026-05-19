import { Router } from 'express';

import { requireRole } from '../../middlewares/rbac.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { UserRole } from '../../types/enums.js';
import { leadController } from './lead.controller.js';
import { createLeadSchema, listLeadSchema, objectIdParamSchema, updateLeadSchema } from './lead.validator.js';

const router = Router();

router.get('/export', requireRole(UserRole.Admin, UserRole.Sales), validate(listLeadSchema, 'query'), leadController.exportCsv);
router.get('/', validate(listLeadSchema, 'query'), leadController.list);
router.post('/', validate(createLeadSchema, 'body'), leadController.create);
router.get('/:id', validate(objectIdParamSchema, 'params'), leadController.getById);
router.patch('/:id', validate(objectIdParamSchema, 'params'), validate(updateLeadSchema, 'body'), leadController.update);
router.delete('/:id', validate(objectIdParamSchema, 'params'), leadController.remove);

export const leadRoutes = router;
