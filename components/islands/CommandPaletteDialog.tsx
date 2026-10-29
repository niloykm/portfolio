'use client';

import { useEffect, useRef, useState } from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { m } from 'framer-motion';
import { buildCommands, type CommandItem } from '@/lib/commands';
import { spring } from '@/lib/motion';
import { profile } from '@/data/profile';
import { Kbd } from '@/components/ui/Kbd';

type CommandPaletteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  notes?: { slug: string; title: string }[];
  showNotesSection?: boolean;
};

const GROUPS: CommandItem['group'][] = [
  'Navigate',
  'Work',
  'Notes',
  'Actions',
  'Help',
];

export default function CommandPaletteDialog({
  open,
  onOpenChange,
  notes = [],
  showNotesSection = false,
}: CommandPaletteDialogProps) {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const commands = buildCommands(notes, showNotesSection);
  const [selectedValue, setSelectedValue] = useState<string>(
    commands[0]?.id ?? ''
  );
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      const id = window.setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
      return () => window.clearTimeout(id);
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onOpenChange(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  const runCommand = (item: CommandItem) => {
    onOpenChange(false);

    if (item.action === 'copy-email') {
      navigator.clipboard?.writeText(profile.email).catch(() => {});
      window.dispatchEvent(new CustomEvent('trigger-copy-email'));
      return;
    }

    if (item.action === 'toggle-theme') {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
      return;
    }

    if (item.action === 'open-shortcuts') {
      window.dispatchEvent(new CustomEvent('open-shortcuts-sheet'));
      return;
    }

    if (item.href) {
      if (item.external) {
        window.open(item.href, '_blank', 'noopener,noreferrer');
      } else if (item.href.startsWith('/#')) {
        const hash = item.href.slice(1);
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        } else {
          router.push(item.href);
        }
      } else {
        router.push(item.href);
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[14vh]"
    >
      <div
        className="fixed inset-0 bg-ink/35"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      <m.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={spring.snappy}
        className="relative z-10 w-full max-w-xl overflow-hidden rounded-panel border border-border-strong bg-surface text-ink shadow-palette"
      >
        <Command
          label="Command palette"
          value={selectedValue}
          onValueChange={setSelectedValue}
          className="flex flex-col"
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <Command.Input
              ref={inputRef}
              placeholder="Type a command or search…"
              className="w-full bg-transparent font-mono text-sm text-ink placeholder:text-muted focus:outline-none"
            />
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label="Close command palette"
              className="ml-2 shrink-0"
            >
              <Kbd>Esc</Kbd>
            </button>
          </div>

          <Command.List className="max-h-[340px] overflow-y-auto p-2">
            <Command.Empty className="py-8 text-center text-meta text-muted">
              No matching commands.
            </Command.Empty>

            {GROUPS.map((groupName) => {
              const items = commands.filter((c) => c.group === groupName);
              if (items.length === 0) return null;

              return (
                <Command.Group
                  key={groupName}
                  heading={groupName}
                  className="mb-2 last:mb-0 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted"
                >
                  {items.map((item) => {
                    const isSelected = selectedValue === item.id;
                    return (
                      <Command.Item
                        key={item.id}
                        value={item.id}
                        keywords={item.keywords}
                        onSelect={() => runCommand(item)}
                        className="relative flex cursor-pointer select-none items-center justify-between gap-3 rounded-control px-3 py-2 text-secondary text-ink outline-none"
                      >
                        {isSelected && (
                          <m.span
                            layoutId="palette-active-item"
                            className="absolute inset-0 rounded-control border border-border-strong bg-bg-sunken -z-10"
                            transition={spring.snappy}
                          />
                        )}
                        <span className="truncate">{item.label}</span>
                        {item.kbd && item.kbd.length > 0 && (
                          <span className="flex items-center gap-1 shrink-0">
                            {item.kbd.map((k, idx) => (
                              <Kbd key={idx}>{k}</Kbd>
                            ))}
                          </span>
                        )}
                      </Command.Item>
                    );
                  })}
                </Command.Group>
              );
            })}
          </Command.List>
        </Command>
      </m.div>
    </div>
  );
}
