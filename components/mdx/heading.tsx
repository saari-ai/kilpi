import { Link } from 'lucide-react';
import { cn } from 'fumadocs-ui/utils/cn';
import React, { type ReactNode, type ReactElement } from 'react';

/**
 * Custom heading component that extends Fumadocs' Heading to support
 * external link icons inline with heading text.
 *
 * Problem: Fumadocs wraps all heading children inside an <a class="peer"> tag.
 * When MDX headings contain an <a data-external> tag, this creates nested
 * anchors (invalid HTML). Browsers auto-close the outer anchor during parsing,
 * causing layout breakage and React hydration mismatches.
 *
 * Solution: Extract any <a data-external> elements from children and render
 * them as siblings of the peer anchor, not inside it. This keeps the DOM valid
 * and places the external link icon inline next to the Fumadocs copy-link icon.
 */

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

function isExternalLink(node: ReactNode): node is ReactElement {
  return (
    React.isValidElement(node) &&
    typeof node.props === 'object' &&
    node.props !== null &&
    'data-external' in (node.props as Record<string, unknown>)
  );
}

function extractExternalLinks(children: ReactNode): {
  remaining: ReactNode[];
  externalLinks: ReactElement[];
} {
  const remaining: ReactNode[] = [];
  const externalLinks: ReactElement[] = [];

  React.Children.forEach(children, (child) => {
    if (isExternalLink(child)) {
      externalLinks.push(child);
    } else {
      remaining.push(child);
    }
  });

  return { remaining, externalLinks };
}

export function Heading({ as, className, children, ...props }: HeadingProps) {
  const As = as ?? 'h1';

  if (!props.id) {
    return (
      <As className={className} {...props}>
        {children}
      </As>
    );
  }

  const { remaining, externalLinks } = extractExternalLinks(children);

  return (
    <As
      className={cn('flex scroll-m-28 flex-row items-center gap-2', className)}
      {...props}
    >
      <a data-card="" href={`#${props.id}`} className="peer">
        {remaining}
      </a>
      {externalLinks}
      <Link
        aria-hidden
        className="size-3.5 shrink-0 text-fd-muted-foreground opacity-0 transition-opacity peer-hover:opacity-100"
      />
    </As>
  );
}
