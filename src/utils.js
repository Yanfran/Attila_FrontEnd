export function changeLinkColor(isHovered) {
  const link = document.querySelector(".btn-link");
  if (isHovered) {
    link.classList.add("hover");
  } else {
    link.classList.remove("hover");
  }


  // const linkFill = document.querySelector(".btn-link-fill");
  // if (isHovered) {
  //   linkFill.classList.add("hover");
  // } else {
  //   linkFill.classList.remove("hover");
  // }
}
