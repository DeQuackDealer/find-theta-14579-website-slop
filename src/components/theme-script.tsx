const STORAGE_KEY = "ft-palette";

export function ThemeScript({ defaultPalette }: { defaultPalette: string }) {
  const script = `(function(){try{var p=localStorage.getItem('${STORAGE_KEY}')||'${defaultPalette}';document.documentElement.setAttribute('data-palette',p);}catch(e){document.documentElement.setAttribute('data-palette','${defaultPalette}');}})();`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

export { STORAGE_KEY as THEME_STORAGE_KEY };
