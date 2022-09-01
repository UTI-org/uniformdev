import Body from "../components/Body";
import Hero from "../components/Hero";

function UnknownComponent({ component }) {
  return <div>[unknown component: {component.type}]</div>;
}

export default function resolveRenderer({ type }) {
  console.log("in resolveRenderer..........", type);
  if (type == "defaultBody") {
    return Body;
  }
  if (type == "hero") {
    return Hero;
  }
  return UnknownComponent;
}
