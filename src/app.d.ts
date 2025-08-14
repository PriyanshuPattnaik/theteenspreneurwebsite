// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	namespace svelteHTML {
		interface HTMLAttributes<T> {
			'aria-expanded'?: boolean | string;
			'aria-label'?: string;
			'data-show'?: boolean | string;
			'data-stats'?: boolean | string;
			'data-lucide'?: string;
		}
	}

	interface Window {
		lucide: {
			createIcons: () => void;
		};
	}
}

export {};
