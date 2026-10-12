"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Property, sampleProperties } from "@/lib/data";
import { read, write } from "@/lib/demo-db";
export type Enquiry = {
  id: string;
  created: string;
  kind: string;
  property?: string;
  fields: Record<string, string>;
};
type Store = {
  properties: Property[];
  favourites: string[];
  enquiries: Enquiry[];
  ready: boolean;
  notice: string;
  saveProperties: (p: Property[]) => Promise<void>;
  saveEnquiry: (e: Omit<Enquiry, "id" | "created">) => Promise<void>;
  toggleFavourite: (id: string) => void;
  clearEnquiries: () => Promise<void>;
};
const Context = createContext<Store | null>(null);
export function DemoProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState(sampleProperties),
    [favourites, setFavourites] = useState<string[]>([]),
    [enquiries, setEnquiries] = useState<Enquiry[]>([]),
    [ready, setReady] = useState(false),
    [notice, setNotice] = useState("");
  useEffect(() => {
    let active = true;
    Promise.all([read<Property[]>("properties"), read<Enquiry[]>("enquiries")])
      .then(([p, e]) => {
        if (active) {
          if (p) setProperties(p);
          if (e) setEnquiries(e);
        }
      })
      .catch((e) => active && setNotice(e.message))
      .finally(() => active && setReady(true));
    try {
      setFavourites(JSON.parse(localStorage.getItem("jp-favourites") || "[]"));
    } catch {
      setNotice("Saved homes could not be restored in this browser.");
    }
    return () => {
      active = false;
    };
  }, []);
  async function saveProperties(p: Property[]) {
    await write("properties", p);
    setProperties(p);
  }
  async function saveEnquiry(e: Omit<Enquiry, "id" | "created">) {
    const current = (await read<Enquiry[]>("enquiries")) || [];
    const next = [
      { ...e, id: crypto.randomUUID(), created: new Date().toISOString() },
      ...current,
    ];
    await write("enquiries", next);
    setEnquiries(next);
  }
  function toggleFavourite(id: string) {
    setFavourites((old) => {
      const next = old.includes(id)
        ? old.filter((x) => x !== id)
        : [...old, id];
      try {
        localStorage.setItem("jp-favourites", JSON.stringify(next));
        setNotice("");
      } catch {
        setNotice("Saved for this visit only: browser storage is disabled.");
      }
      return next;
    });
  }
  async function clearEnquiries() {
    await write("enquiries", []);
    setEnquiries([]);
  }
  return (
    <Context.Provider
      value={{
        properties,
        favourites,
        enquiries,
        ready,
        notice,
        saveProperties,
        saveEnquiry,
        toggleFavourite,
        clearEnquiries,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useDemo() {
  const s = useContext(Context);
  if (!s) throw new Error("DemoProvider is missing");
  return s;
}
