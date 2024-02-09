export async function formDataToUrlSearchParams() {
  const formData = new FormData();
  formData.append('foo', 'bar');
  formData.append('tvShow', 'Motherland');

  const searchParams = new URLSearchParams(formData);

  console.log(Object.fromEntries(searchParams));
}

formDataToUrlSearchParams();
