export function showToast(vm, message, variant) {
  if (!variant) {
    variant = "default";
  }

  const title = variant === "danger" ? "Oops!" : "";
  vm.$bvToast.toast(message, {
    title,
    variant,
    solid: true,
    autoHideDelay: 3000,
  });
}
