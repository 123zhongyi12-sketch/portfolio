import { FileNode } from "./types";
import fs from "fs";
import path from "path";

interface ProjectContent {
  markdown: string;
  structure?: FileNode[];
  images: string[];
}

export function getProjectContent(slug: string): ProjectContent {
  const contentDir = path.join(process.cwd(), "content", "projects", slug);

  let markdown = "";
  const mdPath = path.join(contentDir, "index.md");
  if (fs.existsSync(mdPath)) {
    markdown = fs.readFileSync(mdPath, "utf-8");
  }

  let structure: FileNode[] | undefined;
  const structurePath = path.join(contentDir, "structure.json");
  if (fs.existsSync(structurePath)) {
    structure = JSON.parse(fs.readFileSync(structurePath, "utf-8")) as FileNode[];
  }

  let images: string[] = [];
  const imagesDir = path.join(contentDir, "images");
  if (fs.existsSync(imagesDir)) {
    images = fs.readdirSync(imagesDir)
      .filter((f) => /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(f))
      .map((f) => `/content/projects/${slug}/images/${f}`);
  }

  return { markdown, structure, images };
}
