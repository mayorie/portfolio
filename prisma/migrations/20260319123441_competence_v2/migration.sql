/*
  Warnings:

  - You are about to drop the `Competence` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Competence";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "competences" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new__ProjectCompetences" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProjectCompetences_A_fkey" FOREIGN KEY ("A") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProjectCompetences_B_fkey" FOREIGN KEY ("B") REFERENCES "competences" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__ProjectCompetences" ("A", "B") SELECT "A", "B" FROM "_ProjectCompetences";
DROP TABLE "_ProjectCompetences";
ALTER TABLE "new__ProjectCompetences" RENAME TO "_ProjectCompetences";
CREATE UNIQUE INDEX "_ProjectCompetences_AB_unique" ON "_ProjectCompetences"("A", "B");
CREATE INDEX "_ProjectCompetences_B_index" ON "_ProjectCompetences"("B");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
