<script>
	import { url, prefetch } from "@roxi/routify";

	export let minimize = true;
</script>

<div class="sidebar off-canvas-sidebar" class:minimize id="sidebar">
	<ul class="sidemenu">
		<li class="sidemenu-item">
			<a href={$url("./")} title="Home">
				<i class="fa fa-home menu-icon" />
				<span> Home </span>
			</a>
		</li>
		<li class="sidemenu-item is-parent">
			<input type="checkbox" id="sidemenu-parent-1" hidden />
			<label for="sidemenu-parent-1" class="c-hand" title="Groups">
				<i class="icon icon-copy menu-icon" /><span> Customers </span>
				<i class="icon icon-arrow-right parent-arrow" />
			</label>
			<ul class="sidemenu-submenu">
				<li class="sidemenu-item">
					<a
						href={$url("/groups")}
						use:prefetch
						title="Sub menu item 4"
					>
						<i class="icon icon-delete menu-icon" />
						<span> Manage Customers </span>
					</a>
				</li>
			</ul>
		</li>
	</ul>
</div>

<style lang="scss">
	@import "node_modules/spectre.css/src/_variables";

	.sidebar {
		width: 14rem;
		padding: 0.5rem 0.8rem;
		overflow-x: hidden;
		background-color: #f7f8f9 !important;

		ul {
			list-style: none;
			overflow: hidden;
			margin: 0;
			transition: max-height 0.25s;
			z-index: 300;

			li {
				margin-top: 0;
				padding: 0;
				position: relative;
				text-decoration: none;
				line-height: 2rem;

				a,
				label {
					background: 0 0;
					color: #66758c;
					display: block;

					& .menu-icon {
						margin-right: 0.3rem;
						margin-left: 0.2rem;
						font-size: 0.9rem;
					}

					.parent-arrow {
						line-height: 2rem;
						transition: transform 0.2s;
					}
				}

				a {
					border-radius: 0.1rem;
					color: inherit;
					text-decoration: none;
				}

				&.active {
					& label,
					& a {
						background: $secondary-color;
						color: $primary-color;
						font-weight: bold;
					}
				}

				& label:hover,
				& a:hover {
					background: $secondary-color;
					color: $primary-color;
				}

				&.is-parent {
					& label span {
						font-weight: 600;
					}

					.parent-arrow {
						position: absolute;
						right: 0.4rem;
						top: 0.75rem;
						font-size: 0.5rem;
					}

					> ul {
						max-height: 0;
						padding-left: 1rem;
						font-weight: unset;
					}

					& input:checked ~ {
						& label .parent-arrow {
							transform: rotate(90deg);
						}

						& ul {
							max-height: fit-content;
							position: relative;
							background: $secondary-color-light;

							&::before {
								content: "";
								display: block;
								position: absolute;
								z-index: 1;
								left: 0.7rem;
								top: 0;
								bottom: 0.95rem;
								border-left: 1px solid $border-color-dark;
							}

							& li {
								position: relative;

								&::before {
									content: "";
									display: block;
									position: absolute;
									width: 0.5rem;
									left: -5px;
									top: 1rem;
									border-top: 1px solid $border-color-dark;
									z-index: 1;
								}
							}
						}
					}
				}

				&.sidemenu-item label {
					cursor: pointer;
				}
			}
		}

		&.minimize {
			width: 3rem;
			min-width: 0;
			padding: 0;

			ul {
				li {
					a,
					label {
						text-align: center;

						span {
							display: none;
						}
					}

					.parent-arrow {
						display: none;
					}

					&.is-parent {
						& input:checked ~ {
							& ul {
								margin-left: 0;
								padding-left: 0;

								&::before {
									display: none;
								}

								& li {
									&::before {
										display: none;
									}

									& .menu-icon {
										font-size: 90%;
									}
								}
							}
						}
					}
				}
			}
		}
	}

	@media (min-width: 960px) {
		.sidebar {
			transition: width 0.1s !important;
		}
	}

	@media (max-width: 960px) {
		.sidebar {
			top: 3.8rem;
		}
	}
</style>
