// b29/app/components/TemplateRenderer.js
import dynamic from "next/dynamic";

const TEMPLATES = {
  minimalist: dynamic(() => import("./templates/Minimalist")),
  corporate: dynamic(() => import("./templates/Corporate")),
  creative: dynamic(() => import("./templates/Creative")), // Registering the new one
};

export default function TemplateRenderer({ templateId, data }) {
  const SelectedTemplate = TEMPLATES[templateId] || TEMPLATES.minimalist;
  return <SelectedTemplate data={data} />;
}
