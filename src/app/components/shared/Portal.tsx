'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  containerId?: string;
}

export function Portal({ children, containerId = 'portal-root' }: PortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Create portal container if it doesn't exist
    if (!document.getElementById(containerId)) {
      const portalContainer = document.createElement('div');
      portalContainer.id = containerId;
      portalContainer.style.position = 'fixed';
      portalContainer.style.zIndex = '100000000000000000'; // Increased z-index to be higher than modal
      portalContainer.style.top = '0';
      portalContainer.style.left = '0';
      portalContainer.style.width = '100%';
      portalContainer.style.height = '0';
      portalContainer.style.pointerEvents = 'none';
      document.body.appendChild(portalContainer);
    }

    return () => {
      // Optionally clean up the portal container when no portals are using it
      const container = document.getElementById(containerId);
      if (container && container.childNodes.length === 0) {
        document.body.removeChild(container);
      }
    };
  }, [containerId]);

  return mounted
    ? createPortal(
        children,
        document.getElementById(containerId) || document.body
      )
    : null;
}
