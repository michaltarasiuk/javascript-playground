function formDataToJSON() {
  const formData = new FormData();
  formData.append('foo', 'bar');
  formData.append('tvShows', 'Motherland');
  formData.append('tvShows', 'Taskmaster');

  const result = Object.fromEntries(
    [...new Set(formData.keys())].map((key) => {
      const all = formData.getAll(key);
      if (all.length > 1) {
        return [key, all];
      }

      return [key, all.at(0)];
    }),
  );

  console.log(JSON.stringify(result));
}

formDataToJSON();
