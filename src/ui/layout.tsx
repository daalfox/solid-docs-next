import { ParentComponent, Show } from "solid-js";

import { MainNavigation } from "~/ui/layout/main-navigation";
import { MainFooter } from "./layout/main-footer";
import { MainHeader } from "./layout/main-header";
import { Hero } from "./layout/hero";
import { useMatch } from "@solidjs/router";
import { DocsLayout } from "./docs-layout";
import { PageStateProvider } from "~/data/page-state";

export const Layout: ParentComponent = (props) => {
	const isRoot = useMatch(() => "/");

	return (
		<PageStateProvider>
			<div class="flex flex-col">
				<MainHeader />

				<Show when={isRoot()} keyed>
					<Hero />
				</Show>

				<div class="relative mx-auto flex max-w-8xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
					<div class="hidden lg:relative lg:block lg:flex-none">
						<div class="absolute inset-y-0 right-0 w-[50vw] dark:hidden" />
						<div class="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
						<div class="absolute bottom-0 right-0 top-28 hidden w-px bg-slate-800 dark:block" />
						<div class="sticky top-[4.75rem] -ml-0.5 h-[calc(100vh-4.75rem)] w-64 overflow-y-auto overflow-x-hidden py-16 pl-0.5 pr-8 xl:w-72 xl:pr-16 custom-scrollbar mt-16">
							<MainNavigation />
						</div>
					</div>
					<main class="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none prose prose-slate dark:prose-invert dark:text-slate-400">
						<Show
							when={!isRoot()}
							keyed
							fallback={
								<article class="px-10 expressive-code-overrides">
									{props.children}
								</article>
							}
						>
							<DocsLayout>{props.children}</DocsLayout>
						</Show>
					</main>
				</div>
				<MainFooter />
			</div>
		</PageStateProvider>
	);
};
