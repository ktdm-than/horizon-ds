// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
// The one list the generator writes: All components, then one page per component.
import components from './src/generated/sidebar-components.json' with { type: 'json' };

// The sidebar is written out in full, with no `autogenerate`, so a missing page fails the build
// instead of vanishing from the navigation.
export default defineConfig({
	site: 'https://horizon-ds-docs.vercel.app',
	integrations: [
		starlight({
			title: 'Horizon DS',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/ktdm-than/horizon-ds' }],
			customCss: ['./src/styles/theme.css'],
			// Fonts load from the Google Fonts CDN, as CLAUDE.md (Typography) requires.
			head: [
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true } },
				{
					tag: 'link',
					attrs: {
						rel: 'stylesheet',
						href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
					},
				},
			],
			sidebar: [
				{
					label: 'Get Started',
					items: [
						{ label: 'Changelog', slug: 'get-started/changelog' },
						{ label: 'Roadmap', slug: 'get-started/roadmap' },
						{ label: 'News', slug: 'get-started/news' },
						{ label: 'Versioning', slug: 'get-started/versioning' },
						{ label: 'Upgrading', slug: 'get-started/upgrading' },
					],
				},
				{ label: 'Designing', items: [{ label: 'Introduction', slug: 'designing/introduction' }] },
				{
					label: 'Developing',
					items: [
						{ label: 'Introduction', slug: 'developing/introduction' },
						{ label: 'React', slug: 'developing/react' },
						{ label: 'React Router', slug: 'developing/react-router' },
					],
				},
				{ label: 'Skills', items: [{ label: 'Knowledge skill', slug: 'skills/knowledge-skill' }] },
				{
					label: 'Core',
					items: [
						{ label: 'Components', items: components },
						{ label: 'Tokens', slug: 'core/tokens' },
					],
				},
				{ label: 'Styling', items: [{ label: 'Theming', slug: 'styling/theming' }] },
				{
					label: 'Help',
					items: [
						{ label: 'FAQ', slug: 'help/faq' },
						{ label: 'Report a bug', slug: 'help/bug-report' },
						{ label: 'Request a feature', slug: 'help/feature-request' },
						{ label: 'Contributing', slug: 'help/contributing' },
						{ label: 'Embedding', slug: 'help/embedding' },
					],
				},
			],
		}),
	],
});
