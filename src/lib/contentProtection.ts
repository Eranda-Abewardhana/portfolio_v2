/** Discourage casual inspection and image saving; displayed assets remain public. */
export function installContentProtection(document: Document) {
  const view = document.defaultView;
  if (!view) return () => {};
  const ElementConstructor = view.Element;

  function isEditable(target: EventTarget | null) {
    if (!(target instanceof ElementConstructor)) return false;
    const field = target.closest("input, textarea, select, [contenteditable]");
    return field !== null && field.getAttribute("contenteditable") !== "false";
  }

  function onContextMenu(event: MouseEvent) {
    if (!isEditable(event.target)) event.preventDefault();
  }

  function onDragStart(event: DragEvent) {
    if (
      event.target instanceof ElementConstructor &&
      event.target.closest("img, picture")
    ) {
      event.preventDefault();
    }
  }

  function onKeyDown(event: KeyboardEvent) {
    const key = event.key.toLowerCase();
    const modifier = event.ctrlKey || event.metaKey;
    const inspection =
      key === "f12" ||
      (modifier && event.shiftKey && ["i", "j", "c", "k"].includes(key)) ||
      (event.metaKey && event.altKey && ["i", "j", "c", "u"].includes(key));
    const pageSourceOrSave =
      modifier && ["u", "s"].includes(key) && !isEditable(event.target);

    if (inspection || pageSourceOrSave) event.preventDefault();
  }

  document.addEventListener("contextmenu", onContextMenu);
  document.addEventListener("dragstart", onDragStart);
  document.addEventListener("keydown", onKeyDown, true);

  return () => {
    document.removeEventListener("contextmenu", onContextMenu);
    document.removeEventListener("dragstart", onDragStart);
    document.removeEventListener("keydown", onKeyDown, true);
  };
}
