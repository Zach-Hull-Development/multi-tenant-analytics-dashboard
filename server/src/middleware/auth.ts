import type { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../index";
import type { JWTPayload } from "../models/JWTPayload";
import { getUserById } from "../services/user.service";

const invalidAuthTokenError = 'Invalid auth token';

export const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;
	if (!authHeader?.startsWith('Bearer ')) {
		return res.status(401).json({ error: invalidAuthTokenError});
	}
	const splitToken = authHeader.split(' ');

	const token = splitToken[1] ?? '';
	try {
		const payload = jwt.verify(token, JWT_SECRET) as unknown as JWTPayload;

		const userId = payload.user.id;
		const user = getUserById(userId);
		const tenantId = payload.tenant.id;
		if (user?.organizationId !== tenantId) {
			return res.status(401).json({ error: 'Unauthorized'});
		}


		(req as any).user = payload.user;
		(req as any).tenant = payload.tenant;
	} catch (err) {
		return res.status(401).json({ error: invalidAuthTokenError});
	}
}