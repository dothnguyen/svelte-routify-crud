<script>
	import { goto, metatags } from "@roxi/routify";
	import { onDestroy } from "svelte";
	import { authStore } from "../../stores/auth.store";
	metatags.title = "Login";

	const un = authStore.subscribe((state) => {
		if (state.authenticated) {
			$goto("./");
		}
	});

	onDestroy(un);
</script>

<slot />
