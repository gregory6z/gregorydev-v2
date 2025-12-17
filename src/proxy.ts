import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

// Next.js 16: Export the function as 'proxy' instead of default export
export const proxy = createMiddleware(routing)

export const config = {
	matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}

// For compatibility, also export as default
export default proxy
