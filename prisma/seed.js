const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // Suppression propre (optionnel mais conseillé en dev)
  await prisma.image.deleteMany()
  await prisma.description.deleteMany()
  await prisma.project.deleteMany()

  // Création d'un projet avec descriptions + images
  const project1 = await prisma.project.create({
    data: {
      name: "Application de statistiques pour des parties de LG-UHC.",
      slug: "App-stats-UHC-World",

      // Champs obligatoires
      startedAt: new Date("2023-06-01"),
      endedOrUpdatedAt: new Date(), // date actuelle

      descriptions: {
        create: [
          {
            content: "Application de récupération et traitement des logs minecraft d'un joueur pour les afficher de manière ergonomique.",
            images: {
              create: [
                {
                  url: "https://doc.uhcworld.fr/images/logo.png",
                  alt: "Logo UHC World"
                },
                {
                  url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM7Zt4dBvLOE_KsfGtzkvr0-Yn8jRR98jM_g&s",
                  alt: "Logo mode de jeu LG UHC"
                }
              ]
            }
          },
          {
            content: "Description longue du projet avec détails techniques.",
            images: {
              create: [
                {
                  url: "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
                  alt: "a changer"
                }
              ]
            }
          }
        ]
      }
    }
  })

  // Création d'un projet avec descriptions + images
  const project2 = await prisma.project.create({
    data: {
      name: "Jeu vidéo point & click, le Mont Lotus.",
      slug: "Mont-Lotus",

      // Champs obligatoires
      startedAt: new Date("2025-11-01"),
      endedOrUpdatedAt: new Date(), // date actuelle

      descriptions: {
        create: [
          {
            content: "Jeu vidéo basé sur un déplacement à la sousris, le gameplay est basé sur différentes énigmes.",
            images: {
              create: [
                {
                  url: "/images/logo_mont_lotus.png",
                  alt: "Logo mont lotus"
                }
              ]
            }
          },
          {
            content: "Description longue du projet avec détails techniques.",
            images: {
              create: [
                {
                  url: "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
                  alt: "a changer"
                },
                {
                  url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM7Zt4dBvLOE_KsfGtzkvr0-Yn8jRR98jM_g&s",
                  alt: "Logo mode de jeu LG UHC"
                }
              ]
            }
          }
        ]
      }
    }
  })

  console.log("✅ Seed terminé :", project1.name)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
