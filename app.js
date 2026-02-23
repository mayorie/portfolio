const path = require('path')
const express = require('express')
const { engine } = require('express-handlebars')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const app = express()

app.use(express.static('src/public'))//à mettre avant les routes pour que les fichiers statiques soient servis correctement

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

// 👇 Chemin ABSOLU vers src/views
app.set('views', path.join(__dirname, 'src', 'views'))

app.get('/', async (req, res) => {
  const projects = await prisma.project.findMany({
    include: {
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


const PORT = 3000
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
