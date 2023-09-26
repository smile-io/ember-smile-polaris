import { modifier } from 'ember-modifier';

export default modifier(function setupDropZoneListeners(
  element,
  [dropOnPage],
  { onSetNode, onDrop, onDragOver, onDragEnter, onDragLeave, onResize },
) {
  const dropNode = dropOnPage ? document : element;
  onSetNode(dropNode);

  dropNode.addEventListener('drop', onDrop);
  dropNode.addEventListener('dragover', onDragOver);
  dropNode.addEventListener('dragenter', onDragEnter);
  dropNode.addEventListener('dragleave', onDragLeave);

  window.addEventListener('resize', onResize);

  return () => {
    dropNode.removeEventListener('drop', onDrop);
    dropNode.removeEventListener('dragover', onDragOver);
    dropNode.removeEventListener('dragenter', onDragEnter);
    dropNode.removeEventListener('dragleave', onDragLeave);

    window.removeEventListener('resize', onResize);
  };
});
