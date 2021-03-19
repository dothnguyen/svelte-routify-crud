<script>
	import {
		Control,
		controlClasses,
		ControlGroup,
		email,
		required,
	} from "@rbzl/svelte-form-control";

	import { goto, params } from "@roxi/routify/runtime/helpers";
	import { customers } from "../../../stores/customers.store";

	let title = "Edit Customer";

	let id = parseInt($params.id);
	if (!id) title = "Add Customer";

	let error = false;

	let customer = {
		id: id,
		fname: "",
		lname: "",
		email: "",
		mobile: "",
	};
	if (id > 0) {
		customer = $customers.find((cus) => cus.id === id);
		if (!customer) error = true;
	}

	const custForm = new ControlGroup({
		id: new Control(0, []),
		fname: new Control("", [required]),
		lname: new Control("", [required]),
		email: new Control("", [required, email]),
		mobile: new Control("", []),
	});

	const value = custForm.value;
	const state = custForm.state;

	value.set(customer);

	let loading = false;

	const saveCustomer = (customer) => {
		loading = true;
		let ret = true;
		if (!customer.id) {
			ret = customers.addCustomer(customer);
			loading = false;
		} else {
			ret = customers.updateCustomer(customer);
		}

		if (ret) {
			console.log("customer added");
			$goto("/customers");
		}
	};
</script>

<div>
	<button class="btn" on:click={() => history.back()}>Back</button>
</div>
<h2>{title}</h2>

{#if error}
	<div class="toast toast-primary">
		Can't find the customer. Please check.
	</div>
{:else}
	<div class="columns">
		<div class="column col-8 col-lg-8 col-md-10 col-sm-12">
			<form>
				<div
					class="form-group"
					class:has-error={$state.fname.$touched &&
						!$state.fname.$valid}
				>
					<label for="fname" class="form-label">First Name</label>
					<input
						type="text"
						name="fname"
						class="form-input"
						bind:value={$value.fname}
						use:controlClasses={custForm.child("fname")}
					/>
					{#if $state.fname.$touched && !$state.fname.$valid}
						<span class="form-input-hint"
							>Please input first name</span
						>
					{/if}
				</div>
				<div
					class="form-group"
					class:has-error={$state.lname.$touched &&
						!$state.lname.$valid}
				>
					<label for="lname" class="form-label">Last Name</label>
					<input
						type="text"
						name="lname"
						class="form-input"
						bind:value={$value.lname}
						use:controlClasses={custForm.child("lname")}
					/>
					{#if $state.lname.$touched && !$state.lname.$valid}
						<span class="form-input-hint"
							>Please input last name</span
						>
					{/if}
				</div>
				<div
					class="form-group"
					class:has-error={$state.email.$touched &&
						!$state.email.$valid}
				>
					<label for="email" class="form-label">Email</label>
					<input
						type="email"
						name="email"
						class="form-input"
						bind:value={$value.email}
						use:controlClasses={custForm.child("email")}
					/>
					{#if $state.email.$touched && $state.email.$error && $state.email.$error.required}
						<span class="form-input-hint">Please input email</span>
					{/if}
					{#if $state.email.$touched && $state.email.$error && $state.email.$error.email}
						<span class="form-input-hint"
							>Please input valid email</span
						>
					{/if}
				</div>
				<div
					class="form-group"
					class:has-error={$state.mobile.$touched &&
						!$state.mobile.$valid}
				>
					<label for="mobile" class="form-label">Mobile</label>
					<input
						type="text"
						name="mobile"
						class="form-input"
						bind:value={$value.mobile}
						use:controlClasses={custForm.child("mobile")}
					/>
				</div>
				<div class="panel-footer">
					<button
						disabled={!$state.$valid}
						class="btn btn-primary btn-block"
						class:loading
						on:click={() => saveCustomer($value)}>Save</button
					>
				</div>
				<input type="hidden" bind:value={$value.id} name="id" />
			</form>
		</div>
	</div>
{/if}

<style>
</style>
