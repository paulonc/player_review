/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const categories = await Promise.all([
        prisma.category.create({ data: { name: 'Action' } }),
        prisma.category.create({ data: { name: 'RPG' } }),
        prisma.category.create({ data: { name: 'Strategy' } }),
        prisma.category.create({ data: { name: 'Sports' } }),
        prisma.category.create({ data: { name: 'Adventure' } }),
        prisma.category.create({ data: { name: 'Puzzle' } }),
        prisma.category.create({ data: { name: 'Simulation' } })
    ])

    const companies = await Promise.all([
        prisma.company.create({
            data: {
                name: 'Nintendo',
                country: 'Japan',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Nintendo.svg/1024px-Nintendo.svg.png'
            }
        }),
        prisma.company.create({
            data: {
                name: 'Sony Interactive Entertainment',
                country: 'Japan',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PlayStation_logo.svg/2560px-PlayStation_logo.svg.png'
            }
        }),
        prisma.company.create({
            data: {
                name: 'Electronic Arts',
                country: 'United States',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Electronic-Arts-Logo.svg/1200px-Electronic-Arts-Logo.svg.png'
            }
        }),
        prisma.company.create({
            data: {
                name: 'Bethesda Game Studios',
                country: 'United States',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Bethesda_Game_Studios_logo.svg'
            }
        }),
        prisma.company.create({
            data: {
                name: 'Ubisoft',
                country: 'France',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Ubisoft_logo.svg'
            }
        })
    ])

    // Create games with relation to companies and categories
    const games = await Promise.all([
        prisma.game.create({
            data: {
                title: 'The Legend of Zelda: Breath of the Wild',
                description: 'An action-adventure game that follows Link as he explores the kingdom of Hyrule.',
                releaseDate: new Date('2017-03-03'),
                companyId: companies[0].id,
                categoryId: categories[0].id,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/0/0f/Legend_of_Zelda_Breath_of_the_Wild_capa.png'
            }
        }),
        prisma.game.create({
            data: {
                title: 'God of War Ragnarök',
                description: 'The ninth installment in the God of War series, following Kratos and Atreus through Norse mythology.',
                releaseDate: new Date('2022-11-09'),
                companyId: companies[1].id,
                categoryId: categories[0].id,
                imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png'
            }
        }),
        prisma.game.create({
            data: {
                title: 'FIFA 23',
                description: 'The latest installment in the FIFA series, featuring updated teams and gameplay mechanics.',
                releaseDate: new Date('2022-09-30'),
                companyId: companies[2].id,
                categoryId: categories[3].id,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a6/FIFA_23_Cover.jpg'
            }
        }),
        prisma.game.create({
            data: {
                title: 'Skyrim',
                description: 'An open-world action RPG set in the fantasy world of Tamriel.',
                releaseDate: new Date('2011-11-11'),
                companyId: companies[3].id,
                categoryId: categories[1].id,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/a/aa/The_Elder_Scrolls_5_Skyrim_capa.png'
            }
        }),
        prisma.game.create({
            data: {
                title: 'Assassin\'s Creed Valhalla',
                description: 'An action RPG where players assume the role of Eivor, a Viking raider.',
                releaseDate: new Date('2020-11-10'),
                companyId: companies[4].id,
                categoryId: categories[1].id,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/e/e9/Assassins_Creed_Valhalla_capa.png'
            }
        }),
        // Action Games
        prisma.game.create({
            data: {
                title: 'Devil May Cry 5',
                description: 'The latest entry in the Devil May Cry series, featuring fast-paced action combat.',
                releaseDate: new Date('2019-03-08'),
                companyId: companies[1].id,
                categoryId: categories[0].id,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/c/cb/Devil_May_Cry_5.jpg'
            }
        }),
        prisma.game.create({
            data: {
                title: 'Bayonetta 3',
                description: 'The third installment in the Bayonetta series, featuring intense action combat.',
                releaseDate: new Date('2022-10-28'),
                companyId: companies[0].id,
                categoryId: categories[0].id,
                imageUrl: 'https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_auto/c_scale,w_300/v1/ncom/en_US/games/switch/b/bayonetta-3-switch/hero'
            }
        }),
        // RPG Games
        prisma.game.create({
            data: {
                title: 'Final Fantasy XVI',
                description: 'The latest entry in the Final Fantasy series, featuring a dark fantasy world.',
                releaseDate: new Date('2023-06-22'),
                companyId: companies[1].id,
                categoryId: categories[1].id,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/f/f9/Final_Fantasy_16_capa.png'
            }
        }),
        prisma.game.create({
            data: {
                title: 'Dragon Quest XI',
                description: 'A traditional JRPG featuring a grand adventure across a vast world.',
                releaseDate: new Date('2017-07-29'),
                companyId: companies[0].id,
                categoryId: categories[1].id,
                imageUrl: 'https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_auto/c_scale,w_300/v1/ncom/en_US/games/switch/d/dragon-quest-xi-s-echoes-of-an-elusive-age-definitive-edition-switch/hero'
            }
        }),
        // Sports Games
        prisma.game.create({
            data: {
                title: 'NBA 2K23',
                description: 'The latest installment in the NBA 2K series, featuring realistic basketball gameplay.',
                releaseDate: new Date('2022-09-09'),
                companyId: companies[2].id,
                categoryId: categories[3].id,
                imageUrl: 'https://dw0jruhdg6fis.cloudfront.net/producao/32057613/G/nba_2k_23.jpg'
            }
        }),
        prisma.game.create({
            data: {
                title: 'Madden NFL 23',
                description: 'The latest entry in the Madden NFL series, featuring American football gameplay.',
                releaseDate: new Date('2022-08-19'),
                companyId: companies[2].id,
                categoryId: categories[3].id,
                imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202406/1011/8bf6908bc4a21488c7bfa3bbf75ceca8f4c5137bafc136ae.png'
            }
        }),
        // Strategy Games
        prisma.game.create({
            data: {
                title: 'Civilization VI',
                description: 'The latest entry in the Civilization series, featuring turn-based strategy gameplay.',
                releaseDate: new Date('2016-10-21'),
                companyId: companies[2].id,
                categoryId: categories[2].id,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/3/3b/Civilization_VI_cover_art.jpg'
            }
        }),
        prisma.game.create({
            data: {
                title: 'Total War: Warhammer III',
                description: 'The latest entry in the Total War series, featuring grand strategy and tactical battles.',
                releaseDate: new Date('2022-02-17'),
                companyId: companies[4].id,
                categoryId: categories[2].id,
                imageUrl: 'https://cdn1.epicgames.com/dda64c2956b54f1ba3cd97f6aaee775f/offer/EGS_TotalWarWARHAMMERIII_CreativeAssembly_S6-1200x1600-bf935f14317eaf51f4906079a2888ced.jpg'
            }
        }),
        // Adventure Games
        prisma.game.create({
            data: {
                title: 'Uncharted 4: A Thief\'s End',
                description: 'The final chapter in Nathan Drake\'s story, featuring thrilling adventure gameplay.',
                releaseDate: new Date('2016-05-10'),
                companyId: companies[1].id,
                categoryId: categories[4].id,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/1/13/Uncharted_4_capa.png'
            }
        }),
        prisma.game.create({
            data: {
                title: 'Tomb Raider',
                description: 'A reboot of the Tomb Raider series, featuring action-adventure gameplay.',
                releaseDate: new Date('2013-03-05'),
                companyId: companies[4].id,
                categoryId: categories[4].id,
                imageUrl: 'https://image.api.playstation.com/cdn/UP0082/CUSA00107_00/jT7kkwSWEinafnaYWMZoReRr4LlmYmym.png?w=440&thumb=false'
            }
        }),
        // Puzzle Games
        prisma.game.create({
            data: {
                title: 'Portal 2',
                description: 'A puzzle-platform game featuring innovative portal mechanics.',
                releaseDate: new Date('2011-04-19'),
                companyId: companies[2].id,
                categoryId: categories[5].id,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/f/f9/Portal2cover.jpg'
            }
        }),
        prisma.game.create({
            data: {
                title: 'The Witness',
                description: 'A puzzle game featuring a vast open world filled with puzzles.',
                releaseDate: new Date('2016-01-26'),
                companyId: companies[1].id,
                categoryId: categories[5].id,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f4/The_Witness_cover.jpg'
            }
        }),
        // Simulation Games
        prisma.game.create({
            data: {
                title: 'The Sims 4',
                description: 'A life simulation game where players control virtual people.',
                releaseDate: new Date('2014-09-02'),
                companyId: companies[2].id,
                categoryId: categories[6].id,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/3/34/Nova_capa_de_The_Sims_4.png'
            }
        }),
        prisma.game.create({
            data: {
                title: 'Stardew Valley',
                description: 'A farming simulation game with RPG elements.',
                releaseDate: new Date('2016-02-26'),
                companyId: companies[0].id,
                categoryId: categories[6].id,
                imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlJZWcZvRElJKrIrPeL4XQ0erDKodJKomIyg&s'
            }
        })
    ])

    const users = await Promise.all([
        prisma.user.create({
            data: {
                username: 'admin',
                email: 'admin@example.com',
                password: await hash('admin123', 10),
                role: 'ADMIN'
            }
        }),
        prisma.user.create({
            data: {
                username: 'john_doe',
                email: 'john@example.com',
                password: await hash('user123', 10),
                role: 'USER'
            }
        }),
        prisma.user.create({
            data: {
                username: 'paulo',
                email: 'paulo@example.com',
                password: await hash('user123', 10),
                role: 'USER'
            }
        }),
        prisma.user.create({
            data: {
                username: 'alex_123',
                email: 'alex@example.com',
                password: await hash('alex123', 10),
                role: 'USER'
            }
        }),
        prisma.user.create({
            data: {
                username: 'lucas_will',
                email: 'lucas@example.com',
                password: await hash('lucas123', 10),
                role: 'USER'
            }
        })
    ])

    const reviews: Prisma.Prisma__ReviewClient<any>[] = []

    const createReview = (userId: string, gameId: string, title: string, rating: number, review: string) => {
        const hoursPlayed = Math.floor(Math.random() * 200) + 1
        const recommended = Math.random() < 0.8
        reviews.push(
            prisma.review.create({
                data: {
                    userId,
                    gameId,
                    title,
                    rating,
                    review,
                    hoursPlayed,
                    recommended
                }
            })
        )
    }

    for (const user of users) {
        for (const game of games) {
            const rating = Math.floor(Math.random() * 5) + 1
            createReview(
                user.id,
                game.id,
                `Review for ${game.title} by ${user.username}`,
                rating,
                `This is a review for game "${game.title}" by user "${user.username}".`
            )
        }
    }

    await Promise.all(reviews)

    console.log('Seed completed successfully with many reviews!')
}

main()
    .catch((e) => {
        console.error(e)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
