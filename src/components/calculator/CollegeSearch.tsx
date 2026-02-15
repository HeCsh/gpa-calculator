"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Fuse from "fuse.js";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { College } from "@/lib/gpa/types";

interface CollegeSearchProps {
  value: College | null;
  onChange: (college: College | null) => void;
}

export function CollegeSearch({ value, onChange }: CollegeSearchProps) {
  const [query, setQuery] = useState("");
  const [colleges, setColleges] = useState<College[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Lazy-load colleges data
  useEffect(() => {
    import("@/data/colleges.json").then((mod) => {
      setColleges(mod.default as College[]);
    });
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(colleges, {
        keys: ["name", "state"],
        threshold: 0.3,
      }),
    [colleges]
  );

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query, { limit: 10 }).map((r) => r.item);
  }, [fuse, query]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setIsEditing(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (college: College) => {
    onChange(college);
    setQuery("");
    setIsOpen(false);
    setIsEditing(false);
  };

  const startEditing = () => {
    setIsEditing(true);
    setQuery(value?.name ?? "");
    setIsOpen(true);
    setHighlightedIndex(0);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[highlightedIndex]) {
      e.preventDefault();
      handleSelect(results[highlightedIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setIsEditing(false);
    }
  };

  const systemLabel = (system: string) => {
    switch (system) {
      case "uc":
        return "UC";
      case "csu":
        return "CSU";
      case "ivy":
        return "Ivy";
      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Target College / Program</label>

      {value && !isEditing ? (
        <div
          className="flex items-center gap-2 p-2 border rounded-md bg-muted/50 cursor-text"
          onClick={startEditing}
        >
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <span className="text-sm font-medium flex-1">{value.name}</span>
          <Badge variant="secondary" className="text-xs">
            {value.state}
          </Badge>
          {systemLabel(value.system) && (
            <Badge variant="outline" className="text-xs">
              {systemLabel(value.system)}
            </Badge>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChange(null);
              setIsEditing(false);
            }}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            placeholder="Search colleges (e.g., UC Berkeley, Stanford...)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setHighlightedIndex(0);
            }}
            onFocus={() => query && setIsOpen(true)}
            onKeyDown={handleKeyDown}
            className="pl-10"
          />

          {isOpen && results.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-lg max-h-64 overflow-y-auto"
            >
              {results.map((college, i) => (
                <button
                  key={college.id}
                  className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-accent ${
                    i === highlightedIndex ? "bg-accent" : ""
                  }`}
                  onClick={() => handleSelect(college)}
                  onMouseEnter={() => setHighlightedIndex(i)}
                >
                  <span>{college.name}</span>
                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    <Badge
                      variant="secondary"
                      className="text-[10px] px-1 py-0"
                    >
                      {college.state}
                    </Badge>
                    {systemLabel(college.system) && (
                      <Badge
                        variant="outline"
                        className="text-[10px] px-1 py-0"
                      >
                        {systemLabel(college.system)}
                      </Badge>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {isOpen && query && results.length === 0 && colleges.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-lg p-3 text-sm text-muted-foreground">
              No colleges found matching &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      )}
    </div>
  );
}
