import type { NextRequest } from 'next/server';
import logger from './utils/logger';


// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  logger.info(request.method + ' request ' + request.url);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
};