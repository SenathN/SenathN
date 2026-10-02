// Marks that JS is running before first paint, so reveal animations can hide
// content only when they will also be able to show it again.
export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />;
}
