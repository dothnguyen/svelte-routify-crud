<script>
	import { Router } from "@roxi/routify";
	import { onMount } from "svelte";
	import { routes } from "../.routify/routes";
	import { authStore } from "./stores/auth.store";

	onMount(() => {
		authStore.init();
	});
</script>

<Router {routes} />

<style global lang="scss">
	@import "./../node_modules/spectre.css/src/spectre.scss";
	@import "./../node_modules/spectre.css/src/spectre-exp.scss";
	@import "./../node_modules/spectre.css/src/spectre-icons.scss";
	@import "./../node_modules/font-awesome/scss/font-awesome.scss";

	@import "../assets/global.css";
</style>
