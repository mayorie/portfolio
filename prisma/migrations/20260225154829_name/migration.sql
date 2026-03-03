/*
  Warnings:

  - Added the required column `mise_en_page` to the `Description` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Description" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mise_en_page" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "Description_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Description" ("content", "id", "projectId") SELECT "content", "id", "projectId" FROM "Description";
DROP TABLE "Description";
ALTER TABLE "new_Description" RENAME TO "Description";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
