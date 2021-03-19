<script>
	import { goto, url } from "@roxi/routify/runtime/helpers";

	import { onMount } from "svelte";

	import {
		loading,
		error,
		customers,
		initialized,
	} from "../../stores/customers.store";

	let customerList;
	$: customerList = $customers;

	onMount(() => {
		console.log("customer list mount");
		if (!$initialized) customers.loadCustomers();
	});
</script>

<h1>
	Customers {#if $loading}<span class="loading loading-lg" />{/if}
</h1>
<div class="columns">
	<div class="column col-4 col-xs-12">
		<div class="input-group">
			<span class="input-group-addon"><i class="fa fa-search" /></span>
			<input type="text" class="form-input" placeholder="..." />
			<button class="btn btn-primary input-group-btn">Search</button>
		</div>
	</div>
	<div class="column col-1 col-xs-12">
		<a href={$url("./:id", { id: 0 })} class="btn btn-success"
			>Add Customer</a
		>
	</div>
</div>
<table class="table table-striped table-hover">
	<thead>
		<tr>
			<th>First Name</th>
			<th>Last Name</th>
			<th>Email</th>
			<th>Mobile</th>
			<th>Actions</th>
		</tr>
	</thead>
	<tbody>
		{#if !customerList.length}
			<tr><td colspan="4">No customers.</td></tr>
		{:else}
			{#each customerList as cus}
				<tr>
					<td>{cus.fname}</td>
					<td>{cus.lname}</td>
					<td>{cus.email}</td>
					<td>{cus.mobile}</td>
					<td>
						<a
							href="#"
							on:click={() => $goto("./:id", { id: cus.id })}
							><i class="fa fa-pencil" /></a
						>
						<a
							href="#"
							class="text-error"
							on:click={() => customers.deleteCustomer(cus.id)}
							><i class="fa fa-trash " /></a
						>
					</td>
				</tr>
			{/each}
		{/if}
	</tbody>
</table>

<style>
	.loading::after {
		margin-left: 1rem;
		margin-top: -0.5rem;
	}
</style>
