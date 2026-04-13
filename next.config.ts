import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
	async rewrites() {
		return [
			{ source: "/", destination: "/en" },
			{ source: "/about", destination: "/en/about" },
			{ source: "/projects", destination: "/en/projects" },
			{ source: "/contact", destination: "/en/contact" },
		];
	},
};

export default withNextIntl(nextConfig);
