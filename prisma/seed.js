//npx prisma db seed     pour reset et reseed la base de données
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // helper validation used during seeding
  function validateProjectData(projectData) {
    const slug = projectData.slug || '<unknown>'
    const descriptions = projectData.descriptions?.create
    if (!descriptions || descriptions.length === 0) {
      throw new Error(`Project ${slug} must have at least one description`)        }
    const firstDesc = descriptions[0]
    const images = firstDesc.images?.create
    if (!images || images.length !== 1) {
      throw new Error(
        `Validation error for project ${slug}: first description must have exactly one image (found ${images ? images.length : 0})`
      )
    }
  }

  // Suppression propre (optionnel mais conseillé en dev)
  await prisma.image.deleteMany()
  await prisma.description.deleteMany()
  await prisma.project.deleteMany()
  await prisma.competences.deleteMany()

  // Liste des noms créés pendant le seed (pour l'affichage final)
  const createdNames = []

  //listing des compétences
  competencesData = [
    { name: "JavaScript" },
    { name: "C++" },
    { name: "Unity" },
    { name: "Unreal Engine" },
    { name: "gestion de données" },
    { name: "base de données" },
    { name: "prisma" },
    { name: "express" },
    { name: "handlebars" },
    { name: "gestion de projet" },
    { name: "anglais" },
    { name: "handlebars" },
    { name: "REGEX" },
    { name: "SQLite" },
    { name: "Git/GitHub" },
    { name: "DevObjet" },
    { name: "multithreading" },
    { name: "C##" },
    { name: "méthode SOLIDE" },
  ]

  // Création des compétences
  const competences = await Promise.all(
    competencesData.map((competenceData) => prisma.competences.create({ data: competenceData }))
  )

  // Création d'un projet avec descriptions + images
  const project1Data = {
      name: "Application de statistiques pour des parties de LG-UHC.",
      slug: "App-stats-UHC-World",

      // Champs obligatoires
      startedAt: new Date("2023-06-01"),
      endedOrUpdatedAt: new Date(), // date actuelle

      //compétences associées
      competences: {
        connect: [
          { id: competences.find(c => c.name === "C++").id },
          { id: competences.find(c => c.name === "gestion de données").id },
          { id: competences.find(c => c.name === "gestion de projet").id },
          { id: competences.find(c => c.name === "REGEX").id },
          { id: competences.find(c => c.name === "SQLite").id },
          { id: competences.find(c => c.name === "Git/GitHub").id },
          { id: competences.find(c => c.name === "DevObjet").id },
          { id: competences.find(c => c.name === "multithreading").id },
          { id: competences.find(c => c.name === "méthode SOLIDE").id },
        ]
      },

      descriptions: {
        create: [
          {
            content: 
            "Application de récupération et traitement des logs minecraft d'un joueur pour les afficher de manière ergonomique.",
            mise_en_page: 1,
            images: {
              create: [
                {
                  url: "https://doc.uhcworld.fr/images/logo.png",
                  alt: "Logo UHC World"
                }
              ]
            }
          },
          {
            content: "Description longue du projet avec détails techniques.",
            mise_en_page: 1,
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

  validateProjectData(project1Data)
  const project1 = await prisma.project.create({ data: project1Data })
  createdNames.push(project1.name)

  // Création du deuxième projet avec validation
  const project2Data = {
      name: "Jeu vidéo point & click, le Mont Lotus.",
      slug: "Mont-Lotus",

      // Champs obligatoires
      startedAt: new Date("2025-11-01"),
      endedOrUpdatedAt: new Date(), // date actuelle

      //compétences associées
      competences: {
        connect: [
          { id: competences.find(c => c.name === "C##").id },
          { id: competences.find(c => c.name === "Unity").id },
          { id: competences.find(c => c.name === "gestion de projet").id },
          { id: competences.find(c => c.name === "anglais").id },
          { id: competences.find(c => c.name === "méthode SOLIDE").id }
        ]
      },

      descriptions: {
        create: [
          {
            content: "Jeu vidéo basé sur un déplacement à la sousris, le gameplay est basé sur différentes énigmes.",
            mise_en_page: 1,
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
            mise_en_page: 0,
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

  validateProjectData(project2Data)
  const project2 = await prisma.project.create({ data: project2Data })
  createdNames.push(project2.name)

  console.log("✅ Seed terminé :\n", createdNames.join(',\n '))
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
