const path = require('path')
const express = require('express')
const { engine } = require('express-handlebars')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const app = express()

app.use(express.static('src/public'))

app.engine(
  'handlebars',
  engine({
    helpers: {
      eq: (a, b) => a === b
    },
    partialsDir: path.join(__dirname, 'src', 'views', 'descriptions-layout')
  })
)

app.set('view engine', 'handlebars')

// 👇 Chemin ABSOLU vers src/views
app.set('views', path.join(__dirname, 'src', 'views'))

app.get('/', async (req, res) => {
  const projects = await prisma.project.findMany({
    include: {
      competences: {
        select: { name: true }
      },
      descriptions: {
        include: {
          images: true
        }
      }
    },
    orderBy: {
      startedAt: 'desc'
    }
  })

  res.render('home', { projects })
})

// Route pour afficher les détails d'un projet
app.get('/project/:slug', async (req, res) => {
  const { slug } = req.params

  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      descriptions: {
        include: {
          images: true
        }
      }
    }
  })

  res.render('project', { project })
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})