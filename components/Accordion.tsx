"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";

export interface AccordionItem {
  question: string;
  answer: string;
}

function Item({ item }: { item: AccordionItem }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const panelId = `${id}-panel`;
  const buttonId = `${id}-button`;

  return (
    <div className="border-b border-ink-600">
      <h3>
        <button
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-lime"
        >
          <span className="text-lg font-medium text-bone sm:text-xl">
            {item.question}
          </span>
          <span
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink-600 text-lime transition-transform duration-300 ${
              open ? "rotate-45 border-lime/50" : ""
            }`}
            aria-hidden="true"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1v12M1 7h12"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-7 text-base leading-relaxed text-ash">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  return (
    <div className="border-t border-ink-600">
      {items.map((item) => (
        <Item key={item.question} item={item} />
      ))}
    </div>
  );
}
