"use client";
import { useState } from "react";
import { FileNode } from "@/lib/types";
import { ChevronRight, File, Folder, FolderOpen } from "lucide-react";

interface ProjectFileTreeProps {
  structure: FileNode[];
}

function TreeNode({ node, depth = 0 }: { node: FileNode; depth?: number }) {
  const [isOpen, setIsOpen] = useState(depth < 2);
  const isFolder = node.type === "folder";

  return (
    <div>
      <button
        onClick={() => isFolder && setIsOpen(!isOpen)}
        className={`flex w-full items-center gap-1.5 rounded px-2 py-1 text-left text-sm transition-colors hover:bg-dark-border ${
          isFolder ? "cursor-pointer" : "cursor-default"
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {isFolder && (
          <ChevronRight
            className={`h-3.5 w-3.5 text-text-muted transition-transform ${isOpen ? "rotate-90" : ""}`}
          />
        )}
        {isFolder ? (
          isOpen ? (
            <FolderOpen className="h-4 w-4 flex-shrink-0 text-accent-secondary" />
          ) : (
            <Folder className="h-4 w-4 flex-shrink-0 text-accent-secondary" />
          )
        ) : (
          <File className="h-4 w-4 flex-shrink-0 text-text-muted" />
        )}
        <span className="truncate text-text-secondary">{node.name}</span>
      </button>
      {isFolder && isOpen && node.children && (
        <div>
          {node.children.map((child, i) => (
            <TreeNode key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectFileTree({ structure }: ProjectFileTreeProps) {
  return (
    <div className="rounded-lg border border-dark-border bg-dark-card p-4">
      <h3 className="mb-3 text-sm font-semibold tracking-wider text-text-muted uppercase">
        项目结构
      </h3>
      <div className="space-y-0.5">
        {structure.map((node, i) => (
          <TreeNode key={i} node={node} />
        ))}
      </div>
    </div>
  );
}
