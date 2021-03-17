<script>
	import { params } from "@roxi/routify/runtime/helpers";
	import { customers } from "../../../stores/customers.store";

	let title = "Edit Customer";

	const id = parseInt($params.id);
	if (!id) title = "Add Customer";

	let error = false;

	let customer = {
		fname: "",
		lname: "",
		email: "",
		mobile: "",
	};
	if (id > 0) {
		customer = $customers.find((cus) => cus.id === id);
		if (!customer) error = true;
	}
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
				<div class="form-group">
					<label for="fname" class="form-label">First Name</label>
					<input type="text" name="fname" class="form-input" />
				</div>
				<div class="form-group">
					<label for="lname" class="form-label">Last Name</label>
					<input type="text" name="lname" class="form-input" />
				</div>
				<div class="form-group">
					<label for="email" class="form-label">Email</label>
					<input type="email" name="email" class="form-input" />
				</div>
				<div class="form-group">
					<label for="mobile" class="form-label">Mobile</label>
					<input type="text" name="mobile" class="form-input" />
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
</style>
