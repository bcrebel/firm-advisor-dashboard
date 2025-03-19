import { ComponentProps, RefObject, useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function ModalDialog({
  open = false,
  ...props
}: Readonly<{
  open?: boolean;
}> &
  ComponentProps<typeof ModalDialogImpl>) {
  if (!open) {
    return null;
  }

  return <ModalDialogImpl {...props} />;
}

/**
 * Invokes a function when a key is pressed.
 */
function useOnKeyDown(key: string, fn: (event: KeyboardEvent) => void) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === key) {
        fn(event);
      }
    }

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [fn]);
}

/**
 * Invoke a function when clicking outside an element
 */
function useOnClickOutside(elRef: RefObject<HTMLDivElement | null>, fn: () => void) {
  // Close on outside clicks
  useEffect(() => {
    function onClickOutside(event: MouseEvent | TouchEvent) {
      // No-op if clicked element is a descendant of the element's contents
      if (
        event.target instanceof Node &&
        elRef.current != null &&
        !elRef.current?.contains(event.target)
      ) {
        fn();
      }
    }

    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('touchstart', onClickOutside);

    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('touchstart', onClickOutside);
    };
  }, [fn]);
}

function getTabbableElements(elRef: RefObject<HTMLDivElement | null>) {
  if (elRef.current == null) {
    return [];
  }

  return elRef.current.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
}

/**
 * Focus the first tabbable element on mount.
 */
function useFocusOnFirstTabbableElement(elRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const tabbableElements = getTabbableElements(elRef);
    const firstElement = tabbableElements[0];
    if (firstElement instanceof HTMLElement) {
      firstElement.focus();
    }
  }, []);
}

/**
 * Trap focus inside an element
 */
function useFocusTrap(elRef: RefObject<HTMLDivElement | null>) {
  function trapFocus(event: KeyboardEvent) {
    if (elRef.current == null) {
      return;
    }

    const tabbableElements = getTabbableElements(elRef);
    const firstElement = tabbableElements[0];
    const lastElement = tabbableElements[tabbableElements.length - 1];

    if (event.shiftKey) {
      // Shift + Tab event
      if (document.activeElement === firstElement && lastElement instanceof HTMLElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab event
      if (document.activeElement === lastElement && firstElement instanceof HTMLElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  useOnKeyDown('Tab', trapFocus);
}

/**
 * Retain a reference to trigger element and focus that element on close
 */
function useReturnFocusToTrigger() {
  const triggerElRef = useRef<Element | null>(null);

  useEffect(() => {
    // Save a reference to the focused element when mounted
    triggerElRef.current = document.activeElement;

    return () => {
      if (triggerElRef.current instanceof HTMLElement) {
        // Focuses on element when unmounted
        triggerElRef.current.focus();
      }
    };
  }, []);
}

function ModalDialogImpl({
  children,
  onClose,
}: Readonly<{
  children: React.ReactNode;
  onClose: () => void;
}>) {
  const contentId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close hooks
  useOnKeyDown('Escape', onClose);
  useOnClickOutside(dialogRef, onClose);

  // Focus hooks
  useReturnFocusToTrigger(); // Call before useFocusOnFirstTabbableElement to maintain focus
  useFocusOnFirstTabbableElement(dialogRef);
  useFocusTrap(dialogRef);

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div aria-describedby={contentId} className="modal" role="dialog" ref={dialogRef}>
        <div className="flex flex-col bg-white rounded-lg p-8">
          <button className="self-end" onClick={onClose}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: '28px', height: '28px' }}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.2665 12.2056L18.2989 7.17319L17.2382 6.11253L12.2058 11.1449L7.17343 6.11256L6.11277 7.17322L11.1451 12.2056L6.11277 17.238L7.17343 18.2986L12.2058 13.2662L17.2382 18.2986L18.2989 17.238L13.2665 12.2056Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <div id={contentId}>{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
}
