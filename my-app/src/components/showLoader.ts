export function showLoader(show: boolean) {
  const loader = document.getElementById("loader");
  if (!show){
    loader?.classList.add("hidden");
  } else {
    loader?.classList.remove("hidden");
  }
}