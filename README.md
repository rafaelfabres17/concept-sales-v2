# Concept Sales

> [!NOTE]
> This project **base** can be generated using the [Constant CLI](https://github.com/rinckodev/constatic)
> See the full documentation for this base by accessing: https://constatic-docs.vercel.app/discord

This is the most complete discord bot base you've ever seen! Developed by [@rinckodev](https://github.com/rinckodev), this project uses typescript in an incredible way to provide complete structures and facilitate the development of your discord bot.

> [!WARNING]
> [NodeJs](https://nodejs.org/en) version required: 20.12 or higher

## About this project

Concept Sales is a sales bot for Discord: members can browse a product catalog, apply a discount coupon and receive the item automatically from stock, all through Discord commands and embeds. **Payment is out of scope** — the bot calculates the final price and delivers the item, but does not process any charge (card, Pix, crypto, etc.).

## Project structure

```
.
└── src/
    └── shared/
        ├── products/   # product & stock entities, models and business rules
        └── coupons/    # coupon entities, validation and discount rules
```

## Instructions

### Setup

Create a folder for the bot
Open the terminal in that folder and paste the command below

```bash
git clone https://github.com/rafaelfabres17/concept-sales.git .
```

Install dependencies

```bash
npm install
```

Rename `.env.example` file to `.env`

Place [your bot token](https://constatic-docs.vercel.app/discord/guides/application) in `.env` file

```
BOT_TOKEN=your_token
```

```
GUILD_ID=your_guild_id
```

Run the bot in development with dev script

```bash
npm run dev
```

Build the project with the build command

```bash
npm run build
```

Run the built project with the start script

```bash
npm run start
```

### Usage

The bot has the following commands, which contain some sub commands.

| command | Usage            | Description    |
| ------- | ---------------- | -------------- |
| buy     | `/buy <product>` | Start checkout |

> Payment is not part of this bot — `/buy` only calculates the total, applies the coupon and delivers the stock item.
