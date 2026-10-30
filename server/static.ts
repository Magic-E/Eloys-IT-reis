import express, { type Express, type Request, type Response } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(process.cwd(), "dist/public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}. Make sure to run 'npm run build' first.`,
    );
  }

  app.use(express.static(distPath));

  app.get("/{*path}", (_req: Request, res: Response) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}
