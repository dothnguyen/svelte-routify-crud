<script>
	import { metatags } from "@roxi/routify";
	import { goto } from "@roxi/routify/runtime/helpers";
	import { onDestroy } from "svelte";
	import Header from "../components/Header.svelte";
	import SideMenu from "../components/SideNav.svelte";
	import { authStore } from "../stores/auth.store";

	metatags.title = "Svelte - Routify - CRUD";

	const un = authStore.subscribe((state) => {
		if (!state.authenticated) {
			$goto("/login");
		}
	});

	let minimize = false;
	let outerWidth;

	$: minimize = outerWidth <= 960 ? false : minimize;

	onDestroy(un);
</script>

<Header
	on:logout={() => authStore.logout()}
	on:sidenave-toggle={() => (minimize = !minimize)}
/>

<div class="app-container off-canvas off-canvas-sidebar-show">
	<SideMenu {minimize} />
	<!-- svelte-ignore a11y-missing-content -->
	<a class="off-canvas-overlay" href="#close" target="_self" />
	<div class="off-canvas-content">
		<div id="main-content">
			<slot />
		</div>
	</div>
</div>

<style lang="scss">
	.app-container {
		margin-top: 3.8rem;
		min-height: calc(100vh - 3.8rem);
	}

	#main-content {
		padding: 0.5rem;
	}

	.off-canvas .off-canvas-content {
		padding: 0;
	}

	@media (max-height: 960px) {
		.off-canvas-content {
			padding: 0;
		}
	}
</style>
