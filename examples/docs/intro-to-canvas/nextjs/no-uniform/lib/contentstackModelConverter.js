export default function contentStackModelConverter({ component, parameter }) {
  const entry = parameter;
  var retVal;

  retVal = { title: entry.value.title, description: entry.value.description };

  return retVal;
}
