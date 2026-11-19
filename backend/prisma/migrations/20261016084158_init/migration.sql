-- CreateTable
CREATE TABLE "Plataforma" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "fabricante" TEXT NOT NULL,
    "lanzamiento" INTEGER
);

-- CreateTable
CREATE TABLE "Videojuego" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "terminado" BOOLEAN NOT NULL DEFAULT false,
    "creadoEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "plataformaId" INTEGER NOT NULL,
    CONSTRAINT "Videojuego_plataformaId_fkey" FOREIGN KEY ("plataformaId") REFERENCES "Plataforma" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Plataforma_nombre_key" ON "Plataforma"("nombre");
