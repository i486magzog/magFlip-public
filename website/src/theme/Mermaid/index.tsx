import { useColorMode } from '@docusaurus/theme-common';
import type MermaidType from '@theme/Mermaid';
import Mermaid from '@theme-original/Mermaid';
import type { ComponentProps } from 'react';

type MermaidProps = ComponentProps<typeof MermaidType>;

/**
 * Wraps the original Mermaid component and remounts it when the color mode changes.
 *
 * Why: on a dark-mode OS the page hydrates in light mode and immediately switches to dark.
 * The original component then re-renders the diagram with the SAME mermaid id while the first
 * render is still running, and the two renders collide, leaving some diagrams empty.
 * Remounting gives each render its own id.
 */
export default function MermaidWrapper(props: MermaidProps) {
  const { colorMode } = useColorMode();
  return <Mermaid key={colorMode} {...props} />;
}
