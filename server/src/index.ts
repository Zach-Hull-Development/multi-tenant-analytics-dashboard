import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import type { JWTPayload } from './models/JWTPayload';
import { authenticationMiddleware } from './middleware/auth';
import { getUserById } from './services/user.service';
import { getOrganizationById } from './services/organization.service';
import { getOrganizationAnalyticEvents, getOrganizationAnalyticsSummary } from './services/analyticEvents.service';

export const JWT_SECRET = 'secret-value';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/auth/login', (req, res) => {
	const { userId, tenantId } = req.body;

	const user = getUserById(userId);
	const tenant = getOrganizationById(tenantId);
	if (!user || !tenant) {
		return res.status(400).json({ error: 'Invalid user or tenant id'})
	}

	if (user.organizationId !== tenant.id) {
		return res.status(401).json({ error: 'Unauthorized'});
	}

	const payload: JWTPayload = {
		user,
		tenant,
	};
	const token = jwt.sign(payload, JWT_SECRET);
	return res.json({ 
		token,
		user,
		tenant,
	});
});

app.get('/analytics/summary', authenticationMiddleware, (req, res) => {
	const organizationId = (req as any).tenant.id;
	const eventSummary = getOrganizationAnalyticsSummary(organizationId);
	
	if (!eventSummary) {
		return res.status(404).json({ error: 'organization not found'});
	}
	return res.json(eventSummary);
});

app.get('/analytics/events', authenticationMiddleware, (req, res) => {
	const organizationId = (req as any).tenant.id;
	const orgEvents = getOrganizationAnalyticEvents(organizationId);
	if (!orgEvents) {
		return res.status(404).json({ error: 'organization not found'});
	}
	return res.json(orgEvents);
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Server running on http://127.0.0.1:${PORT}`);
});