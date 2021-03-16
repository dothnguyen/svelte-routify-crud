<script>
	import { onMount } from "svelte";

	import {
		loading,
		error,
		customersService,
	} from "../../stores/customers.store";

	onMount(() => {
		customersService.loadCustomers();
	});
</script>

<h1>
	Customers {#if $loading}<span class="loading loading-lg" />{/if}
</h1>

<style>
	.loading::after {
		margin-left: 1rem;
		margin-top: -0.5rem;
	}
</style>
