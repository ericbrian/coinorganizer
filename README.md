Examples followed:

- `Protect your NextJs 13 app using Next-Auth`: https://www.youtube.com/watch?v=Eh3EpwqT4cM&ab_channel=HamedBahram
- Repo for `Protect your NextJs 13 app using Next-Auth`: https://github.com/HamedBahram/next-auth-demo/tree/main
- `No Secret warning`: https://stackoverflow.com/questions/70712152/how-to-fix-no-secret-warning-thrown-by-next-auth
- Skeleton: https://www.youtube.com/watch?v=7MKEOfSP2s4&ab_channel=developedbyed
- Next.js 13: https://www.youtube.com/watch?v=6h649f2fB9Q&ab_channel=DaveGray

To Regenerate Prisma Schema, use:

1. Remove old database models from schema file: prisma/schema.prisma
2. Run: ./node_modules/.bin/prisma db pull
3. Run: ./node_modules/.bin/prisma generate

You can now start using Prisma Client in your code. Reference: https://pris.ly/d/client

    import { PrismaClient } from '@prisma/client'
    const prisma = new PrismaClient()

When you want relations in your Prisma types, you have to build it yourself like so:

```js
import { Prisma } from '@prisma/client';

// GET type
type CoinType = Prisma.coinGetPayload<{
  include: {
    country: true;
    ruler: true;
    period: true;
    coin_mint: { include: { mint: true } };
    coin_engraver: { include: { engraver: true } };
    image: true;
  };
}>;

// POST type
coinst coin: Prisma.coinCreateInput = ...
```
