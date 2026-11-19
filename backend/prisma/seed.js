import prisma from '../src/lib/prisma.js';

async function main() {
    const ps5 = await prisma.plataforma.upsert({
    where: { nombre: 'PlayStation 5' },
    update: {},
    create: {
        nombre: 'PlayStation 5',
        fabricante: 'Sony',
        lanzamiento: 2020
    }
    });

    const nintendo = await prisma.plataforma.upsert({
    where: { nombre: 'Nintendo Switch' },
    update: {},
    create: {
        nombre: 'Nintendo Switch',
        fabricante: 'Nintendo',
        lanzamiento: 2017
    }
    });

    const totalJuegos = await prisma.videojuego.count();
    if (totalJuegos === 0) {
    await prisma.videojuego.create({
        data: {
        titulo: 'Call of Duty: WWII',
        genero: 'Shooter',
        terminado: false,
        plataformaId: ps5.id
        }
    });
    await prisma.videojuego.create({
        data: {
        titulo: 'Mario Kart 8',
        genero: 'Carreras',
        terminado: true,
        plataformaId: nintendo.id
        }
    });
    }

    console.log('Semilla ejecutada correctamente.');
}

main()
    .catch((e) => {
    console.error('Error ejecutando la semilla:', e);
    process.exit(1);
    })
    .finally(async () => {
    await prisma.$disconnect();
    });