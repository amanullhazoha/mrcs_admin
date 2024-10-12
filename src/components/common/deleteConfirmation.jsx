import Swal from "sweetalert2";

export const deleteConfirmation = () => {
  return Swal.fire({
    icon: "warning",
    showCancelButton: true,
    title: "Are you sure?",
    cancelButtonColor: "#d33",
    confirmButtonColor: "#9568FF",
    confirmButtonText: "Yes, delete it!",
    text: "You won't be able to revert this!",
  });
};
