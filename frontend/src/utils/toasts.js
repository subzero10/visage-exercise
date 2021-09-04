export function showErrorToast(vm, err) {
  let message = err.message;
  if (err.response && typeof err.response.data === "string") {
    message = err.response.data;
  }

  showToast(vm, "Oops!", message, "danger");
}

export function showToast(vm, title, message, variant) {
  if (!variant) {
    variant = "default";
  }

  if (!title) {
    title = variant === "danger" ? "Oops!" : "";
  }

  vm.$bvToast.toast(message, {
    title,
    variant,
    solid: true,
    autoHideDelay: 3000,
  });
}
